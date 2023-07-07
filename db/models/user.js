// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');


const createUser = async ({ username, password, role }) => {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const { rows: [user] } = await client.query(`
      INSERT INTO users(username, password, role)
      VALUES ($1, $2, COALESCE($3, 'customer'))
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [username, hashedPassword, role]);

    delete user.password;

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserByUsername = async (userName) => {

  try {
    const { rows: [user] } = await client.query(`
        SELECT * 
        FROM users
        WHERE username=$1
        `, [userName]);

    return user;
  }
  catch (error) {
    console.log(error);
    throw error;
  }

};

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);

    if (user) {
      const hashedPassword = user.password;
      const isValid = await bcrypt.compare(password, hashedPassword);

      if (isValid) {
        return user; 
      }
    }
 // Throws an error if user not found or password is invalid
    throw new Error("Invalid credentials");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserById = async (userId) => {

  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE id=${userId};
    `)
    delete user.password; 
    return user;
  }
  catch (error) {
    console.log(error);
    throw error;
  }

};



const getAllUsers = async () => {

  try {
    const { rows } = await client.query(
      `
        SELECT * 
        FROM users
      `);
    return rows;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUserRole = async (userId, role) => {
  try {
    const { rows: [user] } = await client.query(
      `
      UPDATE users
      SET role = $2
      WHERE id = $1
      RETURNING *;
      `,
      [userId, role]
    );

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const validatePasskey = async (passkey) => {
  const storedPasskey = "Fullstack Academy";

  const isValidPasskey = passkey === storedPasskey;

  return isValidPasskey;
};

const checkUserRole = (user) => {
  if ( user && user.role === 'admin') {
    console.log("admin true", user.role);
    return true; // User has admin role
  }
  return false; // User does not have admin role
};




module.exports = {
  // add your database adapter fns here
  getAllUsers,
  getUser,
  createUser,
  getUserById,
  getUserByUsername,
  updateUserRole,
  validatePasskey,
  checkUserRole
};
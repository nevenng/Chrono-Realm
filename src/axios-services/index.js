const BASE_URL = "http://localhost:4000"

import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function registerUser(email, password) {
  const response = await fetch(`${BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const body = await response.json()
    throw new Error(body.message)
  }

  const data = await response.json();
  return data;
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchProdId = (async (prodId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${prodId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// Cart 

export const handleRemoveFromCart = async (userToken, cartProdId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/remove/${cartProdId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
    });
    const result = await response.json();
    alert('Item has beem removed from your cart!');
    return result
  } catch (err) {
    console.error(err);
  }
}

export const handleUpdateQty = async (userToken, cartProdId) => {
  try {
    const response = await fetch(`${BASE_URL}/cart/update/${cartProdId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        cartQuantity: cartQuantity,
      }),
    });
    const result = await response.json();
    alert('Quantity has been updated!');

    return result;
  } catch (err) {
    console.error(err);
  }
};

// Orders 

// export const fetchOrderByOrderUser = async (user) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/orders/${user}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };


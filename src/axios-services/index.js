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

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
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
export const checkUserCartExists = async (userId, sessionId) => {
  const body = {
    userId,
    sessionId
  }

  try {
    const response = await fetch(`${BASE_URL}/api/carts/my-active-cart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const result = await response.text();
      if (result === "") {
        return null
      }
      const jsonResult = JSON.parse(result)
      return jsonResult;
    } else {
      throw new Error('Error retrieving user cart')
    }
  } catch (error) {
    console.error(error)
  }
}


// Creates a new cart
export const createNewCart = async (userId, sessionId) => {
  const payload = {
    userId: userId,
    sessionId: sessionId,
    cartStatus: 'pending'
  }

  try {
    const response = await fetch(`${BASE_URL}/api/carts/new-cart`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      const result = response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

// Add product to cart
export const addProductToCart = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/api/carts/add`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    if (response.ok) {
      const result = await response.json()
      return result
    }
  } catch (error) {
    console.error(error);
  }
}

export const fetchProductsCart = async (userId, sessionId) => {
  const body = {
    userId,
    sessionId
  }

  try {
    const response = await fetch(`${BASE_URL}/api/carts/my-active-cart-product`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const result = await response.json()
      return result
    }
  } catch (error) {
    throw error;
  }
}

export const updatedProductCart = async (cartId, prodId, quantity, totalprice) => {
  const body = {
    cartId,
    prodId,
    quantity,
    totalprice
  }
  try {
    const response = await fetch(`${BASE_URL}/api/carts/update`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      const result = await response.json();
      return result
    }
  } catch (error) {
    throw error;
  }
}


export const handleRemoveFromCart = async (cartId, prodId) => {
  const body = {
    cartId,
    prodId
  }

  try {
    const response = await fetch(`${BASE_URL}/api/carts/remove`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const result = await response.text();
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


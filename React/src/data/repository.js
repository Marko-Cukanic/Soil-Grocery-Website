import api from './api';

// --- Constants ----------------------------------------------------------------------------------
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await api.post("/users/login", { email, password });
  const user = response.data;
  
  // NOTE: In this example, the login is also persistent as it is stored in local storage.
  if (user !== null) {
    setUser(user);
  }

  return user;
}

async function findUser(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

async function createUser(user) {
  const response = await api.post("/users", user);
  return response.data;
}

// --- Product ------------------------------------------------------------------------------------
async function getProducts() {
  const response = await api.get("/products");
  return response.data;
}

async function createProduct(product) {
  const response = await api.post("/products", product);
  return response.data;
}

// --- Review -------------------------------------------------------------------------------------
async function getReviews() {
  const response = await api.get("/reviews");
  return response.data;
}

async function createReview(review) {
  const response = await api.post("/reviews", review);
  return response.data;
}

// --- Cart Item ----------------------------------------------------------------------------------
async function getCartItems() {
  const response = await api.get("/cart");
  return response.data;
}

async function createCartItem(cartItem) {
  const response = await api.post("/cart", cartItem);
  return response.data;
}

// --- Weekly Special -----------------------------------------------------------------------------
async function getWeeklySpecials() {
  const response = await api.get("/weekly-specials");
  return response.data;
}

async function createWeeklySpecial(weeklySpecial) {
  const response = await api.post("/weekly-specials", weeklySpecial);
  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getProducts, createProduct,
  getReviews, createReview,
  getCartItems, createCartItem,
  getWeeklySpecials, createWeeklySpecial,
  getUser, removeUser
};

const axios = require('axios');

// HELPERS
const getState = name => JSON.parse(localStorage.getItem(name)) || {};

const saveState = (name, state) => {
  // Create timestamp
  state.updatedAt = Date.now();
  // Save
  localStorage.setItem(name, JSON.stringify(state));
};

const validateCoupon = code => axios.get(`/coupons/${code}`);

// LOCAL STORAGE HANDLER METHODS
exports.stateExists = name => !!localStorage.getItem(name);

exports.isStateRecent = name => {
  const state = getState(name);

  if (!state.updatedAt) return false;

  // Parse date
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).getTime();
  const lastUpdatedAt = new Date(state.updatedAt).getTime();
  // Returns true if the order has been updated in the last 30 minutes
  return lastUpdatedAt > thirtyMinutesAgo;
};

exports.recoverState = async name => {
  const state = getState(name);

  // If coupon is provided -> validate
  if (state.coupon) {
    try {
      // Add validated coupon to the state
      const res = await validateCoupon(state.coupon.code);
      state.coupon = res.data;
    } catch (err) {
      state.coupon = undefined;
    }
  }

  return state;
};

// Save item to LS
exports.saveItem = (name, type, data) => {
  const ls = getState(name);
  ls[type] = data;
  saveState(name, ls);
};

// Add order item
exports.saveOrderItem = (name, item) => {
  const ls = getState(name);
  // Initialize array if empty
  if (!ls.orders) ls.orders = [];

  // Try to find item if already there
  const index = ls.orders.findIndex(orderItem => orderItem.id === item.id);

  if (index === -1) {
    // Add new item
    ls.orders.push({ ...item, quantity: 1 });
  } else {
    // Increase quantity if item already there
    ls.orders[index].quantity++;
  }

  saveState(name, ls);
};

// Remove order item
exports.removeOrderItem = (name, id) => {
  const ls = getState(name);
  if (!ls.orders.length) return;

  const index = ls.orders.findIndex(orderItem => orderItem.id === id);
  ls.orders.splice(index, 1);

  saveState(name, ls);
};

// Save address
exports.saveAddress = (name, address) => {
  // If the address had an id that means that it was a stored one so no need to store again
  if (!address || address.id) return;

  let state = getState(name);
  // If empty -> create array
  if (!Object.keys(state).length) state = [];

  // Assign the current time as ID
  address.id = Date.now();
  state.push(address);

  saveState(name, state);
};

exports.removeAddress = (name, id) => {
  const state = getState(name);
  if (!state.length) return;

  const index = state.findIndex(item => item.id === id);
  state.splice(index, 1);

  saveState(name, state);
};

// Completely remove item from LS
exports.removeState = name => localStorage.removeItem(name);

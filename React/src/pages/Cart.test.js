import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Cart from './Cart';
import '@testing-library/jest-dom/extend-expect';

// Mock axios
jest.mock('axios');

const mockCartItems = [
  { id: 45, user_id: 34, product_id: 2, name: 'Banana', price: 1.29, quantity: 2, totalPrice: 2.58 },
  { id: 47, user_id: 1, product_id: 3, name: 'Orange', price: 0.65, quantity: 2, totalPrice: 1.30 },
  { id: 48, user_id: 1, product_id: 9, name: 'Tomato', price: 2.29, quantity: 5, totalPrice: 11.45 },
  { id: 49, user_id: 1, product_id: 2, name: 'Banana', price: 1.29, quantity: 5, totalPrice: 6.45 }
];

// Setup function to render Cart component
const setup = () => {
  axios.get.mockResolvedValue({ data: mockCartItems });
  return render(<Cart />);
};

// Test 1: Check if items are correctly added to the cart
test('loads and displays cart items', async () => {
  setup();

  // Wait for items to be displayed
  await waitFor(() => screen.getByText('Banana'));

  // Check if items are rendered correctly
  expect(screen.getByText('Banana')).toBeInTheDocument();
  expect(screen.getByText('Orange')).toBeInTheDocument();
  expect(screen.getByText('Tomato')).toBeInTheDocument();
  expect(screen.getByText('$2.58')).toBeInTheDocument();
  expect(screen.getByText('$1.30')).toBeInTheDocument();
  expect(screen.getByText('$11.45')).toBeInTheDocument();
  expect(screen.getByText('$6.45')).toBeInTheDocument();
});

// Test 2: Check if quantities are updated correctly
test('updates item quantity correctly', async () => {
  setup();
  axios.put.mockResolvedValue({});

  // Wait for items to be displayed
  await waitFor(() => screen.getByText('Banana'));

  // Increase quantity
  fireEvent.click(screen.getAllByText('+')[0]);

  // Wait for axios put to be called and re-render
  await waitFor(() => expect(axios.put).toHaveBeenCalled());

  // Check if quantity is updated
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('$3.87')).toBeInTheDocument();
});

// Test 3: Check if items are removed correctly from the cart
test('removes item from cart correctly', async () => {
  setup();
  axios.delete.mockResolvedValue({});

  // Wait for items to be displayed
  await waitFor(() => screen.getByText('Banana'));

  // Remove item
  fireEvent.click(screen.getAllByText('Remove')[0]);

  // Wait for axios delete to be called and re-render
  await waitFor(() => expect(axios.delete).toHaveBeenCalled());

  // Check if item is removed
  expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  expect(screen.queryByText('$2.58')).not.toBeInTheDocument();
  expect(screen.getByText('Orange')).toBeInTheDocument();
});

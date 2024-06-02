import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Cart from './Cart';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');//Mock axios

const mockCartItems = [//Mock Items to be tested
  { id: 45, user_id: 34, product_id: 2, name: 'Banana', price: 1.29, quantity: 2, totalPrice: 2.58 }, 
  { id: 47, user_id: 1, product_id: 3, name: 'Orange', price: 0.65, quantity: 2, totalPrice: 1.30 },
  { id: 48, user_id: 1, product_id: 9, name: 'Tomato', price: 2.29, quantity: 5, totalPrice: 11.45 },
  { id: 49, user_id: 1, product_id: 2, name: 'Banana', price: 1.29, quantity: 5, totalPrice: 6.45 }
];

const setup = () => {// Setup function to render Cart component
  axios.get.mockResolvedValue({ data: mockCartItems });
  return render(<Cart />);
};

test('loads and displays cart items', async () => {//Test 1: Check if items are correctly added to the cart
  setup();

  await waitFor(() => screen.getByText('Banana'));//Wait for items to be displayed

  expect(screen.getByText('Banana')).toBeInTheDocument();//Check if items are rendered correctly
  expect(screen.getByText('Orange')).toBeInTheDocument();
  expect(screen.getByText('Tomato')).toBeInTheDocument();
  expect(screen.getByText('$2.58')).toBeInTheDocument();
  expect(screen.getByText('$1.30')).toBeInTheDocument();
  expect(screen.getByText('$11.45')).toBeInTheDocument();
  expect(screen.getByText('$6.45')).toBeInTheDocument();
});

test('updates item quantity correctly', async () => {//Test 2: Check if quantities are updated correctly
  setup();
  axios.put.mockResolvedValue({});

  await waitFor(() => screen.getByText('Banana'));//Wait for items to be displayed

  fireEvent.click(screen.getAllByText('+')[0]);  // Increase quantity

  await waitFor(() => expect(axios.put).toHaveBeenCalled());//Wait for axios put to be called and re-render

  expect(screen.getByText('3')).toBeInTheDocument();//Check if quantity is updated
  expect(screen.getByText('$3.87')).toBeInTheDocument();
});

test('removes item from cart correctly', async () => {//Test 3: Check if items are removed correctly from the cart
  setup();
  axios.delete.mockResolvedValue({});

  await waitFor(() => screen.getByText('Banana'));//Wait for items to be displayed

  fireEvent.click(screen.getAllByText('Remove')[0]);//Remove item

  await waitFor(() => expect(axios.delete).toHaveBeenCalled());//Wait for axios de lete to be called and re-render

  expect(screen.queryByText('Banana')).not.toBeInTheDocument();//Check if item is removed
  expect(screen.queryByText('$2.58')).not.toBeInTheDocument();
  expect(screen.getByText('Orange')).toBeInTheDocument();
});

import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      specialPrice
      image
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Float!, $specialPrice: Float, $image: String!) {
    addProduct(name: $name, price: $price, specialPrice: $specialPrice, image: $image) {
      id
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation EditProduct($id: Int!, $name: String, $price: Float, $specialPrice: Float, $image: String) {
    editProduct(id: $id, name: $name, price: $price, specialPrice: $specialPrice, image: $image) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

function ProductManagement() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, specialPrice: null, image: '' });
  const [message, setMessage] = useState('');

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct({ variables: { id } });
      setMessage(`Product with id ${id} has been deleted.`);
      refetch(); // Refresh the product list
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await editProduct({ variables: editingProduct });
      setMessage(`Product with id ${editingProduct.id} has been updated.`);
      setEditingProduct(null); // Close the form
      refetch(); // Refresh the product list
    } catch (err) {
      console.error("Error editing product:", err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ variables: newProduct });
      setMessage(`Product ${newProduct.name} has been added.`);
      setNewProduct({ name: '', price: 0, specialPrice: null, image: '' }); // Reset the form
      refetch(); // Refresh the product list
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error :( {error.message}</p>;

  const products = data.products.map(({ __typename, ...product }) => product);

  return (
    <div className="container">
      <h2>Product Management</h2>
      {message && <p className="message">{message}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.specialPrice} - {product.image}
            <div>
              <button onClick={() => handleEditProduct(product)}>Edit</button>
              <button className="delete" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
            {editingProduct && editingProduct.id === product.id && (
              <form className="edit-form" onSubmit={handleSaveEdit}>
                <h3>Edit Product</h3>
                <label>
                  Name:
                  <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                </label>
                <label>
                  Price:
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} />
                </label>
                <label>
                  Special Price:
                  <input type="number" value={editingProduct.specialPrice || ''} onChange={(e) => setEditingProduct({ ...editingProduct, specialPrice: parseFloat(e.target.value) })} />
                </label>
                <label>
                  Image:
                  <input type="text" value={editingProduct.image} onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
      <form className="add-form" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>
          Name:
          <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        </label>
        <label>
          Price:
          <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
        </label>
        <label>
          Special Price:
          <input type="number" value={newProduct.specialPrice || ''} onChange={(e) => setNewProduct({ ...newProduct, specialPrice: parseFloat(e.target.value) })} />
        </label>
        <label>
          Image:
          <input type="text" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductManagement;

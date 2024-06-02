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
          </li>
        ))}
      </ul>
      <button className="add-product-button" onClick={() => {
        addProduct({ variables: { name: 'New Product', price: 0.0, specialPrice: null, image: '' } }).catch(err => console.error("Error adding product:", err));
      }}>Add Product</button>
      
      {editingProduct && (
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
    </div>
  );
}

export default ProductManagement;

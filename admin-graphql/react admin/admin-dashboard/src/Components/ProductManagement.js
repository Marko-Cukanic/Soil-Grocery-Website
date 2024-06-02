import React from 'react';
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
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error :( {error.message}</p>;

  const products = data.products.map(({ __typename, ...product }) => product);

  return (
    <div className="container">
      <h2>Product Management</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price} - {product.specialPrice} - {product.image}
            <div>
              <button onClick={() => {
                editProduct({ variables: { id: product.id, name: product.name, price: product.price, specialPrice: product.specialPrice, image: product.image } }).catch(err => console.error("Error editing product:", err));
              }}>Edit</button>
              <button className="delete" onClick={() => {
                deleteProduct({ variables: { id: product.id } }).catch(err => console.error("Error deleting product:", err));
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-product-button" onClick={() => {
        addProduct({ variables: { name: 'New Product', price: 0.0, specialPrice: null, image: '' } }).catch(err => console.error("Error adding product:", err));
      }}>Add Product</button>
    </div>
  );
}

export default ProductManagement;

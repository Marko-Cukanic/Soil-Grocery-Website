import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      user_id
      product_id
      text
      stars
      is_deleted
      deleted_message
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: Int!) {
    deleteReview(id: $id) {
      id
      deleted_message
    }
  }
`;

function ReviewManagement() {
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error :( {error.message}</p>;

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview({ variables: { id } });
      alert('Review has been marked as deleted.');
      refetch(); // Refetch the reviews after deletion
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  if (!data || !data.reviews) return <p>No reviews available</p>;

  const reviews = data.reviews.map(({ __typename, ...review }) => review);

  return (
    <div className="container">
      <h2>Review Management</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p><strong>User ID {review.user_id}</strong>: {review.is_deleted ? review.deleted_message : review.text}</p>
            <div>
              <p>Rating: {review.stars}</p>
              {!review.is_deleted && (
                <button className="delete" onClick={() => handleDeleteReview(review.id)}>Delete</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewManagement;

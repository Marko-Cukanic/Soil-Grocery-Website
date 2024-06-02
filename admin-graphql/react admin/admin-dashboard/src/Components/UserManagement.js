import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';


const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      blocked
    }
  }
`;

const BLOCK_USER = gql`
  mutation BlockUser($id: Int!) {
    blockUser(id: $id) {
      id
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation UnblockUser($id: Int!) {
    unblockUser(id: $id) {
      id
    }
  }
`;

function UserManagement() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [blockUser] = useMutation(BLOCK_USER);
  const [unblockUser] = useMutation(UNBLOCK_USER);
  const [message, setMessage] = useState('');

  const handleBlockUser = async (id) => {
    try {
      await blockUser({ variables: { id } });
      setMessage(`User with id ${id} has been blocked.`);
    } catch (err) {
      console.error("Error blocking user:", err);
    }
  };

  const handleUnblockUser = async (id) => {
    try {
      await unblockUser({ variables: { id } });
      setMessage(`User with id ${id} has been unblocked.`);
    } catch (err) {
      console.error("Error unblocking user:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error :( {error.message}</p>;

  if (!data || !data.users) return <p>No data available</p>;

  return (
    <div className="container">
      <h2>User Management</h2>
      {message && <p className="message">{message}</p>}
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            {user.name} - {user.blocked ? 'Blocked' : 'Active'}
            <div>
              <button onClick={() => handleBlockUser(user.id)}>Block</button>
              <button className="delete" onClick={() => handleUnblockUser(user.id)}>Unblock</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;

import { ApolloLink } from 'apollo-link';

const removeTypename = (key, value) => {
  return key === '__typename' ? undefined : value;
};

const removeTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = JSON.parse(JSON.stringify(operation.variables), removeTypename);
  }
  return forward(operation);
});

export default removeTypenameLink;

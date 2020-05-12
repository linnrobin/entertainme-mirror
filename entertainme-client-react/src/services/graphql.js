import ApolloClient from "apollo-boost";
const baseUrl = "http://localhost:3000";

const client = new ApolloClient({
  uri: baseUrl,
});

export default client;

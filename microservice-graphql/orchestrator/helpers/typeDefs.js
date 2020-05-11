const { gql } = require("apollo-server");

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  type Tv {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  type EntertainMe {
    movies: [Movie]
    tvSeries: [Tv]
  }
  type ResponseDelete {
    _id: ID
    status: String
    message: String
  }
  type ResponseUpdate {
    _id: ID
    status: String
    message: String
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }
  input InputTv {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String]!
  }

  type Query {
    movies: [Movie]
    movie(_id: ID!): Movie
    tvSeries: [Tv]
    tv(_id: ID!): Tv
    entertainme: EntertainMe
  }

  type Mutation {
    addMovie(movie: InputMovie): Movie
    addTv(tv: InputTv): Tv
    deleteMovie(_id: ID!): ResponseDelete
    deleteTv(_id: ID!): ResponseDelete
    updateMovie(_id: ID!, movie: InputMovie): ResponseUpdate
    updateTv(_id: ID!, tv: InputTv): ResponseUpdate
  }
`;

module.exports = typeDefs;

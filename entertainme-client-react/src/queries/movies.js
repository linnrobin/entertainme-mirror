import gql from "graphql-tag";

export const GET_MOVIES = gql`
  {
    movies {
      _id
      poster_path
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    movie(_id: $id) {
      _id
      poster_path
      overview
      popularity
      title
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addMovie(
      movie: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      poster_path
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(_id: $id) {
      _id
      status
      message
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    updateMovie(
      _id: $id
      movie: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      status
      message
    }
  }
`;

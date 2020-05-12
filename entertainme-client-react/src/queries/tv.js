import gql from "graphql-tag";

export const GET_TVSERIES = gql`
  {
    tvSeries {
      _id
      poster_path
    }
  }
`;

export const GET_TV = gql`
  query getTv($id: ID!) {
    tv(_id: $id) {
      _id
      poster_path
      overview
      popularity
      title
      tags
    }
  }
`;

export const ADD_TV = gql`
  mutation addTv(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    addTv(
      tv: {
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

export const DELETE_TV = gql`
  mutation deleteTv($id: ID!) {
    deleteTv(_id: $id) {
      _id
      status
      message
    }
  }
`;

export const UPDATE_TV = gql`
  mutation updateTv(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tags: [String]!
  ) {
    updateTv(
      _id: $id
      tv: {
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

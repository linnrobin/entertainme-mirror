import gql from "graphql-tag";

export const GET_ALL = gql`
  {
    movies {
      _id
      poster_path
    }

    tvSeries {
      _id
      poster_path
    }
  }
`;

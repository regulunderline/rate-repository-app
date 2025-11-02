import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          language
          stargazersCount
          fullName
          forksCount
          reviewCount
          ratingAverage
          id
          ownerAvatarUrl
        }
      }
    }
  }
`;

// other queries...
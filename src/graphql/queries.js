import { gql } from '@apollo/client';

import { REPOSITORY_DETAILS } from './fragments'

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

export const GET_ONE_REPOSITORY = gql`
  query ($id: ID!){
    repository(id: $id){
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`

// other queries...
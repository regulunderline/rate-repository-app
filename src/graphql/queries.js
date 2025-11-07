import { gql } from '@apollo/client';

import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query(
    $searchKeyword: String, 
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $after: String
    $first: Int
  ) {
    repositories(
      searchKeyword: $searchKeyword,
      orderBy: $orderBy,
      orderDirection: $orderDirection
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_ONE_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String){
    repository(id: $id){
      ...RepositoryDetails
      url
      reviews(first: $first, after: $after) {
        ...ReviewDetails
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`

export const ME = gql`
  query ($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...ReviewDetails
        edges {
          node {
            repository {
              fullName
              id
            }
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`

// other queries...
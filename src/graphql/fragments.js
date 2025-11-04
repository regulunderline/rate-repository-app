import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    description
    language
    stargazersCount
    fullName
    forksCount
    reviewCount
    ratingAverage
    id
    ownerAvatarUrl
    url
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          id
          username
        }
      }
    }
  }
`
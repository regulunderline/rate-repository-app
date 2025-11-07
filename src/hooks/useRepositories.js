import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, searchKeyword) => {
  const setVariables = () => {
    switch(order){
      case "Latest repositories":
        return { orderBy: "CREATED_AT", orderDirection: "DESC" }
      case "Highest rated repositories":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }
      case "Lowest rated repositories":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" }
      default:
        return null
    }
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...setVariables(), searchKeyword }
  });

  if (loading) {
    return { repositories: null, loading }
  }

  return { repositories: data.repositories, loading } 
};

export default useRepositories;
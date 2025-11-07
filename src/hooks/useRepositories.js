import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (order, searchKeyword, first) => {
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

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...setVariables(), searchKeyword, first }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...setVariables(),
        searchKeyword, 
        first
      },
    });
  };

  if (loading) {
    return { repositories: null, loading }
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }; 
};

export default useRepositories;
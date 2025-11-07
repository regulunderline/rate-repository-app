import { useQuery } from '@apollo/client'

import { GET_ONE_REPOSITORY } from '../graphql/queries'

const useOneRepository = ( { id }, first ) => {
  const { data, error, loading, fetchMore } = useQuery(GET_ONE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id, 
        first
      },
    });
  };

  if (loading || error) {
    return { repository: null, loading }
  }

  return { repository: data.repository, loading, fetchMore: handleFetchMore } 
};

export default useOneRepository;
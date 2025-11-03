import { useQuery } from '@apollo/client'

import { GET_ONE_REPOSITORY } from '../graphql/queries'

const useOneRepository = ( { id }) => {
  console.log(id)
  const { data, error, loading } = useQuery(GET_ONE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (loading || error) {
    return { repository: null, loading }
  }

  return { repository: data.repository, loading } 
};

export default useOneRepository;
import { useQuery } from '@apollo/client'

import { ME } from '../graphql/queries'

const useMe = (includeReviews = false) => {
  const { data, error, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews }
  });

  if (loading) {
    return { me: null, loading }
  }

  if(error){
    console.log(error)
    throw new Error(error.message)
  }

  return { me: data.me, loading, refetch } 
};

export default useMe;
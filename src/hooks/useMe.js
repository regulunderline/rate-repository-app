import { useQuery } from '@apollo/client'

import { ME } from '../graphql/queries'

const useMe = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return { me: null, loading }
  }

  if(error){
    console.log(error)
    throw new Error(error.message)
  }

  return { me: data.me, loading } 
};

export default useMe;
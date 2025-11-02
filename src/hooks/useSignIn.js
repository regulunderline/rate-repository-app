import { useMutation, useApolloClient } from '@apollo/client'

import useAuthStorage from '../hooks/useAuthStorage';
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const res = await mutate({ variables: { username, password }})
    await authStorage.setAccessToken(res.data.authenticate.accessToken)
    apolloClient.resetStore()
    return res
  };

  return [signIn, result];
};

export default useSignIn
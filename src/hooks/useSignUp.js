import { useMutation } from '@apollo/client'

import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async (user) => {
    const res = await mutate({ variables: user })
    return res
  };

  return [signUp, result];
};

export default useSignUp
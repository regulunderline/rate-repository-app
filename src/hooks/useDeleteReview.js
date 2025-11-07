import { useMutation } from '@apollo/client'

import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = (id) => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    variables: { id }
  });

  const deleteReview = async () => {
    res = await mutate()
    return res
  };

  return [deleteReview, result];
};

export default useDeleteReview
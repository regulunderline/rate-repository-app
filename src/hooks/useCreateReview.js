import { useMutation } from '@apollo/client'
import { useEffect } from 'react';

import { CREATE_REVIEW } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage';

const useCreateReview = () => {

  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (vars) => {

    const variables = {
      review: {
        ownerName: vars.owner,
        repositoryName: vars.name,
        rating: Number(vars.rating),
      } 
    } 

    if (vars.review) {
      variables.review.text = vars.review
    }

    const res = await mutate({ variables })
    if(res.errors) {
      throw new Error(res.errors.map(e => e.message))
    } 

    return res.data.createReview.repositoryId
  };

  return [createReview, result];
};

export default useCreateReview
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview'
import Text from './Text';
import { useState } from 'react';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
  flexItemA: {
    flexGrow: 1,
    color: theme.colors.textSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#AAAA',
    margin: 5,
    padding: 20,
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 10,
    textAlign: 'center',
    padding: 20,
    margin: 5
  },
  flexItemError: {
    flexGrow: 1,
    color: '#d73a4a',
    paddingLeft: 10,
    paddingBottom: 10
  },
});

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  name: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Rating can\'t be less then 1')
    .max(100, 'Rating can\'t be more thant 100')
    .integer('Rating must be an integer'),
  review: yup
    .string()
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: ''
};

export const ReviewForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      {error && <Text style={styles.flexItemError}>{error}</Text>}
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.owner}
        onChangeText={formik.handleChange('owner')}
        style={[
          styles.flexItemA,
          formik.touched.owner && formik.errors.owner && {borderColor: 'red'},
        ]}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={styles.flexItemError}>{formik.errors.owner}</Text>
      )}
      <TextInput
        style={[
          styles.flexItemA,
          formik.touched.name && formik.errors.name && {borderColor: 'red'},
        ]}
        placeholder="Repository name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      {formik.touched.name && formik.errors.name && (
        <Text style={styles.flexItemError}>{formik.errors.name}</Text>
      )}
      <TextInput
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          styles.flexItemA,
          formik.touched.rating && formik.errors.rating && {borderColor: 'red'},
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.flexItemError}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          styles.flexItemA,
          formik.touched.review && formik.errors.review && {borderColor: 'red'},
        ]}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={styles.flexItemError}>{formik.errors.review}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.flexItemB}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const  CreateReview = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { owner, name, rating, review } = values;

    try {
      const id = await createReview({ owner, name, rating, review });
      navigate(`/repositories/${id}`)
    } catch (e) {
      setError(e.message)
      setTimeout(()=> {setError(null)}, 5000)
    }
  };

  return <ReviewForm onSubmit={onSubmit} error={error}/>;
};

export default CreateReview;
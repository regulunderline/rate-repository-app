import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp'
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
  username: yup
    .string()
    .min(5, 'Username must be 5 to 30 characters long')
    .max(30, 'Username must be 5 to 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be 5 to 30 characters long')
    .max(30, 'Password must be 5 to 30 characters long')
    .required('Password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
    .required('Confirm the password')
});

const initialValues = {
  username: '',
  password: '',
  confirmation: ''
};

export const SignUpForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      {error && <Text style={styles.flexItemError}>{error}</Text>}
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.flexItemA,
          formik.touched.username && formik.errors.username && {borderColor: 'red'},
        ]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.flexItemError}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[
          styles.flexItemA,
          formik.touched.password && formik.errors.password && {borderColor: 'red'},
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.flexItemError}>{formik.errors.password}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[
          styles.flexItemA,
          formik.touched.confirmation && formik.errors.confirmation && {borderColor: 'red'},
        ]}
        placeholder="Password Confirmation"
        value={formik.values.confirmation}
        onChangeText={formik.handleChange('confirmation')}
      />
      {formik.touched.confirmation && formik.errors.confirmation && (
        <Text style={styles.flexItemError}>{formik.errors.confirmation}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.flexItemB}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(password)

    try {
      const { data } = await signUp({ user: { username, password } });
      console.log(data);
      navigate('/signin')
    } catch (e) {
      console.log(e);
      setError(e.message)
      setTimeout(()=> {setError(null)}, 5000)
    }
  };

  return <SignUpForm onSubmit={onSubmit} error={error}/>;
};

export default SignUp;
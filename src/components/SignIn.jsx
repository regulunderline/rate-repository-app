import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
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
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.flexItemB}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
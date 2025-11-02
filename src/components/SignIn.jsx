import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
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
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.flexItemA}
      />
      <TextInput
        secureTextEntry
        style={styles.flexItemA}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
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
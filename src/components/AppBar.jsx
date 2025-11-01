import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  text: {
    color: 'white',
    padding: 25,
    fontWeight: '900'
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab styles={styles}>Repositories</AppBarTab>
  </View>;
};

export default AppBar;
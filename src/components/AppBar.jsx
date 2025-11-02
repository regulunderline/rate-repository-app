import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    padding: 25,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab styles={styles} route='/'>Repositories</AppBarTab>
      <AppBarTab styles={styles} route={'/signin'}>Sign In</AppBarTab>
    </ScrollView>
  </View>;
};

export default AppBar;
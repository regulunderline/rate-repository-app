import { View, StyleSheet, ScrollView } from 'react-native';
import { useApolloClient } from '@apollo/client'
import Constants from 'expo-constants';

import theme from '../theme'
import AppBarTab from './AppBarTab'
import useMe from '../hooks/useMe'
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { me } = useMe()
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const handleSignOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab styles={styles} route='/'>Repositories</AppBarTab>
      {me && <AppBarTab styles={styles} route='/createreview'>Create a review</AppBarTab>}
      {me 
        ? <AppBarTab styles={styles} route={'/signin'} handlePress={handleSignOut}>Sign Out</AppBarTab>
        : <AppBarTab styles={styles} route={'/signin'}>Sign In</AppBarTab>
      }
    </ScrollView>
  </View>;
};

export default AppBar;
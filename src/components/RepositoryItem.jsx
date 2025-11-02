import { View, Image, StyleSheet } from "react-native"
import Text from './Text' 
import theme from '../theme'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
  flexItemA: {
    flexGrow: 0,
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 3,
    alignSelf: 'flex-start'
  },
  textPrimary: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    padding: 5
  },
  textSecondary: {
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.normal,
    padding: 5
  }
});

const toFormated = number => number >= 1000 
  ? `${Math.round(number/100)/10}k`
  : number

const RepositoryItem = ({ item }) => (
  <View style={styles.flexContainer}>
    <View style={[styles.flexContainer, {flexDirection: 'row', justifyContent: 'flex-start'}]}>
      <Image 
        style={[{width:40,height:40, margin:10}]}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.flexContainer}>
        <Text style={styles.textPrimary}>{item.fullName}</Text>
        <Text style={styles.textSecondary}>{item.description}</Text>
        <Text style={[styles.textSecondary, styles.flexItemB]}>{item.language}</Text>
      </View>
    </View>
    <View style={[styles.flexContainer, {flexDirection: 'row', justifyContent: 'space-around'}]}>
      <View style={styles.flexContainer}>
        <Text style={styles.textPrimary}>{toFormated(item.stargazersCount)}</Text>
        <Text style={styles.textSecondary}>Stars</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.textPrimary}>{toFormated(item.forksCount)}</Text>
        <Text style={styles.textSecondary}>Forks</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.textPrimary}>{toFormated(item.reviewCount)}</Text>
        <Text style={styles.textSecondary}>Reviews</Text>
      </View>
      <View style={styles.flexContainer}>
        <Text style={styles.textPrimary}>{toFormated(item.ratingAverage)}</Text>
        <Text style={styles.textSecondary}>Rating</Text>
      </View>
    </View>
  </View>
)

export default RepositoryItem
import { View, StyleSheet } from 'react-native'
import { format } from 'date-fns'

import Text  from './Text';
import theme from '../theme'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
  flexItemB: {
    flexGrow: 0,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 4,
    margin: 10
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={[styles.flexContainer, {flexDirection: 'row'}]}>
        <View style={styles.flexItemB}><Text style={{ color: theme.colors.primary, alignSelf: 'center' }}>{review.rating}</Text></View>
        <View style={[styles.flexContainer, { flexWrap: 'nowrap'}]}>
          <Text style={styles.textPrimary}>{review.user.username}</Text>
          <Text style={styles.textSecondary}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
          <Text style={{ width: 300, marginBottom: 5 }}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
};

export default ReviewItem
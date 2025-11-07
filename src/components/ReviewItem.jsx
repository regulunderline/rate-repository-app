import { View, StyleSheet, Pressable, Alert } from 'react-native'
import { useNavigate } from 'react-router-native'
import { format } from 'date-fns'

import Text  from './Text';
import useDeleteReview from '../hooks/useDeleteReview'
import theme from '../theme'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: 'white',
  },
  flexItemA: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 3,
    alignSelf: 'flex-start'
  },
  flexItemB: {
    flexGrow: 0,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingTop: 9,
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

const ReviewItem = ({ review, withRepository, refetch }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview(review.id)

  const handleDelete = () => {
    Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
      {
        text: 'CANCEL',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'DELETE', onPress: async () => {
        try {
          const res = await deleteReview()
          refetch()
        } catch (e) {
          console.log(e)
        }
      }},
    ])
  }

  return (
    <View style={styles.flexContainer}>
      <View style={[styles.flexContainer, {flexDirection: 'row'}]}>
        <View style={styles.flexItemB}><Text style={{ color: theme.colors.primary, alignSelf: 'center' }}>{review.rating}</Text></View>
        <View style={[styles.flexContainer, { flexWrap: 'nowrap'}]}>
          <Text style={styles.textPrimary}>{withRepository ? review.repository.fullName : review.user.username}</Text>
          <Text style={styles.textSecondary}>{format(review.createdAt, 'dd.MM.yyyy')}</Text>
          <Text style={{ width: 300, marginBottom: 5 }}>{review.text}</Text>
          {withRepository &&
            <View style={[styles.flexContainer, {flexDirection: 'row'}]}>
              <Pressable onPress={() => navigate(`/repositories/${review.repository.id}`)}>
                <View style={[ styles.flexItemA, { alignSelf: 'stretch', margin: 10 }]}>
                  <Text 
                    style={{ color: 'white', alignSelf: 'center', padding: 10}}
                  >
                    View repository
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={handleDelete}>
                <View style={[ styles.flexItemA, { alignSelf: 'stretch', backgroundColor: 'red', margin: 10 }]}>
                  <Text 
                    style={{ color: 'white', alignSelf: 'center', padding: 10}}
                  >
                    Delete review
                  </Text>
                </View>
              </Pressable>
            </View> 
          }
        </View>
      </View>
    </View>
  )
};

export default ReviewItem
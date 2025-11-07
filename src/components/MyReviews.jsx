import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import Text from './Text';
import ReviewItem from './ReviewItem'
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, refetch } = useMe(true);

  if(!me) {
    return null
  }

  const reviews = me.reviews.edges

  if(reviews.length === 0) {
    return <View style={{ margin: 30 }}><Text>No reviews</Text></View>
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} withRepository refetch={refetch} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={review => review.node.id}
    />
  )
};

export default MyReviews;
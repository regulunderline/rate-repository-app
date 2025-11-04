import { useParams } from 'react-router-native'
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import useOneRepository from '../hooks/useOneRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ paddingBottom: 10 }}>
      <RepositoryItem item={repository} showUrl/>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams(id)
  const { repository } = useOneRepository(id);

  if(!repository) {
    return null
  }

  const reviews = repository.reviews.edges

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  )
};

export default SingleRepository;
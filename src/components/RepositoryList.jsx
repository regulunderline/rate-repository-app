import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <Picker
          selectedValue={order}
          onValueChange={newOrder => {
              setOrder(newOrder)
            }
          }
        >
          <Picker.Item 
            label="Latest repositories" 
            value="Latest repositories"
          />
          <Picker.Item 
            label="Highest rated repositories" 
            value="Highest rated repositories" 
          />
          <Picker.Item 
            label="Lowest rated repositories" 
            value="Lowest rated repositories" 
          />
        </Picker>}
      renderItem={({ item }) => <Pressable onPress={() => {navigate(`/repositories/${item.id}`)}}><RepositoryItem item={item} /></Pressable>}
      keyExtractor={item => item.id}
      // other props
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("Latest repositories")
  const { repositories } = useRepositories(order);

  return <RepositoryListContainer repositories={repositories} order={order} setOrder={setOrder} />;
};

export default RepositoryList;
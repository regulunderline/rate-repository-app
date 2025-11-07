import { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import {Picker} from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder, setSearch }) => {
  const navigate = useNavigate()
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={{ padding: 10 }}>
          <TextInput 
            style={{ margin: 3, padding: 10, backgroundColor: 'white', borderRadius: 5 }}
            placeholder="search"
            placeholderTextColor="gray"
            onChange={event => setSearch(event.target.value)}
          />
          <Picker
            style={{ margin: 3, padding: 10, backgroundColor: 'white', borderRadius: 5 }}
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
          </Picker>
        </View>
      }
      renderItem={({ item }) => <Pressable onPress={() => {navigate(`/repositories/${item.id}`)}}><RepositoryItem item={item} /></Pressable>}
      keyExtractor={item => item.id}
      // other props
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState("Latest repositories")
  const [search, setSearch] = useState('')
  const [searchKeyword] = useDebounce(search, 500)
  const { repositories } = useRepositories(order, searchKeyword);

  return <RepositoryListContainer 
    repositories={repositories} 
    order={order} 
    setOrder={setOrder} 
    setSearch={setSearch} 
  />;
};

export default RepositoryList;
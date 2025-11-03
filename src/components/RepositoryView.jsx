import { useParams } from 'react-router-native'
import { View } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useOneRepository from '../hooks/useOneRepository';

export const RepositoryViewContainer = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showUrl/>
    </View>
  );
};

const RepositoryView = () => {
  const id = useParams(id)
  const { repository } = useOneRepository(id);

  if(!repository) {
    return null
  }

  return <RepositoryViewContainer repository={repository}/>;
};

export default RepositoryView;
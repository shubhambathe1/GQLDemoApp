import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/react-hooks';

//API
import USER from '../networking/query/user';
import CREATE_POST from '../networking/mutation/createPost';
import DELETE_POST from '../networking/mutation/deletePost';

import PostListingComponent from './components/postListingComponent';

const ScreenTwo = () => {
  const route = useRoute();

  // Refresh Flag State
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  // For api call
  const { loading, error, data } = useQuery(USER, {
    fetchPolicy: 'network-only',
    refresh,
  });

  // Add Update Delete Post Mutations
  const [deletePost] = useMutation(DELETE_POST);

  useEffect(() => {
    if (data) {
      setRefresh(false);
    }
  }, [data, error]);

  const deleteMyPost = (id) => {
    setLoader(true);
    deletePost({ variables: { id } }).then(({ data, errors }) => {
      setLoader(false);
      setRefresh(true);
      Alert.alert(
        'Alert',
        'Post has been deleted...',
        [
          {
            text: 'OK',
            onPress: () => {
              // navigation.navigate('One');
            },
          },
        ],
        { cancelable: false },
      );
    });
  };

  if (loading || loader) {
    return <ActivityIndicator />;
  }
  if (data) {
    return (
      <PostListingComponent
        userId={route.params.userId}
        data={data}
        deleteMyPost={deleteMyPost}
      />
    );
  }
};

export default ScreenTwo;

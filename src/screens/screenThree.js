import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRoute } from '@react-navigation/native';

//API
import GET_POST_BY_ID from '../networking/query/post';
import CREATE_POST from '../networking/mutation/createPost';
import UPDATE_POST from '../networking/mutation/updatePost';

import PostFormComponent from './components/postFormComponent';

const ScreenThree = ({ navigation }) => {
  const route = useRoute();

  // screen action
  const [userId, setUserId] = useState(route.params.userId);
  const [action, setAction] = useState(route.params.action);

  // Refresh Flag State
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  // Add Update Delete Post Mutations
  const [createPost] = useMutation(CREATE_POST);

  // Update Post Mutations
  const [updatePost] = useMutation(UPDATE_POST);

  // For api call
  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: route.params.postId,
      refresh,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    console.log('USER ID:', userId);
  }, []);

  const addMyPost = (title, text) => {
    setLoader(true);
    createPost({ variables: { userId, title, text } }).then(
      ({ data, errors }) => {
        setLoader(false);
        setRefresh(true);
        Alert.alert(
          'Alert',
          'Post has been added...',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('One');
              },
            },
          ],
          { cancelable: false },
        );
      },
    );
  };

  const updateMyPost = (id, title, text) => {
    setLoader(true);
    updatePost({ variables: { id, title, text } }).then(({ data, errors }) => {
      setLoader(false);
      Alert.alert(
        'Alert',
        'Post has been updated...',
        [
          {
            text: 'OK',
            onPress: () => {
              setRefresh(true);
              navigation.navigate('One');
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
  if (data || action === 'add') {
    return (
      <PostFormComponent
        action={action}
        data={data}
        addMyPost={addMyPost}
        updateMyPost={updateMyPost}
      />
    );
  }
};

export default ScreenThree;

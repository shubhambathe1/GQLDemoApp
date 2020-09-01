import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Text, View, Button, ActivityIndicator } from 'react-native';

//API
import User from '../networking/query/user';

const ScreenOne = ({ navigation }) => {
  // Refresh Flag State
  const [refresh, setRefresh] = useState(false);

  // For api call
  const { loading, error, data } = useQuery(User, {
    variables: {
      refresh,
    },
    fetchPolicy: 'network-only',
  });

  // For refreshing screen when focused
  useFocusEffect(
    React.useCallback(() => {
      setRefresh(true);
    }, []),
  );

  if (loading) {
    return <ActivityIndicator />;
  }
  if (data) {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>User name: {data.User.name}</Text>
        <Text>User email: {data.User.email}</Text>
        <Text>Number of Notes: {data.User.posts.length}</Text>
        <Button
          title="Goto Notes"
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'One' },
                  {
                    name: 'Two',
                    params: {
                      userId: data.User.id,
                      posts: data.User.posts,
                    },
                  },
                ],
              }),
            )
          }
        />
      </View>
    );
  }
};

export default ScreenOne;

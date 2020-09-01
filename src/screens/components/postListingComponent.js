import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostListingComponent = (props) => {
  // for navigation
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Item
      id={item.id}
      title={item.title}
      text={item.text}
      props={props}
      navigation={navigation}
    />
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        data={props.data.User.posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Add Post"
        onPress={() =>
          navigation.navigate('Three', {
            userId: props.userId,
            action: 'add',
          })
        }
      />
    </View>
  );
};

const Item = ({ id, title, text, navigation, props }) => (
  <View
    style={{
      height: 100,
      width: '100%',
      backgroundColor: 'gray',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Three', { postId: id, action: 'update' })
      }>
      <Text
        style={{
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>

    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 17 }}>
      {text}
    </Text>
    <TouchableOpacity onPress={() => props.deleteMyPost(id)}>
      <Image
        style={{ height: 20, width: 20, marginTop: 10 }}
        source={require('../../images/cross_icon.png')}
      />
    </TouchableOpacity>
  </View>
);

export default PostListingComponent;

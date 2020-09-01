import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';

const PostFormComponent = (props) => {
  // FORM DATA STATE
  const [action, setAction] = useState(props.action);

  const [id, setId] = useState(
    props.action === 'update' ? props.data.Post.id : '',
  );
  const [titleValue, onChangeTitleValue] = useState(
    props.action === 'update' ? props.data.Post.title : '',
  );
  const [textValue, onChangeTextValue] = useState(
    props.action === 'update' ? props.data.Post.text : '',
  );

  useEffect(() => {
    if (action === 'add') {
      onChangeTitleValue('');
      onChangeTextValue('');
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          height: 40,
          width: '100%',
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(text) => onChangeTitleValue(text)}
        value={titleValue}
      />
      <TextInput
        style={{
          height: 40,
          width: '100%',
          borderColor: 'gray',
          borderWidth: 1,
          marginTop: 10,
        }}
        onChangeText={(text) => onChangeTextValue(text)}
        value={textValue}
      />
      {props.action === 'add' ? (
        <Button
          title="Add Post"
          onPress={() => props.addMyPost(titleValue, textValue)}
        />
      ) : (
          <Button
            title="Update Post"
            onPress={() => props.updateMyPost(id, titleValue, textValue)}
          />
        )
      }
    </View>
  );
};

export default PostFormComponent;

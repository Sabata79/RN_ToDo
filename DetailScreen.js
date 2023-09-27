import React, { useState,useLayoutEffect } from 'react'
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function DetailsScreen({navigation}) {
  const [todo, setTodo] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f0f0f0'
      },
      headerRight: () => (
        <AntDesign 
          style={styles.navButton} 
          name="save"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Home',{todo: todo})}
        />
      ),
    })
  }),[todo];

  return (
    <View>
      <TextInput 
        style={styles.newTask} onChangeText={text => setTodo(text)}
        value={todo}
        placeholder="Add new task"
      />
    </View>
  )
}
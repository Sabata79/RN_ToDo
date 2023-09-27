import React, { useState, useLayoutEffect, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_key';

export default function HomeScreen({ route, navigation }) {

    const [todos, setTodos] = useState([]);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            return (
                AsyncStorage.getItem(STORAGE_KEY)
                    .then(req => JSON.parse(req))
                    .then(json => {
                        if (json === null) {
                            json = [];
                        }
                        setTodos(json);
                    })
                    .catch(error => console.log('error!'))
            )
        } catch (e) {
            console.log(e);
        }
    }

    /*   const [todos, setTodos] = useState(
        Array(10).fill('').map((_,i)=> (`Test ${i}`))
      ); */

    useEffect(() => {
        if (route.params?.todo) {
            const newKey = todos.length + 1;
            const newTodo = { key: newKey.toString(), description: route.params.todo };
            const newTodos = [...todos, newTodo];
            storeData(newTodos);
        }
        getData();
    }, [route.params?.todo])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fcfcfc'
            },
            headerRight: () => (
                <AntDesign
                    style={styles.navButton}
                    name="plus"
                    size={24}
                    color="black"
                    onPress={() => navigation.navigate('Todo')}
                />
            ),
        })
    }, [])



    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    todos.map((todo) => (
                        <View key={todo.key} style={styles.rowContainer}>
                            <Text style={styles.rowText}>{todo.description}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

import React, { Component } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import Todo from './components/Todo'

export default function App() {
  
    return (
      <View style={styles.container}>
        <Todo/>
      </View>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff', // Light background
    },
  });



import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
    return (
        <View style={style.container}>
            <View
                style={style.box1}>
                <Text>1</Text>
            </View>
            <View
                style={style.box2}>
                <Text>2</Text>
            </View>
            <View
                style={style.box3}>
                <Text>3</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
  container: {
    padding: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    height: 300
  },
  box1: {
    flex: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',

  },
});
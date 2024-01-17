import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useMMKV } from 'react-native-mmkv';
import { FIREBASE_AUTH } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';



const Pincode = () => {

    const [numOne, setNumOne] = useState('');
    const [numTwo, setNumTwo] = useState('');
    const [numThree, setNumThree] = useState('');
    const [numFour, setNumFour] = useState('');
    const [value, setValue] = useState('')

    const ref = React.useRef();
    const ref1 = React.useRef();
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    const ref4 = React.useRef();


    const auth = FIREBASE_AUTH;

    const CurrentEmailUser = auth.currentUser?.email;

    const storage = useMMKV({id: `user-${CurrentEmailUser}-storage`});

    const pin1 = storage.getString('pin1')
    const pin2 = storage.getString('pin2')
    const pin3 = storage.getString('pin3')
    const pin4 = storage.getString('pin4')

    const fullPin = pin1 + pin2 + pin3 + pin4;

    if (value.length === 1) {
        var iconName = 'ellipse';
        var iconName1 = 'ellipse-outline';
        var iconName2 = 'ellipse-outline';
        var iconName3 = 'ellipse-outline';
        var animation = 'fadeIn';
        ref.current.focus();
    } else {
        var iconName = 'ellipse-outline';
        var iconName1 = 'ellipse-outline';
        var iconName2 = 'ellipse-outline';
        var iconName3 = 'ellipse-outline';
        
    }

  return (
    <LinearGradient colors={['#008080', '#106066', '#093e42']} style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Установите пин-код</Text>
            <Text>{fullPin}</Text>
                <View style={styles.viewForm}>
                    <TextInput 
                    onChangeText={(value) => {
                        setNumOne(value); console.log(value);
                        storage.set('pin1', value)
                            }}
                        value={numOne}
                        style={styles.input} secureTextEntry inputMode='numeric' maxLength={1}/>
                    <TextInput
                    value={numTwo}
                    ref={ref}
                    onChangeText={(value) => {
                        setNumTwo(value); console.log(value);
                        storage.set('pin2', value)}}
                        style={styles.input} secureTextEntry inputMode='numeric' maxLength={1}/>
                    <TextInput
                    ref={ref1}
                    value={numThree}
                    onChangeText={(value) => {
                        setNumThree(value); console.log(value);
                        storage.set('pin3', value)
                        if (value.length === 1){
                            ref2.current.focus();}
                            }}
                    style={styles.input} secureTextEntry inputMode='numeric' maxLength={1}/>
                    <TextInput
                    ref={ref2}
                    value={numFour}
                    onChangeText={(value) => {
                        setNumFour(value); console.log(value);
                        storage.set('pin4', value);
                    }}
                    style={styles.input} secureTextEntry inputMode='numeric' maxLength={1} />
                </View>
                <View style={styles.viewForm}>
                    <Animatable.View animation={animation} >
                        <Icon name={iconName} color={'white'} size={16} />
                    </Animatable.View >
                    <Animatable.View>
                        <Icon name={iconName1} color={'white'} size={16} />
                    </Animatable.View>
                    <Animatable.View>
                        <Icon name={iconName2} color={'white'} size={16} />
                    </Animatable.View>
                    <Animatable.View>
                        <Icon name={iconName3} color={'white'} size={16} />
                    </Animatable.View>
                </View>
                <View style={styles.viewForm}>
                    <TouchableHighlight
                    style={styles.viewOfNumbers}
                    onPress={() => setValue('7')}
                    underlayColor={'#008080'}>
                        <Text style={styles.numButton}>7</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={styles.viewOfNumbers}
                    onPress={() => setValue('8')}
                    underlayColor={'#008080'}>
                        <Text style={styles.numButton}>8</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    style={styles.viewOfNumbers}
                    onPress={() => setValue('9')}
                    underlayColor={'#008080'}>
                        <Text style={styles.numButton}>9</Text>
                    </TouchableHighlight>
                </View>
        </SafeAreaView>
    </LinearGradient>
  )
}

export default Pincode

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        alignItems: 'center',
      },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 30,
        padding: 25,
      },
      input: {
        width: 50,
        height: 50,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',

      },
      viewForm: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      numButton: {
        width: 80,
        height: 80,
        textAlign: 'center',
        borderRadius: 40,
        borderColor: 'white',
        borderWidth: 2,
        color: 'white',
        paddingTop: 25,
        fontSize: 20

      },
      viewOfNumbers: {
        flexDirection: 'row',
        marginTop: 50,
        gap: 20,
        height: 80,
        width: 80,
        borderRadius: 40,
      }
})
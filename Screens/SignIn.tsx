import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FIREBASE_AUTH } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = FIREBASE_AUTH;

  const SignInButton = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('Юзер', response.user.email, 'вошел');
    } catch (error) {
      console.log(error)
    }
  }

  const elementsForSignInPage = [
    {
      id: 1,
      value: email,
      onChangeText: setEmail,
      autoCapitalize: 'none',
      placeholder: 'Email',
      autoCorrect: 'false',
    },
    {
      id: 2,
      value: password,
      onChangeText: setPassword,
      autoCapitalize: 'none',
      placeholder: 'Пароль',
      autoCorrect: 'false',
      secureTextEntry: true,
    },
  ]

  const Navigation = useNavigation();

  return (
    <LinearGradient colors={['#008080', '#106066', '#093e42']} style={styles.linearGradient}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Введите ваши данные</Text>
      <View style={styles.bodyOfInput}>
        {elementsForSignInPage.map((item) => {
          return (
            <View key={item.id}>
              <TextInput style={styles.input} value={item.value} onChangeText={item.onChangeText} autoCapitalize={item.autoCapitalize} placeholder={item.placeholder} secureTextEntry={item.secureTextEntry}/>
            </View>
          )
        })}
        </View>
      <TouchableOpacity style={styles.bodyOfButton} onPress={SignInButton}>
        <Text style={styles.textOfButton}>Войти</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </LinearGradient>
  )
}

export default SignIn

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 25,
  },
  input: {
    backgroundColor: 'white',
    height: 35,
    padding: 10,
    width: 300,
    borderRadius: 10
  },
  bodyOfInput: {
    justifyContent: 'center',
    gap: 10
  },
  bodyOfButton: {
    backgroundColor: '#F4A460',
    height: 50,
    justifyContent: 'center',
    width: 300,
    marginTop: 50,
    borderRadius: 15,
    alignItems: 'center'
  },
  textOfButton: {
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  AlreadyHaveAccount: {
    paddingLeft: 25,
    color: 'white',
    paddingTop: 12
  },
  AlreadyHaveAccount2: {
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 12
  },
  haveAccView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignContent: 'center',
  }
})
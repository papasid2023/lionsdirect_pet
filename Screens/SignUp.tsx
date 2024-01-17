import { Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FIREBASE_AUTH } from '../firebaseConfig';
import { MMKV } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native';
import SignIn from './SignIn';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CheckBox } from '@rneui/themed';
import { elementsForSignUpPage } from '../Src/elementsForSignUp';


const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SecondPassword, setSecondPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [ButtonDisabled, setButtonDisabled] = useState(true);
  const toggleBtnDisabled = () => setButtonDisabled(!ButtonDisabled);
  const toggleCheckbox = () => setChecked(!checked);

  const storage = new MMKV({id: `user-${email}-storage`});

  const SaveDataInMmkv = () => {
    try {
      storage.set('name', name)
      storage.set('email', email)
      storage.set('password', password)
      storage.set('privacyAtempt', ButtonDisabled)
      console.log('В mmkv', `user-${email}-storage`, 'добавлены данные' )
    } catch (error) {
      console.log(error)
    }
  }

  const auth = FIREBASE_AUTH;

  const SignUpButton = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      SaveDataInMmkv();
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  const link ='https://www.lionsdirect.ru/privacy';
  const openLink = () => Linking.openURL(link);

  const Navigation = useNavigation();

  if (SecondPassword != password) {
    var ErrorText = 'Пароли не совпадают'
  } else {
  }
  
  const elementsForSignUpPage = [
    
    {
        id: 1,
        value: name,
        onChangeText: setName,
        autoCapitalize: 'none',
        placeholder: 'Ваше имя',
        autoCorrect: 'false',
    },
    {
        id: 2,
        value: email,
        onChangeText: setEmail,
        autoCapitalize: 'none',
        placeholder: 'Почта',
        autoCorrect: 'false',
    },
    {
        id: 3,
        value: password,
        onChangeText: setPassword,
        autoCapitalize: 'none',
        placeholder: 'Пароль',
        autoCorrect: 'false',
        secureTextEntry: true,
    },
    {
        id: 4,
        value: SecondPassword,
        onChangeText: setSecondPassword,
        autoCapitalize: 'none',
        placeholder: 'Повторите пароль',
        autoCorrect: 'false',
        secureTextEntry: true,
  }
  ]

  return (
    <LinearGradient colors={['#008080', '#106066', '#093e42']} style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Введите ваши данные</Text>
        <View style={styles.bodyOfInput}>
          {elementsForSignUpPage.map((item) => {
            return (
              <View key={item.id}>
                <TextInput style={styles.input} value={item.value} onChangeText={item.onChangeText} autoCapitalize={item.autoCapitalize} placeholder={item.placeholder} secureTextEntry={item.secureTextEntry} />
              </View>
            )
          }
          )}
          <Text style={styles.ErrorText}>{ErrorText}</Text>
          <TouchableOpacity style={styles.itemsCheckbox}>
            <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            onPressOut={toggleBtnDisabled}
            iconType="material-community"
            style={styles.iconInCheckbox}
            checkedIcon="checkbox-blank-outline"
            uncheckedIcon="checkbox-outline"
            checkedColor="white"
            uncheckedColor='white'
            containerStyle={styles.checkbox}
            textStyle={styles.textOfCheckbox}
            />
            <Text onPress={openLink} style={styles.titleInCheckbox}>Регистрируясь в данном приложении я соглашаюсь с политикой обработки персональных данных</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.bodyOfButton} disabled={ButtonDisabled} onPress={SignUpButton}>
          <Text  style={styles.textOfButton}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.haveAccView} onPress={() => Navigation.navigate(SignIn)}>
          <Text style={styles.AlreadyHaveAccount}>Уже есть аккаунт?</Text>
          <Text style={styles.AlreadyHaveAccount2}>Войти</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUp

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
    lineHeight: 30,
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
    gap: 10,
  },
  bodyOfButton: {
    backgroundColor: '#F4A460',
    height: 50,
    justifyContent: 'center',
    width: 300,
    marginTop: 30,
    borderRadius: 15,
    alignItems: 'center'
  },
  textOfButton: {
    fontWeight: 'bold',
    color: 'black'
  },
  AlreadyHaveAccount: {
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
    gap: 5,
  },
  checkbox: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  textOfCheckbox: {
    fontSize: 10,
    color: 'grey',
    fontWeight: '300',
    letterSpacing: 0.1,
  },
  iconInCheckbox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemsCheckbox: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInCheckbox: {
    fontSize: 10,
    color: 'white',
    lineHeight: 10,
    textDecorationLine: 'underline'
  },
  ErrorText: {
    color: 'white',
    fontSize: 12
  }
})
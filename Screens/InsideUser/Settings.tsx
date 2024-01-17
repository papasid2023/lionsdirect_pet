import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { storage, CurrentMail, auth} from '../../Pay/Auth';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig';


const Settings = () => {

  const [name, setName] = useState(storage.getString('name'));
  const [instagram, setInstagram] = useState(storage.getString('instagram'));
  const [telegram, setTelegram] = useState(storage.getString('telegram'));
  const [whatsup, setWhatsup] = useState(storage.getString('whatsup'));
  const [city, setCity] = useState(storage.getString('city'));

  const SaveDataInMMKV = () => {
    try {
      storage.set('name', `${name}`)
      storage.set('instagram', `${instagram}`)
      storage.set('telegram', `${telegram}`)
      storage.set('whatsup', `${whatsup}`)
      storage.set('city', `${city}`)
      console.log('В MMKV сторадж', {CurrentMail}, 'добавлены данные')
    } catch (error) {
      console.log(error)
    }
  }

  const SaveOrderInDbFirebase = async () => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, `${CurrentMail}`), {CurrentMail});
      console.log(docRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  const dataOfUser = [
    {
      id: 1,
      title: 'Имя',
      valueOfTitle: name,
      onChangeText: setName,
      autoCorrect: false,
    },
    {
      id: 2,
      title: 'Почта',
      valueOfTitle: CurrentMail,
      autoCorrect: false,
    },
    {
      id: 3,
      title: 'Ник в Instagram*',
      valueOfTitle: instagram,
      onChangeText: setInstagram,
      autoCorrect: false,
    },
    {
      id: 4,
      title: 'Ник в Telegram',
      valueOfTitle: telegram,
      onChangeText: setTelegram,
      autoCorrect: false,
    },
    {
      id: 5,
      title: "Номер телефона What's Up",
      valueOfTitle: whatsup,
      onChangeText: setWhatsup,
      autoCorrect: false,
    },
    {
      id: 6,
      title: 'Город',
      valueOfTitle: city,
      onChangeText: setCity,
      autoCorrect: false,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Данные пользователя</Text>
        <Text style={styles.descriptionOfTitle}>Заполните данные один раз, чтобы не вводить данные несколько раз при заказе</Text>
        {dataOfUser.map((item) => {
          return (
            <View style={styles.displayOfUserData} key={item.id}>
              <Text style={styles.titleOfCategory}>{item.title}</Text>
              <TextInput style={styles.textOfInput} value={item.valueOfTitle} onChangeText={item.onChangeText} autoCorrect={item.autoCorrect} />
            </View>
          )
        })}
        <Text style={styles.BtnText} onPress={() => SaveDataInMMKV()} onPressOut={SaveOrderInDbFirebase}>СОХРАНИТЬ</Text>
        <Text style={styles.bottomText} onPress={() => auth.signOut()}>Выйти из аккаунта</Text>
        <Text style={styles.descriptionOfTitleInsta}>* Деятельность Meta (соцсети Facebook и Instagram) запрещена в России как экстремисткая</Text>

    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  displayOfUserData: {
    width: '90%',
  },
  titleOfCategory: {
    fontSize: 14,
    fontWeight: '500'
  },
  textOfInput: {
    height: 35,
    borderRadius: 8,
    backgroundColor: '#5F9EA0',
    padding: 10,
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    justifyContent: 'center',
    marginBottom: 20,
    fontWeight: '600'
  },
  BtnText: {
    fontWeight: 'bold',
    margin: 10
  },
  descriptionInsta: {
    fontSize: 10
  },
  bottomText: {
    marginTop: 20,
  },
  descriptionOfTitle: {
    fontSize: 14,
    width: '90%',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 10
  },
  descriptionOfTitleInsta: {
    fontSize: 10,
    width: '90%',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 10
  }
})
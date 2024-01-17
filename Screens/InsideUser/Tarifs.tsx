import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Pressable, Linking, ScrollView } from 'react-native';
import { CheckBox } from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import History from './History';
import { FIREBASE_DB, addDoc } from '../../firebaseConfig';
import { collection } from 'firebase/firestore';
import { tarifTest, tarifMedium, tarifGold, tarifVip} from '../../Pay/Robokassa';
import { storage, CurrentMail } from '../../Pay/Auth';


const Tarifs = () => {

  const [selectedIndex, setIndex] = React.useState(1);
  const [modalVisible6, setModalVisible6] = useState(false);
  const [counter, setCounter] = useState(1);
  const [name] = useState(storage.getString('name'));
  const [instagram] = useState(storage.getString('instagram'));
  const [telegram] = useState(storage.getString('telegram'));
  const [whatsup] = useState(storage.getString('whatsup'));
  const [city] = useState(storage.getString('city'));

  const tarifElements = [
    {
      id: 1,
      onPress: () => setIndex(0),
      checked: selectedIndex === 0,
      onPressOnCheck: () => setIndex(0),
      style: styles.iconInCheckbox,
      containerStyle: styles.checkbox,
      iconType: "material-community",
      checkedIcon: "checkbox-outline",
      uncheckedIcon: "checkbox-blank-outline",
      checkedColor: '#036161',
      uncheckedColor: 'grey',
      nameOfTarif: 'TEST - 4 900₽',
      countOfMessages: '10 000 сообщений',
      priceOfOneMessage: '49 коп за 1 сообщение',
    },
    {
      id: 2,
      onPress: () => setIndex(1),
      checked: selectedIndex === 1,
      onPressOnCheck: () => setIndex(1),
      style: styles.iconInCheckbox,
      containerStyle: styles.checkbox,
      iconType: "material-community",
      checkedIcon: "checkbox-outline",
      uncheckedIcon: "checkbox-blank-outline",
      checkedColor: '#036161',
      uncheckedColor: 'grey',
      nameOfTarif: 'MEDIUM - 9 500₽',
      countOfMessages: '20 000 сообщений',
      priceOfOneMessage: '47 коп / 1 сообщение',
      shopingTag: 'Чаще всего берут',
      iconOfShopingTag: 'flame',
    },
    {
      id: 3,
      onPress: () => setIndex(2),
      checked: selectedIndex === 2,
      onPressOnCheck: () => setIndex(2),
      style: styles.iconInCheckbox,
      containerStyle: styles.checkbox,
      iconType: "material-community",
      checkedIcon: "checkbox-outline",
      uncheckedIcon: "checkbox-blank-outline",
      checkedColor: '#036161',
      uncheckedColor: 'grey',
      nameOfTarif: 'GOLD - 18 600₽',
      countOfMessages: '40 000 сообщений',
      priceOfOneMessage: '46 коп / 1 сообщение',
    },
    {
      id: 4,
      onPress: () => setIndex(3),
      checked: selectedIndex === 3,
      onPressOnCheck: () => setIndex(3),
      style: styles.iconInCheckbox,
      containerStyle: styles.checkbox,
      iconType: "material-community",
      checkedIcon: "checkbox-outline",
      uncheckedIcon: "checkbox-blank-outline",
      checkedColor: '#036161',
      uncheckedColor: 'grey',
      nameOfTarif: 'VIP - 43 500₽',
      countOfMessages: '100 000 сообщений',
      priceOfOneMessage: '43 коп / 1 сообщение',
      shopingTag: 'Самый выгодный',
      iconOfShopingTag: 'star',
    }
  ]

  const description = [
    {
      id: 1,
      text: '1. Ссылка на пост или рилс (опубликованный в вашем профиле) + небольшой сопровождающий текст',
    },
    {
      id: 2,
      text: '2. ссылки на паблики, с которых я соберу базу. Подойдут локальные паблики, смежные ниши, блогеры или конкуренты.',
    },
    {
      id: 3,
      text: 'Также можно собрать ваших потенциальных клиентов по ключевым словам в шапках профилей, например: наставник, психолог, коуч, нутрициолог, массажист и т.д.',
    },
    {
      id: 4,
      text: '+ по хэштегам',
    },
    {
      id: 5,
      text: 'Или же сделать рассылку на ваших подписчиков для поднятия охватов',
    },
    
  ]

  const handleClick = [
    {
      id: 1,
      onPress: handleClickPlus,
      nameOfIcon: 'add-circle-outline'
    },
    {
      id: 2,
      onPress: handleClickMinus,
      nameOfIcon: 'remove-circle-outline'
    }
  ]



  if (selectedIndex === 0) {
    var animation: string | undefined = 'flash';
    var TestText: string | undefined = 'TEST - 4 900₽ | 10 000 сообщений';
    var payment: number | undefined = 4900;
    var link = tarifTest;
  } if (selectedIndex === 1) {
    var animation: string | undefined = 'jello';
    var TestText: string | undefined = 'MEDIUM - 9 500₽ | 20 000 сообщений';
    var payment: number | undefined = 9500;
    var link = tarifMedium;
  } if (selectedIndex === 2) {
    var animation: string | undefined = 'tada';
    var TestText: string | undefined = 'GOLD - 18 600₽ | 40 000 сообщений';
    var payment: number | undefined = 18600;
    var link = tarifGold;
  } if (selectedIndex === 3) {
    var animation: string | undefined = 'pulse';
    var TestText: string | undefined = 'VIP - 43 500₽ | 100 000 сообщений';
    var payment: number | undefined = 43500;
    var link = tarifVip;
  }

  if (counter) {
    function handleClickPlus() {
      setCounter(counter + 1);
    }
    function handleClickMinus() {
      setCounter(counter - 1);
    }
  }

  const TarifOfOrder = TestText;

  const paymentAmount = payment;

  const SaveOrderInFirestore = async () => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, 'papasid2010@mail.ru'), {CurrentMail, selectedIndex, TarifOfOrder, paymentAmount, name, instagram, telegram, whatsup, city});
      navigation.navigate(History);
      console.log("Document written with ID: ", docRef.id);
      storage.set('docRef.id', docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } 
  }

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Тарифы</Text>
      <Text style={styles.descriptionOfTitle}>Выберите подходящий для вас тариф и нажмите кнопку "оплатить".</Text>
      
        {tarifElements.map((item) => {
          return (
            <View key={item.id}>
              <TouchableOpacity style={styles.itemTarif} onPress={item.onPress}>
                <CheckBox
                  checked={item.checked}
                  onPress={item.onPressOnCheck}
                  style={item.style}
                  containerStyle={item.containerStyle}
                  iconType={item.iconType}
                  checkedIcon={item.checkedIcon}
                  uncheckedIcon={item.uncheckedIcon}
                  checkedColor={item.checkedColor}
                  uncheckedColor={item.uncheckedColor}
                />
                <View style={styles.textOfTarif}>
                  <View style={styles.widthOfFirstTextinTarif}>
                    <Text style={styles.tarifDescription}>{item.nameOfTarif}</Text>
                    <Text style={styles.firstTextOfTarif}>{item.countOfMessages}</Text>
                  </View>
                  <View style={styles.secondTextOfTarif}>
                    <Text style={styles.secondTextOfTarif2}>
                      {item.priceOfOneMessage}
                    </Text>
                    <Text style={styles.descriptOfMedium}>{item.shopingTag}</Text>
                    <Icon style={styles.iconOfMedium} name={item.iconOfShopingTag} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )
        })}

        <ScrollView>
          <Text style={styles.titleWhatNeed}>Для рассылки от вас нужно будет</Text>
          
            {description.map((item) => {
              return (
                <View key={item.id}>
                  <Text style={styles.descriptionOfWhatNeed} >{item.text}</Text>
                </View>
              )
            })}

        </ScrollView>
        <Animatable.View animation={animation} duration={1000}>
          <TouchableOpacity style={styles.bodyOfButton}  onPress={() => setModalVisible6(true)}>
            <Text style={styles.textOfButton}>ЗАКАЗАТЬ</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible6}
          onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible6(!modalVisible6);
        }}>
          <View style={styles.ModalBox}>
            <View style={styles.ModalHeader}>
              <Text style={styles.title}>Корзина</Text>
              <Pressable
                onPress={() => setModalVisible6(!modalVisible6)}>
                <Animatable.View>
                  <Icon style={styles.iconClose} name='close' />
                </Animatable.View>
              </Pressable>
            </View>
            <View style={styles.insideOfBox}>
              <Text style={styles.youChoose}>Вы выбрали</Text>
              <View style={styles.ItemChoosen}>
                <Text style={styles.ChoosenTarif}>{TestText}</Text>
                <Text>( {counter} )</Text>
                {handleClick.map((item) => {
                  return (
                    <TouchableOpacity onPress={item.onPress} key={item.id}>
                      <Icon style={styles.iconForPlusTarif} name={item.nameOfIcon}></Icon>
                    </TouchableOpacity>
                  )
                })}
              </View>
              <TouchableOpacity style={styles.finishButton} onPress={() => Linking.openURL(link)} onPressOut={() => setModalVisible6(!modalVisible6)}>
                <Text style={styles.ButtonModal}>ОПЛАТИТЬ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  )
}

export default Tarifs

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  descriptionOfTitle: {
    fontSize: 14,
    width: '90%',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 10,
  },
  iconInCheckbox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkbox: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  itemTarif: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 350,
    height: 50,
    borderRadius: 10,
    marginBottom: 10
  },
  tarifDescription: {
    fontWeight: 'bold',
  },
  textOfTarif: {
    flexDirection: 'row',
    gap: 10
  },
  secondTextOfTarif: {
    justifyContent: 'center',
    width: 170
  },
  firstTextOfTarif: {
    fontSize: 10,
    color: 'grey',
    fontWeight: 'bold'
  },
  secondTextOfTarif2: {
    fontSize: 14,
    zIndex: 0
  },
  widthOfFirstTextinTarif: {
    width: 125
  },
  bodyOfButton: {
    backgroundColor: '#F4A460',
    height: 50,
    justifyContent: 'center',
    width: 350,
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 15,
    alignItems: 'center'
  },
  textOfButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  descriptOfMedium: {
    fontSize: 10,
    paddingTop: 30,
    paddingLeft: 30,
    color: '#F4A460',
    fontWeight: 'bold',
    position: 'absolute',
  },
  iconOfMedium: {
    position: 'absolute',
    fontSize: 50,
    paddingLeft: 125,
    color: '#F4A460',
    opacity: 0.4
  },
  iconVip: {
    fontSize: 150,
    position: 'absolute',
    color: '#F4A460',
    opacity: 0.3,
    marginTop: 50
  },
  ModalBox: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  },
  iconClose: {
    fontSize: 30,
    paddingLeft: '60%'
  },
  ModalHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '70%',
    padding: 10,
  },
  ButtonModal: {
    fontWeight: 'bold',
    color: 'white',
  },
  ItemChoosen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconForPlusTarif: {
    fontSize: 18,
  },
  titleWhatNeed: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  descriptionOfWhatNeed: {
    marginLeft: 25,
    marginRight: 25,
    fontSize: 14,
    marginTop: 10,
  },
  insideOfBox: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  ChoosenTarif: {
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
    width: '75%'
  },
  youChoose: {
    padding: 10,
  },
  finishButton: {
    backgroundColor: '#F4A460',
    height: 50,
    width: 230,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
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
    color: 'black',
    lineHeight: 10,
    textDecorationLine: 'underline'
  },
  ErrorText: {
    color: 'black',
    fontSize: 12
  },
  checkbox1: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  textOfCheckbox: {
    fontSize: 10,
    color: 'grey',
    fontWeight: '300',
    letterSpacing: 0.1,
  },
  iconInCheckbox1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsCheckbox1: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
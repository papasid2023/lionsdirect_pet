import React, { useState } from 'react'
import { Alert, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Stories from './Stories';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';



const Main = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  const imagesForPrestories = [
    
    {
      id: 1,
      source: require('../../Components/Images/elonMask.jpg'),
      onPress: () => setModalVisible(true),
      visible: modalVisible,
      onRequestClose: () => setModalVisible(!modalVisible),
      titleForPreStories: 'Лучшие кейсы от клиентов',
    },
    {
      id: 2,
      source: require('../../Components/Images/zaed.jpeg'),
      onPress: () => setModalVisible1(true),
      visible: modalVisible1,
      onRequestClose: () => setModalVisible1(!modalVisible1),
      titleForPreStories: 'Топ 10 текстов для рассылок',

    },
    {
      id: 3,
      source: require('../../Components/Images/bilgates.jpeg'),
      onPress: () => setModalVisible2(true),
      visible: modalVisible2,
      onRequestClose: () => setModalVisible2(!modalVisible2),
      titleForPreStories: 'Как собрать активную ЦА',

    },
    {
      id: 4,
      source: require('../../Components/Images/bezos.jpeg'),
      onPress: () => setModalVisible3(true),
      visible: modalVisible3,
      onRequestClose: () => setModalVisible3(!modalVisible3),
      titleForPreStories: 'Как замерить результат',

    },
    {
      id: 5,
      source: require('../../Components/Images/larry.jpeg'),
      onPress: () => setModalVisible4(true),
      visible: modalVisible4,
      onRequestClose: () => setModalVisible4(!modalVisible4),
      titleForPreStories: 'Тарифные скидки и акции',

    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight style={styles.viewForPrestories}>
        <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
      {imagesForPrestories.map((item) => {
        return (
            <Pressable onPress={item.onPress} key={item.id}>
              <Image style={styles.imageForPreStories} source={item.source}/>
              <Text style={styles.titleForPreStories} numberOfLines={2}>{item.titleForPreStories}</Text>
              <Modal
                animationType="none"
                transparent={true}
                visible={item.visible}
                onRequestClose={item.onRequestClose}>
                <View style={styles.ModalBox}>
                  <Animatable.View animation={'zoomIn'}>
                    <Pressable onPress={item.onRequestClose}>
                      <Icon style={styles.iconClose} name={'close'} />
                      <Image style={styles.fullStories} source={item.source}/>
                    </Pressable>
                  </Animatable.View>
                </View>
              </Modal>
            </Pressable>
          )
      })
      }
        </ScrollView>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  imageForPreStories: {
    width: 90,
    height: 120,
    borderRadius: 5,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#036161'

  },
  viewForPrestories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    marginBottom: 50
  },
  ModalBox: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  iconClose: {
    fontSize: 30,
    paddingLeft: '60%'
  },
  fullStories: {
    width: '100%',
    height: '80%',
  },
  titleForPreStories: {
    fontSize: 10,
    marginLeft: 6,
    textAlign: 'left',
    width: 80,
    position: 'absolute',
    backgroundColor: 'white',
    fontWeight: '700',
    marginTop: 90
  }
})
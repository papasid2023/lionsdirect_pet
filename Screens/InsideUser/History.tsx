import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { DocumentSnapshot, Firestore, QuerySnapshot, collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { useMMKV } from 'react-native-mmkv';
import { ActivityIndicator } from 'react-native';
import { storage, CurrentMail } from '../../Pay/Auth';

const History = () => {

  const getDocRefId = storage.getString('docRef.id');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getOrdersData = async () => {
    try {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, `${CurrentMail}`));
      querySnapshot.docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const getOrdersData = doc.data();
      getOrdersData.id = doc.id;
      setData(data);
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <SafeAreaView>
      <Text style={styles.title}>Ваши заказы</Text>
        <Text>Скоро здесь будет история ваших заказов</Text>
    </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
  lineOfOrder: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 5
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 20,
    alignSelf: 'center'
  },
  textInBoxOfOrder: {
    fontSize: 14,
  }
})
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { useMMKV } from 'react-native-mmkv';

const auth = FIREBASE_AUTH;

const CurrentEmailUser = auth.currentUser?.email;

const storage = useMMKV({id: `user-${CurrentEmailUser}-storage`});

const OrderOfCurrentMail = 'orders' + CurrentEmailUser;

const [TarifOfOrder1, setTarifOfOrder1] = useState('');

const getDocRefId = storage.getString('docRef.id');

const getDocTests = async () => {
    try {
        const docRef2 = doc(FIREBASE_DB, `${OrderOfCurrentMail}`, `${getDocRefId}`);
        const docSnap2 = await getDoc(docRef2);
        setTarifOfOrder1(docSnap2.data()?.TarifOfOrder)
        return(
            getDocTests
        )
      } catch (e) {
        console.error("Error get document: ", e);
      }
  }

export const Orders: OrdersParams[] = [
    {
        id: 'id',
        TarifOfOrder1: 'TarifOfOrder'
    }
]
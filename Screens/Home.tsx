import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../firebaseConfig'
import { useMMKV } from 'react-native-mmkv';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './InsideUser/Main';
import Tarifs from './InsideUser/Tarifs';
import Icon from 'react-native-vector-icons/Ionicons';
import History from './InsideUser/History';
import Settings from './InsideUser/Settings';




const Home = () => {

  const auth = FIREBASE_AUTH;

  const CurrentEmailUser = auth.currentUser?.email;

  const storage = useMMKV({id: `user-${CurrentEmailUser}-storage`});

  const TabStack = createBottomTabNavigator();

  return (
    <TabStack.Navigator screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: '#A9A9A9',
      tabBarActiveTintColor: 'white',
      tabBarStyle: {
        backgroundColor: '#036161',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        shadowColor: '#00FFFF',
        shadowRadius: 30,
        shadowOpacity: 0.3
      },
      tabBarIconStyle: {
        marginTop: 10
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: '600'
      }
    }}>
      <TabStack.Screen component={Main} name='Main' options={{
        title: 'Главная',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={22} />
        ),
      }}/>
      <TabStack.Screen component={Tarifs} name='Tarifs' options={{
        title: 'Тарифы',
        tabBarIcon: ({ color }) => (
          <Icon name="pricetags" color={color} size={22} />
        ),
      }}/>
      <TabStack.Screen component={History} name='History' options={{
        title: 'История',
        tabBarIcon: ({ color }) => (
          <Icon name="list" color={color} size={22} />
        ),
      }}/>
      <TabStack.Screen component={Settings} name='Settings' options={{
        title: 'Профиль',
        tabBarIcon: ({ color }) => (
          <Icon name="person" color={color} size={22} />
        ),
      }}/>
    </TabStack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})
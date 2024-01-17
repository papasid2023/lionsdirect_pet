import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../Screens/Welcome';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';
import { FIREBASE_AUTH } from '../firebaseConfig';
import Home from '../Screens/Home';
import { User, onAuthStateChanged } from 'firebase/auth';
import Pincode from '../Screens/Pincode';
import Stories from '../Screens/InsideUser/Stories';

const Stack = createNativeStackNavigator();

function WelcomeStack () {
  return(
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen component={Welcome} name='Welcome' options={{headerShown: false}}/>
      <Stack.Screen component={SignUp} name='SignUp' options={{headerShown: false}}/>
      <Stack.Screen component={SignIn} name='SignIn' options={{headerShown: false}}/>
      <Stack.Screen component={Pincode} name='Pincode' options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function HomeStack () {
  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen component={Home} name='Home' options={{headerShown: false}}/>
      <Stack.Screen component={Stories} name='Stories' options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const auth = FIREBASE_AUTH;

const MainNavigation = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user? (
          <Stack.Screen component={HomeStack} name='HomeStack' options={{headerShown: false}}/>
        ) : (
          <Stack.Screen component={WelcomeStack} name='WelcomeStack' options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})
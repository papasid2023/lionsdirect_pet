import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import SignUp from './SignUp';


const Welcome = () => {

  const Navigation = useNavigation();

  return (
    <LinearGradient colors={['#008080', '#106066', '#093e42']} style={styles.linearGradient}>
      <SafeAreaView style={styles.container}>
        <Animatable.View animation={'tada'}>
          <Text style={styles.title}>РАССЫЛКА В ДИРЕКТ</Text>
          <TouchableOpacity onPress={() => Navigation.navigate(SignUp)} style={styles.bodyOfButton}>
            <Text style={styles.textOfButton}>ЗАРЕГИСТРИРОВАТЬСЯ</Text>
          </TouchableOpacity>
        </Animatable.View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default Welcome

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  bodyOfButton: {
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20
  },
  textOfButton: {
    fontSize: 12,
    fontWeight: 'bold'
  }
})
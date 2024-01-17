import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { storage } from '../../Pay/Auth';


const Main = () => {

  return (
    <SafeAreaView>
      <Text>Привет, {storage.getString('name')}. Скоро здесь будет основная страница с информацией</Text>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({})
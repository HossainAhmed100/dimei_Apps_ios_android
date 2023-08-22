import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ViewOwnerDetails =  ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  console.log(deviceId)
  return (
    <View>
      <Text>ViewOwnerDetails</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
export default ViewOwnerDetails

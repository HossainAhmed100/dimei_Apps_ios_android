import { StyleSheet, Text, View } from 'react-native'
import React,{ useState } from 'react';

const Chat = () => {
  const [image, setImage] = useState(null)
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})
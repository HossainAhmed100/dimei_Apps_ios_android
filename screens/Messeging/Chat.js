import React from 'react';
import { Text, View, Image } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme';
import { images } from '../../constants';

const Chat = () => {
  return (
    <View style={{flex: 1, alignItems: "center", paddingHorizontal: SIZES.medium, backgroundColor: COLORS.white500}}>
      <View style={{paddingVertical: 100, alignItems: "center", gap: 20}}>
        <Text style={{fontWeight: 600, color: COLORS.slate500, fontSize: 18}}>You have no message</Text>
        <Image source={images.conversation} style={{width: 200, height: 200, resizeMode: "cover"}}/>
      </View>
    </View>
  )
}

export default Chat;
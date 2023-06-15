import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const DeviceLoadingCrad = () => {
  return (
    <View style={style.cardContainer}>
      <View style={{width: "100%", height: 160, backgroundColor: COLORS.slate200, borderRadius: 10}}></View>
        <View style={{ marginTop: 4}}>
        <View style={{width: "100%", height: 10, backgroundColor: COLORS.slate200, borderRadius: 10}}></View>
        <View style={{width: "100%", height: 10, backgroundColor: COLORS.slate200, borderRadius: 10, marginVertical: 10}}></View>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4, justifyContent: "space-between"}}>
            <View style={{width: "49%", height: 10, backgroundColor: COLORS.slate200, borderRadius: 10}}></View>
            <View style={{width: "49%", height: 10, backgroundColor: COLORS.slate200, borderRadius: 10}}></View>
            </View>
            <View style={{width: "50%", height: 10, backgroundColor: COLORS.slate200, borderRadius: 10}}></View>
        </View>
    </View>
  )
}

export default DeviceLoadingCrad
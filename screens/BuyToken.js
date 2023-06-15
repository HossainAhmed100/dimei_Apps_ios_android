import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
const BuyToken = () => {
  const tokenPriceList = [
    {
      "tokenQuntaty": 1,
      "price": 100
    },
    {
      "tokenQuntaty": 3,
      "price": 270
    },
    {
      "tokenQuntaty": 5,
      "price": 450
    },
    {
      "tokenQuntaty": 10,
      "price": 800
    },
    {
      "tokenQuntaty": 30,
      "price": '2,650'
    },
    {
      "tokenQuntaty": 50,
      "price": '4,500'
    }
  ]
  return (
    <ScrollView style={{backgroundColor: COLORS.white500}}>
      <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center"}}>
        {
        tokenPriceList.map((token, i) => (
          <View style={{padding: 10, borderWidth: 1, borderColor: COLORS.blue100, gap: 3, borderRadius: 6, width: "31%",}}>
            <View style={{width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.blue100, alignItems: "center", justifyContent: "center"}}>
              <Image source={icons.diamond} style={{width: 18, height: 18, resizeMode: "contain", tintColor: COLORS.blue500}}/>
            </View>
            <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 700}}>{token.price} Taka</Text>
            <Text style={{fontSize: SIZES.small, color: COLORS.slate300}}>{token.tokenQuntaty} Token</Text>
          </View>
        ))
        }
      </View>
    </ScrollView>
  )
}

export default BuyToken
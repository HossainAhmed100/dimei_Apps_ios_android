import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants';

const DeviceCard = ({item}) => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const min = 10000;
    const max = 99999;
    const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(newRandomNumber);
  }, []);
  const formattedRandomNumber = randomNumber.toLocaleString();
  return (
    <View style={style.cardContainer}>
      <Image source={{uri: item?.image}} style={{width: "100%", height: 160, resizeMode: "contain"}}/>
        <View style={{ marginTop: 4}}>
            <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{item?.phone_name}</Text>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4}}>
               <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.blue200, borderRadius: 4}}>
                <Text style={{color: COLORS.blue500, fontSize: SIZES.xSmall}}>VERIFIED SELLER</Text>
                </View> 
            </View>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4, justifyContent: "space-between"}}>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>10:23 PM</Text>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}> 4 GB / 64 GB</Text>
            </View>
            <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>৳{formattedRandomNumber}</Text>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    cardContainer:{
        borderWidth: 1, 
        borderColor: COLORS.slate100, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "column", 
        alignItems: "center", 
        overflow: "hidden",
        width: "48%",
        margin: "1%",
        paddingVertical: 10
    },
})

export default DeviceCard

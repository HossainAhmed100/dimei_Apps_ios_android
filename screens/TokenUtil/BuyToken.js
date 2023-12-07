import { View, Text, ScrollView, Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SimpleLineIcons  } from '@expo/vector-icons';
import { COLORS, SIZES, icons, images } from '../../constants';
import { Divider } from '@rneui/themed';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';

const BuyToken = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const tokenPriceList = [
    {"tokenQuntaty": 1,"price": 1},
    {"tokenQuntaty": 3,"price": 2},
    {"tokenQuntaty": 5,"price": 3},
    {"tokenQuntaty": 10,"price": 4},
    {"tokenQuntaty": 30,"price": 5},
    {"tokenQuntaty": 50,"price": 6}
  ];

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [tokenQuantity, setTokenQuantity] = useState(''); // Set default token quantity to empty
  const [totalPrice, setTotalPrice] = useState('');
  const [selectedBox, setSelectedBox] = useState(0); // Track the selected box index
  const todyDate = new Date().toISOString();

  useEffect(() => {
    // Set the default selection and values when the component mounts
    const defaultPrice = tokenPriceList[0];
    setSelectedPrice(defaultPrice);
    setTokenQuantity(defaultPrice.tokenQuntaty.toString());
    calculateTotalPrice(defaultPrice.price.toString());
    setSelectedBox(0);
  }, []);

  const handleTokenQuantityChange = (value) => {
    setTokenQuantity(value);
    calculateTotalPrice(value);
  };

  const calculateTotalPrice = (quantity) => {
    setTotalPrice(quantity)
  };

  const handlePriceSelect = (price, index) => {
    setSelectedPrice(price);
    setTokenQuantity(price.tokenQuntaty.toString());
    calculateTotalPrice(price.price.toString());
    setSelectedBox(index);
  };

  const buyTokenAction = async () =>{
    const infoData = {
      userEmail: user?.userEmail,
      userId: user?._id,
      buyingTokenQuantity: tokenQuantity,
      transactionList: [
        {
          userId: user?._id,
          date: todyDate,
          titleName: "Token Purchase",
          status: "BUY",
          userProfilePic: "https://i.ibb.co/qdHZgxr/polygon-matic-card-image.jpg",
          transtionQuantity: tokenQuantity
        }
      ]
    }
    try{
      await axios.put("http://192.168.0.154:5000/byToken/", {infoData})
      .then((res) => {
        if (res.data.modifiedCount === 1){
          alert('Token Added Successfully!');
          navigation.goBack();
        }else if(res.data.insertedId){
          alert('Token Added Successfully!');
          navigation.goBack();
        }else{
          alert('Somthing is wrong!');
        }
      })
    }catch{

    }
  }


  return (
      <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <ScrollView style={{backgroundColor: COLORS.white500, marginBottom: 100}}>
      <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", justifyContent: "center"}}>
        {
        tokenPriceList.map((token, i) => (
          <Pressable onPress={() => handlePriceSelect(token, i)} key={i} style={{padding: 10, borderWidth: 1, borderColor: selectedBox === i ? COLORS.blue500 : COLORS.blue100, gap: 3, borderRadius: 6, width: "31%", backgroundColor: selectedBox === i ? COLORS.blue500 : COLORS.white500 }}>
            <View style={{width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.blue100, alignItems: "center", justifyContent: "center"}}>
              <Image source={icons.diamond} style={{width: 18, height: 18, resizeMode: "contain", tintColor: COLORS.blue500}}/>
            </View>
            <Text style={{fontSize: 15, color: selectedBox === i ? COLORS.white500 : COLORS.slate500, fontWeight: 700}}>৳{token.price} Taka</Text>
            <Text style={{fontSize: SIZES.small, color: selectedBox === i ? COLORS.white500 : COLORS.slate300}}>{token.tokenQuntaty} Token</Text>
          </Pressable>
        ))
        }
      </View>
      <View style={{paddingHorizontal: SIZES.small}}>
        <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Enter Token You want to buy</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.slate100, borderRadius: SIZES.xSmall, justifyContent: "center"}}>
        <SimpleLineIcons style={{paddingVertical: SIZES.small, paddingHorizontal: SIZES.small}} name="diamond" size={24} color={COLORS.slate500} />
        <Divider orientation="vertical" color={COLORS.white500} width={2}/>
        <TextInput
          style={{ marginLeft: SIZES.small, flex: 1, height: "100%", fontSize: SIZES.medium, color: COLORS.slate500 }}
          placeholder="Enter token quantity"
          keyboardType="numeric"
          value={tokenQuantity}
          onChangeText={handleTokenQuantityChange}
        />
        <Divider orientation="vertical" color={COLORS.white500} width={2}/>
        <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, paddingHorizontal: SIZES.small, height: "100%", fontWeight: 600, paddingVertical: SIZES.small}}>৳{totalPrice}</Text>
      </View>
      </View>
      <View style={{paddingHorizontal: SIZES.small, paddingVertical: SIZES.small}}>
        <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Select Payment Method</Text>
        <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
        <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
          <Text style={{color: COLORS.slate500}}>Token Price</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>৳{totalPrice} Taka</Text>
        </View>
        <Divider />
        <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
          <Text style={{color: COLORS.slate500}}>Vat</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>৳{0} Taka</Text>
        </View>
        <Divider />
        <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
          <Text style={{color: COLORS.slate500}}>Total Pay Price</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>৳{totalPrice} Taka</Text>
        </View>
        </View>
      </View>
      <View style={{width: "100%", alignItems: 'center', justifyContent: "center"}}>
      <Image source={images.weaccept} style={{width:250,height: 50, resizeMode: 'contain'}}/>
      </View>
    </ScrollView>
    
      <View style={{position: "absolute", bottom: 0, width: "100%"}}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
        <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}>
        <Text style={{color: COLORS.blue200, fontSize: SIZES.xSmall}}>Total Pay</Text>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium, fontWeight: 700}}>৳{totalPrice} Taka</Text>
        </View>
        <TouchableOpacity onPress={() => buyTokenAction()} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.small, paddingVertical: SIZES.medium}}>
          <Text style={{color: COLORS.blue500, fontSize: SIZES.medium, backgroundColor: COLORS.white500, padding: SIZES.small, borderRadius: SIZES.small}}>Pay now ৳{totalPrice} Taka</Text>
        </TouchableOpacity>
      </View>
      </View>
      </View>
  )
};

export default BuyToken
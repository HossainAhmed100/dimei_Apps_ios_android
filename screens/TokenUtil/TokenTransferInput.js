import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { COLORS, SIZES, images } from '../../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from '@react-navigation/native';

const TokenTransferInput = ({navigation}) => {
    const {user} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const firstTimeRef = useRef(true);
    const [loading, setLoading] = useState(false);
    const [zeroTokenAlert, setZeroTokenAlert] = useState(false);

    const {isLoading, data: itemQuantity = [], refetch: fetchToken } = useQuery({ 
        queryKey: ['itemQuantity', user?.userEmail], 
        queryFn: async () => {
          const res = await axios.get(`http://192.168.0.181:5000/useritemQuantity/${user?.userEmail}`);
          return res.data;
        } 
    })

    useFocusEffect(
    useCallback(() => {
        if (firstTimeRef.current) {
            firstTimeRef.current = false;
            return;
        }
        fetchToken()
    }, [fetchToken])
    )
    
   const showAlert = () => {
    setZeroTokenAlert(true)
    };
  
   const hideAlert = () => {
    setZeroTokenAlert(false)
    };

    const onSubmit = async (data) => {console.log(data)};

  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
    <ImageBackground source={images.patterns} style={{resizeMode: 'contain', justifyContent: "center", padding: SIZES.medium, borderBottomRightRadius: 15,borderBottomLeftRadius: 15, overflow: "hidden"}}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.blue100}}>Total Token</Text>
      <Text style={{fontSize: 25, color: COLORS.white500, fontWeight: 700}}>
        {itemQuantity ? itemQuantity?.tokenQuantity : <ActivityIndicator />}
      </Text>
      </View>
      </ImageBackground>
    <View style={{padding: SIZES.small}}>
    <View>
    <Text style={{color: COLORS.slate500}}>Receiver Email *</Text>
    <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
            <TextInput style={styles.searchInput} placeholder="Write Receiver Account Email"/>
            <TouchableOpacity><MaterialCommunityIcons name="line-scan" size={24} color={COLORS.slate600} /></TouchableOpacity>
        </View>
    </View>
    </View>
    <View>
    <Text style={{color: COLORS.slate500}}>Token Quantity *</Text>
    <TextInput
        style={styles.inputBox}
        placeholder="Enter Token quantity"
        autoCapitalize='none' 
        onChangeText={(text) => setEmail(text)}
        value={email}
    />
    </View>
    </View>
    <View style={{paddingHorizontal: SIZES.small, paddingVertical: SIZES.medium}}>
    <View style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: SIZES.xSmall, overflow: "hidden", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>1</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>2</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>3</Text>
    </Pressable>
    </View>
    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>4</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>5</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>6</Text>
    </Pressable>
    </View>
    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>7</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>8</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>9</Text>
    </Pressable>
    </View>
    <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>00</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
        <Text style={{color: COLORS.slate500}}>0</Text>
    </Pressable>
    <Pressable style={({pressed}) => [{backgroundColor: pressed ? COLORS.blue100 : 'transparent',}, styles.keypadClickAction,]}>
    <Ionicons name="backspace" size={24} color={COLORS.slate300} />
    </Pressable>
    </View>
    </View>
    </View>

    <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 10, paddingHorizontal: SIZES.small }}>
        {
        isLoading ? <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        itemQuantity?.tokenQuantity === 0 ? 
        <TouchableOpacity onPress={() => showAlert()} style={[styles.loginBtn, {opacity: 0.5}]} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Send</Text>
        </TouchableOpacity> : loading ?
        <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        <TouchableOpacity onPress={() => onSubmit("OnSubmit")} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Send</Text>
        </TouchableOpacity> 
        }
        <AwesomeAlert
          show={zeroTokenAlert}
          showProgress={false}
          title="Token Alert"
          message="You don't have any Token. Please Buy some Token to continue."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Close"
          confirmText="Buy now"
          confirmButtonColor={COLORS.blue500}
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            navigation.navigate('BuyToken');
            hideAlert();
          }}
        />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    keypadClickAction:{
        flex: 1, 
        height: 80, 
        alignItems: 'center', 
        justifyContent: "center",
        
    },
    inputBox: {
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        borderWidth: 1,
        borderColor: COLORS.slate200,
        width: "100%"
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: COLORS.white500,
        justifyContent: "space-between",
        marginVertical: SIZES.small
    },
    searchWrapper: {
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginRight: 10,
        borderColor: COLORS.slate200,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
    },
    searchInput: {},
    loginBtn: {
        backgroundColor: COLORS.blue500,
        width: "100%",
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.blue500,
        borderWidth: 1,
    },
})
export default TokenTransferInput

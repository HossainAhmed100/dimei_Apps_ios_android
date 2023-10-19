import { ActivityIndicator, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, images } from '../../constants';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
const TokenTransferInput = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const signIn = async () => {
        setLoading(true) 
    };
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
    <ImageBackground source={images.patterns} style={{resizeMode: 'contain', justifyContent: "center", padding: SIZES.medium, borderBottomRightRadius: 15,borderBottomLeftRadius: 15, overflow: "hidden"}}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.blue100}}>Total Token</Text>
      <Text style={{fontSize: 25, color: COLORS.white500, fontWeight: 700}}>29</Text>
      </View>
      </ImageBackground>
    <View style={{padding: SIZES.small}}>
    <View>
    <Text style={{color: COLORS.slate500}}>Account ID</Text>
    <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
            <TextInput style={styles.searchInput} placeholder="Write Tooken receiver Account ID"/>
            <TouchableOpacity><MaterialCommunityIcons name="line-scan" size={24} color={COLORS.slate600} /></TouchableOpacity>
        </View>
    </View>
    </View>
    <View>
    <Text style={{color: COLORS.slate500}}>Token Quantity</Text>
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
        loading ? <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator size="small" color={COLORS.white500}/> 
        </TouchableOpacity> : <TouchableOpacity onPress={() => signIn()} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm </Text>
        </TouchableOpacity>
        }
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

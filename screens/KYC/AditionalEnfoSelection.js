import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CheckBox, Divider } from '@rneui/themed';
import { COLORS, SIZES } from '../../constants';

const AditionalEnfoSelection = ({navigation, route}) => {
    const userDetails = route.params.userDetails;
    const [gender, setGender] = useState("Male");
    const [accountType, setAccountType] = useState("Personal");
    const nextStep = () => {
        const accountInfo = {gender, accountType, ...userDetails};
        navigation.navigate('ProfilePhotoSelection', {accountInfo})
    }

  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
    <View style={{paddingHorizontal: 10, paddingVertical: 10, gap: 10}}>
    <View style={styles.checkBoxCard}>
    <Text style={styles.inputTextLabel}>Gender</Text>
    <Divider color={COLORS.slate100} width={1}/>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    <CheckBox
    onPress={() => setGender("Male")}
    title='Male'
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
    checked={gender === "Male"}
    checkedColor={COLORS.blue500}
    textStyle={styles.checkboxTitle}
    containerStyle={{paddingHorizontal: 0}}
    />
    <CheckBox
    onPress={() => setGender("Female")}
    title='Female'
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
    checked={gender === "Female"}
    textStyle={styles.checkboxTitle}
    containerStyle={{paddingHorizontal: 0}}
    />
    <CheckBox
    onPress={() => setGender("Others")}
    title='Others'
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
    checked={gender === "Others"}
    textStyle={styles.checkboxTitle}
    containerStyle={{paddingHorizontal: 0}}
    />
    </View>
    </View>
    <View style={styles.checkBoxCard}>
    <Text style={styles.inputTextLabel}>Account Type</Text>
    <Divider color={COLORS.slate100} width={1}/>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
    <CheckBox
    onPress={() => setAccountType("Personal")}
    title='Personal'
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
    checked={accountType === "Personal"}
    checkedColor={COLORS.blue500}
    textStyle={styles.checkboxTitle}
    containerStyle={{paddingHorizontal: 0}}
    />
    <CheckBox
    onPress={() => setAccountType("Shop")}
    title='Shop'
    checkedIcon='dot-circle-o'
    uncheckedIcon='circle-o'
    checked={accountType === "Shop"}
    textStyle={styles.checkboxTitle}
    containerStyle={{paddingHorizontal: 0}}
    />
    </View>
    </View>
    </View>

    <View style={{position: "absolute", bottom: 0, width: "100%"}}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.medium}}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>BACK</Text>
    </TouchableOpacity>
    <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}> 
    <Text style={{color: COLORS.blue200, fontSize: SIZES.medium}}>3/3</Text>
    </View>
    <TouchableOpacity activeOpacity={.7} onPress={() => nextStep()} style={styles.nextBtnContainer}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>NEXT</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    nextBtnContainer: {
        alignItems: "center", 
        justifyContent: "center", 
        paddingHorizontal: SIZES.large, 
        paddingVertical: SIZES.medium
    },
    checkBoxCard: {borderWidth: 1, borderRadius: 6, borderColor: COLORS.slate100, overflow: "hidden"},
    checkboxTitle: {color: COLORS.slate500, fontSize: 14, fontWeight: 400},
    inputTextLabel: {
    padding: 10,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.slate500,
    backgroundColor: COLORS.slate100
    }
})

export default AditionalEnfoSelection
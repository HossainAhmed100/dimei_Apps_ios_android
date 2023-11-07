import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, icons, images } from '../../constants'

const NewDevcieAddTermsandCondition = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: COLORS.white500}}>
        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <Image style={{ resizeMode: "cover", height: 200, width: 300, }} source={images.policyOnBoard} />
        </View>
        <View style={{paddingVertical: 10,paddingHorizontal: SIZES.large, backgroundColor: COLORS.slate100, borderRadius: 6, marginBottom: 10}}>
        <Text style={{fontSize: 14, color: COLORS.slate500, fontWeight: 400}}>
            Before you add new Device, please red and accept Terms & Conditions.
        </Text>
        </View>
        <View style={{paddingHorizontal: SIZES.large}}>
        <View style={{marginBottom: 25}}>
            <View style={{gap: 5}}>
            <Text style={{fontSize: 25, color: COLORS.slate600, fontWeight: 500}}>Terms & Conditions</Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', gap: 10}}>
            <Image style={{ resizeMode: "cover", height: 20, width: 20, tintColor: COLORS.slate500 }} source={icons.clock} />
            <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>Last updated: 10/28/2023</Text>
            </View>
            </View>
        </View>
        <View style={{gap: 15, paddingBottom: 25}}>
        <View>
        <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>1.Terms & Conditions</Text>
        <Text style={{fontSize: 13, color: COLORS.slate300, fontWeight: 400}}>
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sequi est, magni adipisci voluptatum obcaecati placeat officiis doloremque! Consectetur blanditiis harum odio illo, assumenda magnam molestias labore omnis provident ea dignissimos! Sint quae quibusdam voluptatum libero aperiam consequuntur dolorum itaque fugit esse quasi officia eos earum hic natus, deleniti nulla!
        </Text>
        </View>
        <View>
        <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>2.Terms & Conditions</Text>
        <Text style={{fontSize: 13, color: COLORS.slate300, fontWeight: 400}}>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem animi totam autem rem, sit sequi facere quasi laborum suscipit illum debitis numquam? Sunt autem voluptate, tempora eius nobis praesentium quos.
        </Text>
        </View>
        <View>
        <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>3.Terms & Conditions</Text>
        <Text style={{fontSize: 13, color: COLORS.slate300, fontWeight: 400}}>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis sint, esse, nostrum fuga, sapiente quod ipsam culpa quisquam laboriosam vel tenetur impedit repudiandae facere aliquid laudantium minus cumque. In officiis illo, tenetur dolorem laboriosam eius reprehenderit expedita repellendus et.
        </Text>
        </View>
        <View>
        <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>4.Terms & Conditions</Text>
        <Text style={{fontSize: 13, color: COLORS.slate300, fontWeight: 400}}>
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sequi est, magni adipisci voluptatum obcaecati placeat officiis doloremque! Consectetur blanditiis harum odio illo, assumenda magnam molestias labore omnis provident ea dignissimos! Sint quae quibusdam voluptatum libero aperiam consequuntur dolorum itaque fugit esse quasi officia eos earum hic natus, deleniti nulla!
        </Text>
        </View>
        <View>
        <Text style={{fontSize: 15, color: COLORS.slate500, fontWeight: 500}}>5.Terms & Conditions</Text>
        <Text style={{fontSize: 13, color: COLORS.slate300, fontWeight: 400}}>
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur repudiandae beatae deleniti obcaecati unde aspernatur qui deserunt earum facilis nam, ipsam quisquam sapiente explicabo illo illum alias assumenda voluptate id nesciunt ut et? Minima molestias ea qui velit voluptates corporis excepturi eaque exercitationem quas libero vitae quo beatae, quam alias eos a nam, eius doloremque aliquam eum fuga! Quas, alias?
        </Text>
        </View>
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewDevice')} style={{backgroundColor: COLORS.blue500, padding: 10, alignItems: "center", justifyContent: "center", borderRadius: 5}}>
                <Text style={{color: COLORS.white500, fontWeight: 400, fontSize: 15}}>i agree</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
export default NewDevcieAddTermsandCondition

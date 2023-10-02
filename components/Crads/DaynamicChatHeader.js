import { TouchableOpacity, Image, StyleSheet, View,Text } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const DaynamicChatHeader = ({iconUrl, dimension, route}) => {
    const deviceInfo = route.params;
    const navigation = useNavigation();
  return (
   <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("SupportChat")} >
    <Image source={{uri: deviceInfo?.deviceImg}} resizeMode='contain' style={styles.btnImg}/>
    <View>
        <Text style={{fontSize: 20, fontWeight: 500, color: COLORS.slate500}}>{deviceInfo?.sellingTitle}</Text>
        <Text style={{color: COLORS.slate300}}>৳{deviceInfo?.devciePrice}</Text>
    </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer: {
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
      gap: 6,
      flexDirection: "row"
    },
    btnImg: {
      width: 40,
      height: "100%",
      borderRadius: 6
    }
});

export default DaynamicChatHeader
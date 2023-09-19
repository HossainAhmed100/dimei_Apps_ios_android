import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const ScreenHeaderRightBtn = ({iconUrl, dimension}) => {
    const navigation = useNavigation();
  return (
   <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate("SupportChat")} >
    <Image source={iconUrl} resizeMode='cover' style={styles.btnImg(dimension)}/>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnContainer: {
      width: 40,
      height: 40,
      backgroundColor: COLORS.slate100,
      borderRadius: SIZES.small / 1.25,
      justifyContent: "center",
      alignItems: "center",
    },
    btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
      borderRadius: SIZES.small / 1.25
    })
});

export default ScreenHeaderRightBtn
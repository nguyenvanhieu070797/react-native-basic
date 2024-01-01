import {View, StyleSheet, Dimensions} from 'react-native';
import Colors from "../../constants/colors";


function Card ({children}) {
    return  <View style={styles.card}>
        {children}
    </View>
}

const deviceWidths = Dimensions.get('window').width;

export default Card;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidths < 300 ? 18: 38,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width: 0, hieght: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
})

import {Pressable, Text, View, StyleSheet} from 'react-native'
import {GlobalStyles} from "../../constants/style";

function Button({ children, onPress, mode, style }) {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({pressed}) => pressed && styles.pressed}
            >
                <View style={[
                    styles.button,
                    mode === 'flat' && styles.flat
                ]}>
                   <Text style={[
                       styles.buttonText,
                       mode === 'flat' && styles.flatText
                   ]}>
                       {children}
                   </Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.color.primary600,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
    flat: {
        backgroundColor: 'transparent',
    },
    flatText: {
        color: 'white',
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.color.primary100,
        borderRadius: 4,
    }
});

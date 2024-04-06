import {Text, TextInput, View, StyleSheet} from 'react-native'
import {GlobalStyles} from '../../constants/style'

function Input({label, style, invalid, textInputConfig}) {
    let inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}


export default Input;


const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.color.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.color.primary400,
        color: GlobalStyles.color.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },

    invalidLabel: {
        color: GlobalStyles.color.error500,
    },

    invalidInput: {
        color: GlobalStyles.color.error50,
    }
})

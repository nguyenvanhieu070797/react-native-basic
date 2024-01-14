import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import {useState} from 'react';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Colors from '../constants/colors';

function StartGameScreen({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const {height} = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // Show alert
            Alert.alert(
                "Invalid number!",
                "Number has to be a number between 0 and 99",
                [{text: 'Okey', style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 500 ? 30 : 100;

    return (
        <ScrollView  style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>

                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

export default StartGameScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1
    },

    rootContainer: {
        flex: 1,
        // marginTop: deviceWidth < 300 ? 30: 100,
        alignItems: 'center',
    },

    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonsContainer: {
        flexDirection: 'row',
    },

    buttonContainer: {
        flex: 1,
    }
});

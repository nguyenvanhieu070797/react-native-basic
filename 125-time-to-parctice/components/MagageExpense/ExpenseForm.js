import {Text, View, StyleSheet, Alert} from 'react-native'
import Input from './Input'
import {useState} from 'react'
import Button from "../UI/Button";
import {GlobalStyles} from '../../constants/style'

import {getFormattedDate} from "../../util/date"

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : "",
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description.toString() : "",
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {
                    value: enteredValue,
                    isValid: true,
                }
            }
        })
    }

    function submitHandler() {
        const expenseDate = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseDate.amount) && expenseDate.amount > 0;
        const dateIsValid = expenseDate.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseDate.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
               return {
                   amount: {
                       value: curInputs.amount.value,
                       isValid: amountIsValid
                   },
                   date: {
                       value: curInputs.date.value,
                       isValid: dateIsValid
                   },
                   description: {
                       value: curInputs.description.value,
                       isValid: descriptionIsValid
                   },
               };
            });

            return;
        }

        onSubmit(expenseDate);
    }

    const formIsInvalid =
        !inputs.amount.isValid ||
        !inputs.date.isValid ||
        !inputs.description.isValid;

    console.log({
        inputs,
        formIsInvalid
    })

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input
                style={styles.rowInput}
                label="Amount"
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }}
            />
            <Input
                style={styles.rowInput}
                label="Date"
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value
                }}
            />
        </View>
        <View style={styles.inputRow}>
            <Input
                label="Description"
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCapitalize: 'none',
                    // autoCorrect: false,

                    onChangeText: inputChangeHandler.bind(this, 'description'),
                    value: inputs.description.value
                }}
            />
        </View>

        {
            formIsInvalid && (
                <View>
                    <Text style={styles.errorText}>
                        Invalid input values - please check your entered data!
                    </Text>
                </View>
            )
        }

        <View style={styles.buttons}>
            <Button
                mode="flat"
                onPress={onCancel}
                style={styles.button}
            >
                Cancel
            </Button>
            <Button
                onPress={submitHandler}
                style={styles.button}
            >
                {submitButtonLabel}
            </Button>
        </View>
    </View>
}

export default ExpenseForm;

const  styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },

    errorText: {
        textAlign: 'center',
        color: GlobalStyles.color.error500,
        margin: 8
    },

});

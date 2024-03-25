import {View, StyleSheet} from 'react-native'
import {useLayoutEffect, useContext} from 'react'
import IconButton from '../components/UI/IconButton'
import Button from '../components/UI/Button'
import {GlobalStyles} from '../constants/style'
import {ExpensesContext} from '../store/expenses-context'

function ManageExpenses({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expensesCtx = useContext(ExpensesContext);

    useLayoutEffect(() => {
       navigation.setOptions({
           title: isEditing ? 'Edit-Expense' : 'Add Expense',
       })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        console.log("deleteExpenseHandler");
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        console.log("cancelHandler");
        navigation.goBack();
    }

    function confirmHandler() {
        console.log("confirmHandler", {editedExpenseId, isEditing});

        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, {
                description: 'Giay loai update',
                amount: 59.99,
                date: new Date('2024-04-23')
            });
        } else {
            expensesCtx.addExpense({
                description: 'Giay loai add',
                amount: 59.99,
                date: new Date('2024-04-23')
            });
        }

        navigation.goBack();
    }

    return <View style={styles.container}>
        <View style={styles.buttons}>
            <Button
                mode="flat"
                onPress={cancelHandler}
                style={styles.button}
            >
                Cancel
            </Button>
            <Button
                onPress={confirmHandler}
                style={styles.button}
            >
                {isEditing ? "Update" : "Add"}
            </Button>
        </View>
        {
            isEditing && <View style={styles.deleteContainer}>
                <IconButton
                    icon="trash"
                    color={GlobalStyles.color.error500}
                    size={36}
                    onPress={deleteExpenseHandler}
                />
            </View>
        }
    </View>
}

export default ManageExpenses;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.color.primary200,
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor:  GlobalStyles.color.primary200,
        alignItems: 'center'
    }
})

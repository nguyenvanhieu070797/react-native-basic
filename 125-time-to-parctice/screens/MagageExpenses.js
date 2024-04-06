import {View, StyleSheet} from 'react-native'
import {useState, useLayoutEffect, useContext} from 'react'
import IconButton from '../components/UI/IconButton'
import {GlobalStyles} from '../constants/style'
import {ExpensesContext} from '../store/expenses-context'
import ExpenseForm from '../components/MagageExpense/ExpenseForm'

import { storeExpense, updateExpense, deleteExpense } from '../util/http'
import LoadingOverlay from "../components/UI/LoadingOverlay";


function ManageExpenses({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expensesCtx = useContext(ExpensesContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
       navigation.setOptions({
           title: isEditing ? 'Edit-Expense' : 'Add Expense',
       })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        console.log("deleteExpenseHandler");
        await deleteExpense(editedExpenseId);
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        console.log("cancelHandler");
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        console.log("confirmHandler", {editedExpenseId, isEditing});
        setIsSubmitting(true);
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData);
        } else {
            const id = await storeExpense(expenseData);
            // storeExpense(expenseData);
            expensesCtx.addExpense({...expenseData, id: id});
        }

        navigation.goBack();
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return <View style={styles.container}>
        <ExpenseForm submitButtonLabel={isEditing? "Update" : "Add"}
                     onCancel={cancelHandler}
                     onSubmit={confirmHandler}
                     defaultValues={selectedExpense}
        />

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

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor:  GlobalStyles.color.primary200,
        alignItems: 'center'
    }
})

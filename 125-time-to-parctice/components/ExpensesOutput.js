import { View, StyleSheet } from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../constants/style'

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Giay loai 1',
        amount: 59.99,
        date: new Date('2024-04-23')
    },
    {
        id: 'e2',
        description: 'Giay loai 2',
        amount: 59.99,
        date: new Date('2024-04-23')
    }
]

function ExpensesOutput({expenses, expensesPeriod}) {
    return <View style={styles.container}>
        <ExpensesSummary
            expenses={DUMMY_EXPENSES}
            periodName={expensesPeriod}
        />
        <ExpensesList
            expenses={DUMMY_EXPENSES}
        />
    </View>
}

export default ExpensesOutput;

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: GlobalStyles.color.primary700,
       paddingTop: 24,
       paddingBottom: 0,
       paddingHorizontal: 24,
   }
});

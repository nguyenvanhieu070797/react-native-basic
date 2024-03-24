import {View, Text, FlatList} from 'react-native'
import ExpensesItem from './ExpensesItem'

function renderExpensesItem(itemData) {
    return <ExpensesItem {...itemData.item} />
}

function ExpensesList({expenses}) {
    return <View>
        <FlatList
            data={expenses}
            renderItem={renderExpensesItem}
            keyExtractor={(item) => item.id}
        />
    </View>
}

export default ExpensesList;

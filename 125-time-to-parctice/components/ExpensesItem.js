import { Pressable, View, Text, StyleSheet } from 'react-native'
import {GlobalStyles} from "../constants/style";
import {getFormattedDate} from "../util/date"
import {useNavigation} from "@react-navigation/native"

function ExpensesItem({id, description, amount, date}) {

    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate("ManageExpense", {
            expenseId: id,
        });
    }

    return <Pressable
        onPress={expensePressHandler}
        style={({pressed}) => pressed && styles.pressed}
    >
        <View style={styles.expensesItem}>
            <View>
                <Text style={[styles.textBase, styles.description]}>
                    {description}
                </Text>
                <Text style={styles.textBase}>
                    {getFormattedDate(date)}
                </Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
}

export default ExpensesItem;

const styles = StyleSheet.create({
    expensesItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.color.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.color.gray500,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.color.white,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItem: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.color.primary500,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    pressed: {

    }
});

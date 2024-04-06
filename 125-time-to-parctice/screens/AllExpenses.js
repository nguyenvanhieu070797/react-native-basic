import {useContext, useEffect, useState} from 'react';
import ExpensesOutput from "../components/ExpensesOutput";
// import { ExpensesContext } from '../store/expenses-context';
import {fetchExpenses} from "../util/http";


function AllExpenses() {
    // const expensesCtx = useContext(ExpensesContext);
    const [fetchedExpenses, setFetchedExpenses] = useState([])

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            setFetchedExpenses(expenses)
        }

        getExpenses();

    }, []);

    return <ExpensesOutput
        expenses={fetchedExpenses}
        expensesPeriod="Total"
        fallbackText="No expenses registered."
    />
}

export default AllExpenses;

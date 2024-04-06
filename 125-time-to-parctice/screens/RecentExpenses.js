import ExpensesOutput from "../components/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {useState, useContext, useEffect} from "react";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay"

function RecentExpenses(){
    const expensesCtx = useContext(ExpensesContext);

    const [fetchedExpenses, setFetchedExpenses] = useState([])

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            setIsFetching(true);
            setFetchedExpenses(expenses);
            setIsFetching(false);
            expensesCtx.setExpense(expenses);
        }

        getExpenses();

    }, []);

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo && (expense.date <= today);
    })

    console.log({fetchedExpenses});

    return <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registered for the last 7 days."
    />
}

export default RecentExpenses;

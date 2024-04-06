import {useReducer, createContext} from 'react'

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'Giay loai 12',
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


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {
        console.log({description, amount, date});
    },
    deleteExpense: (id) => {
        console.log({id});

    },
    setExpense: (expenses) => {
      console.log({expenses})
    },
    updateExpense: (id, {description, amount, date}) => {
        console.log({id, description, amount, date});
    },
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id,
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {
                ...updatableExpense,
                ...action.payload.data
            };
            const updatedExpenses = [...state];

            updatedExpenses[updatableExpenseIndex] = updatedItem;
            console.log({updatedExpenses});
            return updatedExpenses;
        case 'DELETE':

            return state.filter((expenses) => expenses.id !== action.payload)
        default:
            return state;
    }
}


function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseDate) {
        dispatch({type: "ADD", payload: expenseDate});
    }

    function deleteExpense(id) {
        dispatch({type: "DELETE", payload: id});
    }

    function updateExpense(id, expenseDate) {
        dispatch({type: "UPDATE", payload: {id: id, date: expenseDate}});
    }

    function setExpense(expenses) {
        dispatch({type: "SET", payload: expenses});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpense: setExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }



    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}


export default ExpensesContextProvider

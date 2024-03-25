import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ManageExpense from './screens/MagageExpenses'
import AllExpenses from './screens/AllExpenses'
import RecentExpenses from './screens/RecentExpenses'

import { Ionicons } from '@expo/vector-icons'

import {GlobalStyles} from './constants/style'
import IconButton from './components/UI/IconButton'

import ExpensesContextProvider from './store/expenses-context'

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
    return (
        <BottomTabs.Navigator
            screenOptions={({navigation}) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.color.primary500
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: GlobalStyles.color.primary500
                },
                tabBarActiveTintColor: GlobalStyles.color.white,
                headerRight: ({tintColor}) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor}
                        onPress={() => navigation.navigate("ManageExpense")}
                    />
                )
            })}
        >
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "Recent Expenses",
                    tabBarLabel: "Recent",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="hourglass"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "All Expenses",
                    tabBarLabel: "All Expenses",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons
                            name="calendar"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </BottomTabs.Navigator>
    )
}

export default function App() {
  return (
    <>
        <StatusBar style="auto" />
        <ExpensesContextProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.color.primary500
                        },
                        headerTintColor: GlobalStyles.color.white
                    }}
                >
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverview}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        options={{
                            presentation: 'modal'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ExpensesContextProvider>
    </>
  );
}

import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <>
          <StatusBar style="dark"/>
          <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="MealsCategories">
                  <Stack.Screen
                      name="Categories"
                      component={CategoriesScreen}
                      options={{headerBackTitle: "Back"}}
                  />
                  <Stack.Screen
                      name="MealsOverview" component={MealsOverviewScreen} options={{headerBackTitle: "Back"}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});

import {View, Text, Image, StyleSheet} from 'react-native'
import {useLayoutEffect} from "react";

import {MEALS} from '../data/dummy-data'
import MealDetails from "../components/MealDetails";

function MealDetailScreen ({route, navigation}) {
    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Meal detail screen",
            headerBackTitle: "Back",
        })
    }, [navigation]);

    return <View>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
        <Text style={styles.title}>
            {selectedMeal.title}
        </Text>
        <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
        />

        <Text>Ingredients</Text>
        {
            selectedMeal.ingredients.map(ingredient => {
                return <Text key={ingredient}>{ingredient}</Text>
            })
        }

        <Text>Steps</Text>
        {
            selectedMeal.steps.map(step => {
                return <Text key={step}>{step}</Text>
            })
        }

    </View>;
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
    }
})

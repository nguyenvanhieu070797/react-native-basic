import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import {useLayoutEffect, useContext} from "react";

import {MEALS} from '../data/dummy-data'
import MealDetails from "../components/MealDetails"
import Subtitle from "../components/MealDetail/Subtitle"
import List from "../components/MealDetail/List"
import IconButton from "../components/IconButton";

import {FavoritesContext} from '../store/context/favorites-context'

function MealDetailScreen ({route, navigation}) {
    const favoriteMealsCtx = useContext(FavoritesContext);

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find(meal => meal.id === mealId);

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoriteStatusHandle() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    console.log({ids: favoriteMealsCtx.ids, mealId, mealIsFavorite});

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "About the Meal",
            headerBackTitle: "Back",
            headerRight: () => {
                return <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    color={'white'}
                    onPress={changeFavoriteStatusHandle}
                />
            }
        })
    }, [navigation, changeFavoriteStatusHandle]);

    return <ScrollView style={styles.rootContainer}>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
        <Text style={styles.title}>
            {selectedMeal.title}
        </Text>

        <MealDetails
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability={selectedMeal.affordability}
            textStyle={styles.detailText}
        />

        <View style={styles.listOuterContainer}>
            <View style={styles.listContainer}>
                <Subtitle>Ingredients</Subtitle>
                <List data={selectedMeal.ingredients}/>

                <Subtitle>Steps</Subtitle>
                <List data={selectedMeal.steps}/>
            </View>
        </View>
    </ScrollView>;
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: '#e2b497'
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    }
})

import { useLayoutEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import MealItem from '../components/MeaItem'

function MealsOverviewScreen ({route, navigation}) {
   const cateId = route.params?.categoryId || "";

   const displayedMeals = MEALS.filter((mealItem) => {
       return mealItem.categoryIds.indexOf(cateId) >= 0;
   });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === cateId).title;
        navigation.setOptions({
            title: categoryTitle,
            headerBackTitle: "Back",
        })
    }, [cateId, navigation]);



   function  renderMealItem(itemData) {
       const item = itemData.item;

       const mealItemProps = {
           id: item.id,
           title: item.title,
           imageUrl: item.imageUrl,
           affordability: item.affordability,
           duration: item.duration,
           complexity: item.complexity,
       }

       return <MealItem
           {...mealItemProps}
       />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
})

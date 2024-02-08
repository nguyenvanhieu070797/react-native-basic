import { View, Text, StyleSheet, FlatList } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealItem from '../components/MeaItem'

function MealsOverviewScreen ({route}) {
   const cateId = route.params?.categoryId || "";

   const displayedMeals = MEALS.filter((mealItem) => {
       return mealItem.categoryIds.indexOf(cateId) >= 0;
   });

   console.log({displayedMeals});

   function  renderMealItem(itemData) {
       return <MealItem title={itemData.item.title}/>
    }

    return (
        <View style={styles.container}>
            <Text>
                Meals Overview Screen - {cateId}
            </Text>
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

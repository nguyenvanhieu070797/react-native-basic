import { FlatList } from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTitle from '../components/CategoryGridTitle'

function CategoriesScreen ({navigation}) {
    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('MealsOverview');
        }

        return <CategoryGridTitle
            title={itemData.item.title}
            color={itemData.item.color}
            onPress={pressHandler}
        />;
    }

    return (
        <FlatList
            data={CATEGORIES}
            keyExtrator={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default CategoriesScreen;

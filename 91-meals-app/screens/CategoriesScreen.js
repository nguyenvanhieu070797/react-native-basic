import { FlatList } from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTitle from '../components/CategoryGridTitle'

function CategoriesScreen () {

    function renderCategoryItem(itemData) {
        return <CategoryGridTitle
            title={itemData.item.title}
            color={itemData.item.color}
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

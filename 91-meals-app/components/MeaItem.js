import {View, Text, Image, StyleSheet, Platform, Pressable} from 'react-native'

function MealItem({title, imageUrl, duration, complexity, affordability}) {
    return <View style={styles.mealItem}>
        <Pressable
            android_ripple={{ color: '#ccc'} }
            style={({pressed}) => (pressed ? styles.buttonPressed : null)}
        >
            <View style={styles.innerContainer}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.detailItem}>{duration}</Text>
                    <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
                    <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
                </View>
            </View>
        </Pressable>
    </View>
}

export default MealItem;


const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    buttonPressed: {
        opacity: 0.5
    },
});

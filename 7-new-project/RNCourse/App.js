import { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  Button
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);


  function addGoalHandle(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        text: enteredGoalText,
        id: Math.random().toString(),
      }
    ]);
    endAddGoalHandle();
  }

  function deleteGoalHandle(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandle() {
    setModalIsVisible(true);
  }

  function endAddGoalHandle() {
    setModalIsVisible(false);
  }


  return (
    <>
      <StatusBar style='auto'/>
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          onPress={startAddGoalHandle}
        />

        <GoalInput 
          onAddGoal={addGoalHandle}
          visible={modalIsVisible}
          onCancel={endAddGoalHandle}
        />

        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem 
                text={itemData.item.text}
                id={itemData.item.id}
                onDeleteItem={deleteGoalHandle}
              />
            }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}/>
        </View>
     
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
 
  goalsContainer: {
    flex: 5,
  },


});


const styleFooter = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'bottom',
    padding: 16,
  },
  textInfo: {
    color: 'blue',
  }
});
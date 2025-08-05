import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const AllergyList = () => {
  const [allergy, setAllergy] = useState('');
  const [allergies, setAllergies] = useState([]);

  const addAllergy = () => {
    if (allergy.trim()) {
      setAllergies([...allergies, allergy]);
      setAllergy(''); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Your Allergies</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an allergy"
        value={allergy}
        onChangeText={setAllergy}
      />
      <TouchableOpacity style={styles.button} onPress={addAllergy}>
        <Text style={styles.buttonText}>Add Allergy</Text>
      </TouchableOpacity>
      <FlatList
        data={allergies}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default AllergyList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0d9488',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
  },
});
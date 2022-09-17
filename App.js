import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Dimensions } from 'react-native';

export default function App() {

const [keyword, setKeyword] = useState('');
const [repositories, setRepositories] = useState([]);

const getRepositories = () => {  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
  .then(response => response.json())  
  .then(data => setRepositories(data.items))  
  .catch(error => {         
        Alert.alert('Error', error);   
  });
}

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item,index) => index.toString()}  
        renderItem={({item}) =>
        <View>
          <Text 
            style={{fontSize:18, fontWeight: "bold"}}>{item.full_name}
          </Text>
          <Text style={{fontSize:16 }}>{item.description}</Text>
        </View>} 
      data={repositories} />
      <TextInput 
        style={{fontSize:18, width:200}} 
        placeholder='keyword'onChangeText={text => setKeyword(text) } />
      
      <Button title="Find"onPress= {getRepositories} />
  
    <StatusBar style="auto" />
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

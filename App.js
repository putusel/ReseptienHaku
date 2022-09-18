import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, Image, Dimensions } from 'react-native';

export default function App() {

const [keyword, setKeyword] = useState('');
const [repositories, setRepositories] = useState([]);

const getRepositories = () => {  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
  .then(response => response.json())  
  .then(data => setRepositories(data.meals))  
  .catch(error => {         
        Alert.alert('Error', error);   
  });
}
const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item,index) => index.toString()}  
        renderItem={({item}) =>
        <View>
          <Text 
            style={{fontSize:16, fontWeight: "bold"}}>{item.strMeal}
          </Text>
          <Image 
          style={{width: 50,height: 50}}source={{uri: item.strMealThumb}}/>
        </View>} 
      data={repositories}
      ItemSeparatorComponent={listSeparator} />
      <TextInput 
        style={{fontSize:16, width:200, borderColor: 'gray', borderWidth: 1.0, justifyContent: 'center', marginLeft: 65}} 
        placeholder='keyword'onChangeText={text => setKeyword(text) } />
      <View style={{ width:Dimensions.get("window").width * 0.9, flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
      <Button title="Find"onPress= {getRepositories} />
      </View>
    <StatusBar style="auto" />
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    justifyContent: 'center',
    marginTop: 50,
  },
});

import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { getCharacters } from "../../http/Connect";

export default function Movie({ navigation, route }) {
  const [details, setDetails] = useState({});
 const [character, setCharacter]= useState({});
  let URL= `https://swapi.dev/api/films/${route.params.id}`
  const getDetails = async () => {
    try {
      const response = await axios.get(URL);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  const filter = (url) =>{
      const sort = result.filter((d)=>d.films === url);
      console
      return sort;
  }
  useEffect(() => {
    (async () => {
      const response = await getDetails();
      setDetails(response.data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
    let URL= `https://swapi.dev/api/films/${route.params.id}`
      const response = await getCharacters();
      
      if (response.status === 200){
          let result = response.data.results;
        
       }
    })();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.view}>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.design}>{`"${details.opening_crawl}"`}</Text>
          </View>
        </ScrollView>
        <StatusBar style="light" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  view: {
    paddingVertical: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  design: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    width: " 100%",
    fontStyle: "italic",
    lineHeight: 25,
    color: "#fee277",
  },
  header: {
    fontSize: 35,
    marginLeft: 35,
    fontWeight: "700",
    paddingVertical: 20,
    color: "#fee277",
  },
});

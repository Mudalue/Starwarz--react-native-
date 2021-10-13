import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getMovie } from "../http/Connect";

export default function Home({ navigation }) {
  const [movie, setMovie] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    (async () => {
      setPreloader(true);
      let response = await getMovie();
      setMovie(response.data.results);
      setPreloader(false);
    })();
  }, []);
  if (preloader) {
    return (
      <View style={styles.container}>
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movie}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.view}
            onPress={() => {
              navigation.navigate("details", { id: item.episode_id });
            }}
          >
            <Text key={item.episode_id} style={styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
      />
      <StatusBar style="dark" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fee277",
    paddingVertical: 80,
  },
  text: {
    paddingVertical: 30,
    marginHorizontal: 30,
    color: "#fee277",
    fontWeight: "700",
    fontSize: 20,
  },
  view: {
    width: "90%",
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  preloader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee277",
  },
});

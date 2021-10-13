import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Welcome({ navigation }) {

  return (
    <View style={styles.container}>
      <Image
        source={require("./img/logo.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("home");
        }}
      >
        <Text style={styles.btnText}>See movies</Text>
      </TouchableOpacity>
      <StatusBar style="inverted" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 200,
    paddingHorizontal: 0,
  },
  text: {
    fontSize: 50,
    color: "#ffc107",
    fontWeight: "800",
  },
  image: {
    width: 250,
    height: 150,
    paddingBottom: 20,
  },
  btn: {
    backgroundColor: "#fee277",
    paddingVertical: 18,
    borderRadius: 15,
    marginBottom: 150,
  },
  btnText: {
    color: "#000",
    paddingHorizontal: 75,
    fontWeight: "700",
    fontSize: 18,
  },
});

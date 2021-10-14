import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getCharacters } from "../../http/Connect";

export default function Movie({ navigation, route }) {
  const [details, setDetails] = useState({});
  const [character, setCharacter] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loader, setLoader] = useState(false);

  let URL = `https://swapi.dev/api/films/${route.params.id}`;
  const getDetails = async () => {
    try {
      const response = await axios.get(URL);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await getDetails();
      setDetails(response.data);
      setLoader(false);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await getCharacters();
      if (response.status === 200) {
        let result = response.data.results;
        setCharacter(result);
        setLoader(false);
      }
    })();
  }, []);
  if (loader) {
    return (
      <View style={styles.container2}>
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
        <StatusBar style="dark" />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>{details.title}</Text>
          <View style={styles.view}>
            <Text style={styles.design}>{`"${details.opening_crawl}"`}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Pressable
                onPress={() => {
                  setModalVisibility(true);
                }}
              >
                <Text style={styles.modalText1}>Characters</Text>
              </Pressable>
            </View>
            <View style={{ width: "50%" }}>
              <Pressable
                onPress={() => {
                  setModalVisibility(true);
                }}
              >
                <Text style={styles.modalText1}>Planets</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.view2}>
            <View style={styles.viewflex}>
              <Text style={styles.text2}>Producer: </Text>
              <Text style={styles.text3}>{details.producer}</Text>
            </View>
            <View style={styles.viewflex}>
              <Text style={styles.text2}>Director: </Text>
              <Text style={styles.text3}>{details.director}</Text>
            </View>
            <View style={styles.viewflex}>
              <Text style={styles.text2}>Release date: </Text>
              <Text style={styles.text3}>{details.release_date}</Text>
            </View>
          </View>

          {/* Modals */}
          <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibility}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <TouchableOpacity
                      style={{ backgroundColor: "#000" }}
                      onPress={() => {
                        setModalVisibility(!modalVisibility);
                      }}
                    >
                      <Text style={{ backgroundColor: "#000", color: "#fff" }}>
                        close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisibility}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 20,
                      marginHorizontal: 20,
                    }}
                  >
                    <View style={{ marginVertical: 0 }}>
                      <FlatList
                        data={character}
                        renderItem={({ item }) => (
                          <View
                            
                          >
                            <Text
                              style={{
                                lineHeight: 30,
                                fontWeight: "600",
                                fontSize: 18,
                                
                              }}
                            >
                            {item.name}
                            </Text>
                         
                          </View>
                        )}
                        keyExtractor={(item) => item.name}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#000",
                      marginHorizontal: 20,
                      padding: 10,
                    }}
                    onPress={() => {
                      setModalVisibility(!modalVisibility);
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "#000",
                        color: "#fff",
                        paddingHorizontal: 30,
                        textAlign: "center",
                        width: "100%",
                        fontWeight: "700",
                        fontSize: 20,
                      }}
                    >
                      close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    paddingTop: 35,
  },
  view: {
    paddingVertical: 10,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    borderRadius: 25,
  },
  view2: {
    paddingVertical: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  design: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    width: " 100%",
    fontStyle: "italic",
    lineHeight: 25,
    color: "#fee277",
    paddingVertical: 5,
  },
  design2: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "left",
    width: " 100%",
    lineHeight: 35,
    color: "#fee277",
    marginHorizontal: 30,
  },
  text2: {
    color: "#fee277",
    fontSize: 20,
    fontWeight: "700",
  },
  text3: {
    fontSize: 16,
    color: "#fee277",
    fontWeight: "500",
    marginTop: 5,
  },
  header: {
    fontSize: 25,
    marginLeft: 35,
    fontWeight: "700",
    paddingVertical: 15,
    color: "#fee277",
    marginVertical: 10,
  },
  viewflex: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 3,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 2,
    backgroundColor: "#000",
  },
  modalView: {
    backgroundColor: "#fee277",
    height: 400,
    borderRadius: 20,
    marginHorizontal: 10,
    // shadowColor: "#fff",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  modalText1: {
    backgroundColor: "#fee277",
    textAlign: "center",
    marginHorizontal: 20,
    padding: 18,
    marginVertical: 10,
    fontWeight: "700",
    fontSize: 15,
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  preloader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee277",
  },
  container2: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fee277",
    paddingVertical: 80,
  },
});

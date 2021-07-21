import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "./Colors";

import Fire from "./Fire";

import LottieView from "lottie-react-native";

import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import TipsModal from "./components/TipsModal";

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
    addTodoVisible: false,
    addTipsVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert(`Oops, Something went wrong`);
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  toggleTipsModal() {
    this.setState({ addTipsVisible: !this.state.addTipsVisible });
  }

  renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  deleteList = (list) => {
    firebase.deleteList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.container}>
          {/* <ActivityIndicator size="large" color={colors.blue} /> */}

          <Text style={styles.title}>
            TODO
            <Text
              style={{
                fontWeight: "300",
                color: colors.blue,
              }}
            >
              {" "}
              LISTS
            </Text>
          </Text>

          <Image
            source={require("./assets/loading-animation.gif")}
            style={{ width: 50, height: 50 }}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            visible={this.state.addTodoVisible}
            onRequestClose={() => this.toggleAddTodoModal()}
          >
            <AddListModal
              closeModal={() => this.toggleAddTodoModal()}
              addList={this.addList}
            />
          </Modal>
          <Modal
            animationType="slide"
            visible={this.state.addTipsVisible}
            onRequestClose={() => this.toggleTipsModal()}
          >
            <TipsModal closeModal={() => this.toggleTipsModal()} />
          </Modal>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.divider1} />
            <View style={styles.divider} />
            <Text style={styles.title}>
              TODO
              <Text
                style={{
                  fontWeight: "300",
                  color: colors.blue,
                }}
              >
                {" "}
                LISTS
              </Text>
            </Text>
            <View style={styles.divider} />
            <View style={styles.divider1} />
          </View>
          <View style={{ marginVertical: 48 }}>
            <TouchableOpacity
              style={styles.addList}
              onPress={() => this.toggleAddTodoModal()}
            >
              <AntDesign name="plus" size={16} color={colors.blue} />
            </TouchableOpacity>

            <Text style={styles.add}>Add List</Text>
          </View>

          <View style={{ height: 275, paddingLeft: 32, marginBottom: 30 }}>
            <FlatList
              data={this.state.lists}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => this.renderList(item)}
              keyboardShouldPersistTaps="always"
            />
            {/* <View style={styles.tipsView}>
                <TouchableOpacity>
                  <Text>Tips</Text>
                </TouchableOpacity>
              </View> */}
          </View>

          <View style={styles.tipsView}>
            <TouchableOpacity onPress={() => this.toggleTipsModal()}>
              <Text style={styles.tip}>Tips & Donations</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  divider1: {
    backgroundColor: colors.blue,
    height: 3,
    flex: 1,
    alignSelf: "baseline",
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },

  ///////////
  tipsView: {
    position: "absolute",
    bottom: 24,
    height: 30,
    width: 140,
    backgroundColor: colors.lightgray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  tip: {
    fontSize: 15,
    color: colors.red,
    fontWeight: "bold",
  },
});

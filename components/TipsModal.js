import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import colors from "../Colors";

import { WebView } from "react-native-webview";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default class TipsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
      footer: "</> with ❤️ by Team Meraxes in 🇱🇰",
    };
  }

  render() {
    setTimeout(() => {
      this.setState({ timePassed: true });
    }, 1000);
    if (!this.state.timePassed) {
      return (
        <View style={styles.container}>
          <Image
            source={require("../assets/loading-animation.gif")}
            style={{ width: 50, height: 50 }}
          />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.tip}>Tips</Text>
          <View style={styles.tipsView}>
            <Text>You can Delete Todo's and Lists by Long Pressing !</Text>
          </View>

          <Text style={styles.tip}>Donations</Text>
          <View style={styles.webView}>
            <WebView
              originWhitelist={["*"]}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              source={{
                html: `<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><script src="https://donorbox.org/widget.js" paypalExpress="true"></script><iframe allowpaymentrequest="" frameborder="0" height="1800px" name="donorbox" scrolling="no" seamless="seamless" src="https://donorbox.org/embed/todo-app-donations?default_interval=o&amount=10" style="max-width: 500px; align-items: center; justify-content: center; min-width: 310px; max-height:none!important" width="100%"></iframe>`,
              }}
              style={{
                flex: 1,
                width: 325,
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => console.warn(`Pressed`)}>
              <Text style={{ fontWeight: "bold" }}>{this.state.footer}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  webView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 25,
    height: 400,
  },
  button: {
    position: "absolute",
    bottom: 15,
    height: 30,
    width: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  tip: {
    fontWeight: "bold",
    fontSize: 26,
  },
  tipsView: {
    marginVertical: 20,
  },
});

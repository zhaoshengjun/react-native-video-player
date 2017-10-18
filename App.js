import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry, TextInput } from "react-native";
import Video from "react-native-video";
import TestVideo from "./video.mp4";

// const RemoteVedio = {uri:'https://viemo.com/assets/xxx.mp4'}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={TestVideo}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

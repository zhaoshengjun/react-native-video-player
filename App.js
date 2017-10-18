import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Dimensions,
  TextInput
} from "react-native";
import Video from "react-native-video";
import TestVideo from "./video.mp4";
// const RemoteVedio = {uri:'https://viemo.com/assets/xxx.mp4'}
import Icon from "react-native-vector-icons/FontAwesome";

export default class App extends Component {
  state = {
    error: false
  };

  handleError = meta => {
    const { error: { code } } = meta;
    let error = "An error occured playing this video.";
    switch (code) {
      case -11800:
        error = "Could not load video from URL.";
        break;
    }

    this.setState({
      error
    });
  };

  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { error } = this.state;

    return (
      <View style={styles.container}>
        <View style={error ? sytles.error : undefined}>
          <Video
            style={{ width: "100%", height }}
            source={{ uri: "http://google.com/notavideo" }}
            resizeMode="contain"
            onError={this.handleError}
          />
          <View style={styles.videoCover}>
            {error && (
              <Icon name="exclamation-triangle" size={30} color="red" />
            )}
            {error && <Text>{error}</Text>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250
  },
  videoCover: {
    alignItem: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,.9"
  },
  error: {
    backgroundColor: "#000"
  }
});

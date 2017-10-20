import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  AppRegistry,
  ScrollView,
  Dimensions,
  TextInput
} from "react-native";
import Video from "react-native-video";
import TestVideo from "./video.mp4";
// const RemoteVedio = {uri:'https://viemo.com/assets/xxx.mp4'}
import Icon from "react-native-vector-icons/FontAwesome";

const THRESHOLD = 100; // when the video container is passing 100 pixel, the video will start to play. vise versa.
export default class App extends Component {
  state = {
    error: false,
    paused: true,
    buffering: true,
    animated: new Animated.Value(0)
  };

  position = {
    start: null,
    end: null
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

  handleLoadStart = () => {
    this.triggerBufferAnimation();
  };

  triggerBufferAnimation = () => {
    this.loopingAnimation = Animated.loop(
      Animated.timing(this.state.animated, {
        toValue: 1,
        duration: 350
      })
    ).start();
  };

  handleBuffer = meta => {
    meta.isBuffering && this.triggerBufferAnimation();

    if (this.loopingAnimation && !meta.isBuffering) {
      this.loopingAnimation.stopAnimation();
    }

    this.setState({
      buffering: meta.isBuffering
    });
  };

  handleScroll = evt => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const paused = this.state.paused;
    const { start, end } = this.position;

    if (scrollPosition > start && scrollPosition < end && paused) {
      this.setState({ paused: false });
    } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
      this.setState({ paused: true });
    }
  };

  handleVideoLayout = evt => {
    const { height } = Dimensions.get("window");
    this.position.start = evt.nativeEvent.layout.y - height + THRESHOLD;
    this.position.end =
      evt.nativeEvent.layout.y + evt.nativeEvent.layout.height - THRESHOLD;
  };

  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { error, buffering } = this.state;
    const interpolatedAnimation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    const rotateStyle = {
      transform: [{ rotate: interpolatedAnimation }]
    };

    return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16} onScroll={this.handleScroll}>
          <View style={styles.fakeContent} />
          <View style={error ? sytles.error : undefined}>
            <Video
              style={StyleSheet.absoluteFill}
              source={{ uri: "http://google.com/notavideo" }}
              resizeMode="contain"
              onError={this.handleError}
              onLoadStart={this.handleLoadStart}
              onBuffer={this.handleBuffer}
              repeat
              paused={this.state.paused}
              onLayout={this.handleVideoLayout}
            />
            <View style={styles.videoCover}>
              {error && (
                <Icon name="exclamation-triangle" size={30} color="red" />
              )}
              {error && <Text>{error}</Text>}
              {buffering && (
                <Animated.View style={rotateStyle}>
                  <Icon name="circle-o-notch" size={30} color="#FFF" />
                </Animated.View>
              )}
            </View>
            <View>
              <Text style={styles.header}>Login</Text>
              <TextInput placeholder="Email" style={styles.input} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>
          <View style={styles.fakeContent} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250
  },
  header: {
    fontSize: 30,
    backgroundColor: "transparent",
    color: "#FFF"
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#FFF",
    marginVertical: 15,
    paddingLeft: 15
  },
  videoCover: {
    alignItem: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "transparent"
  },
  error: {
    backgroundColor: "#000"
  }
});

AppRegistry.registerComponent("rn-video", () => App);

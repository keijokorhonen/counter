import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableNativeFeedback, StyleSheet, AsyncStorage } from 'react-native';

class Counter extends Component {
  render() {
    return (
       <TouchableNativeFeedback onPress={this.props.pressHandler}>
          <View style={[styles.button, {backgroundColor: this.props.bgColor}]}>
            <Text style={styles.buttonText}>{this.props.name}</Text>
          </View>
        </TouchableNativeFeedback>
    );
  }
}

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}

class Value extends Component {
  render() {
    return (
      <View>
        <Text style={styles.value}>{this.props.successes}/{this.props.total}</Text>
      </View>
    )
  }
}

export default class App extends Component {
  state = {
    successes: 0, 
    total: 0
  }

  _onSuccessPress = () => {
    this.setState(prevState => (
      {successes: prevState.successes + 1, total: prevState.total + 1}
    ))
  }

  _onFailurePress = () => {
    this.setState(prevState => (
      {...prevState, total: prevState.total + 1}
    ))
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('CounterAppData', this.state);
    } catch (error) {
      console.log("Error storing data")
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('CounterAppData');
      if (value !== null) {
        this.setState(...value)
      }
    } catch (error) {
      console.log("Error retreiving data")
    }
  }

  componentWillMount() {
    this._retrieveData()
  }

  componentWillUnmount() {
    this._storeData()
  }

  render() {
    return (
      <View style={styles.container}>
          <Title title="Counter"/>
          <Value successes={this.state.successes} total={this.state.total}/>
          <Counter name='Success' bgColor="#00b706" pressHandler={this._onSuccessPress}/>
          <Counter name='Failure' bgColor="#c10108"  pressHandler={this._onFailurePress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center', 
      top: 50, 
      flex: 1
  },
  title: {
    fontSize: 50
  },
  value: {
    fontSize: 30
  },
  button: {
    width: 300,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
  },
  buttonText: {
    paddingTop: 20,
    paddingBottom: 20,
    color: "#ffffff",
    fontSize: 20
  }
})

AppRegistry.registerComponent('Counter', () => App);

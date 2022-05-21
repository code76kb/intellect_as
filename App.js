/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AppNavigation from './res/navigation';


class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar
          animated={true}
          backgroundColor={"#325d6e"}
          barStyle={'default'}
          showHideTransition={'fade'}
          hidden={false} />
        <AppNavigation />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  statusBarStyle:{

  }
});

export default App;

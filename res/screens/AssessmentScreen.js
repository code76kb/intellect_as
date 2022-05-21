/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Button from '../components/Button';
import CircularRangeSlider from '../components/CircularRangeSlider';
import Trapezoid from '../components/Trapezoid';
import PageTitleSegment from '../components/PageTitleSegment';
import ViewPagerIndicator from '../components/ViewPagerIndicator';

const angerFrustrationTrapezoidLabels = [ "Very Low", "Low", "Moderate", "High", "Very High"];

class AssessmentScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalPage: 2,
      currentPage: 0,

      angerFrustrationCircularValue:0,
      angerFrustrationTrapezoidValue:0,
      angerFrustrationTrapezoidLabel:"",
    }

    this.circularProgressRef;
    this.viewPagerRef;
  }

  componentDidMount() {
    this.setState({angerFrustrationTrapezoidValue:1,angerFrustrationTrapezoidLabel: angerFrustrationTrapezoidLabels[0]})
  }

  onChangeTrapezoid = (value) => {
    // console.log("Value :" + value);
    let angerFrustrationTrapezoidLabel = angerFrustrationTrapezoidLabels[value-1];
    let angerFrustrationTrapezoidValue = value;
    this.setState({angerFrustrationTrapezoidValue:angerFrustrationTrapezoidValue, angerFrustrationTrapezoidLabel:angerFrustrationTrapezoidLabel});
  }

  closeSession = () => {
    Alert.alert(
      "Are you sure?",
      "All progress in this session will be lost",
      [
        {
          text: "QUIT", onPress: () => {
            //TODO Close the session
          }
        },
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        }
      ]
    );
  }

  renderPage1 = () => {
    const title = "RESCUE SESSION: ANGER & FRUSTRATION";
    const subTitle = "Pick the level your anger &\nfrustration right now";
    return (
      <View key="1" style={{ flex: 1, }}>

        <PageTitleSegment
          title={title}
          subTitle={subTitle}
          onPressClose={this.closeSession} />

        {/* Circular Widget */}
        <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
          <CircularRangeSlider
            onValueChange={(value) => {
              console.log("Value :" + value)
            }}
            maxValue={10}
            size={300}
          />
          {/* Next Button */}
          <Button
            onPress={this.moveToNextPage}
            label="NEXT"
            buttonStyle={{
              width: '90%',
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          />

        </View>

      </View>
    );
  }

  renderPage2 = () => {
    const title = "RESCUE SESSION: ANGER & FRUSTRATION";
    const subTitle = "Pick the level your anger &\nfrustration right now";
    return (
      <View key="2">

        <PageTitleSegment
          title={title}
          subTitle={subTitle}
          onPressClose={this.closeSession} />


        {/* Trapezoid meter Widget */}
        <View style={{flex:1, alignItems: 'center',justifyContent:'space-evenly', marginBottom:20 }}>
        <Text style={{color:'white', fontWeight:'bold', }}>{this.state.angerFrustrationTrapezoidLabel}</Text>  

          <Trapezoid
            height={300}
            width={240}
            stackSize={5}
            value={this.state.angerFrustrationTrapezoidValue}
            onChange={this.onChangeTrapezoid}
          />

          <Button
            onPress={this.moveToNextPage}
            label="NEXT"
            buttonStyle={{
              width: '90%',
              height: 40,
              borderRadius: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}
          />
        </View>


      </View>
    );
  }

  onPageScroll = (e) => {
    console.log(e.nativeEvent.position);
    this.setState({ currentPage: e.nativeEvent.position });
  }

  moveToNextPage=()=>{
    if(this.state.currentPage < this.state.totalPage){
      this.viewPagerRef.setPage(this.state.currentPage+1);
    }
}

  renderPagerView = () => {
    return (
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={this.onPageScroll}
        ref={(ref)=>this.viewPagerRef = ref}
      >
        {this.renderPage1()}
        {this.renderPage2()}
      </PagerView>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#325d6e' }}>
        <ViewPagerIndicator pageCount={this.state.totalPage} currentPage={this.state.currentPage} />
        {this.renderPagerView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default AssessmentScreen;

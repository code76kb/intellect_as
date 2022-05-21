import React,{useState} from "react";
import {
    Text,
    StyleSheet,
    Easing,
    View,
} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types'

function CircularRangeSlider(props) {

    const spacing = 40;
    const sizeOuterCircle = props.size - spacing;
    const sizeProgressCircle = props.size - (spacing*2);
    const sizeInnerCircle1 = props.size - (spacing*2) - 4;
    const sizeInnerCircle2 = props.size - (spacing*3);

    var circularProgressRef;

    const [progress,setProgress] = useState(0);

    function onSliderValueChange(value){
        setProgress(value)
        let x = (value/props.maxValue) * 100;
        circularProgressRef.animate(x, 0, Easing.linear);
        props.onValueChange(value);
    }


    return (
         
        <View style={{ width: props.size, height: props.size, alignItems: 'center' }}>

            {/* Outer Circle */}
            <View style={[{ borderRadius: sizeOuterCircle/2, width: sizeOuterCircle, height: sizeOuterCircle,}, styles.outerCircle]}>

                {/* Circular Progress Bar */}
                <View style={styles.containerProgressCircle}>

                    <AnimatedCircularProgress
                        ref={ref => circularProgressRef = ref}
                        size={sizeProgressCircle}
                        width={4}
                        fill={0}
                        rotation={0}
                        tintColor="white"
                        backgroundColor="transparent"
                        lineCap={'round'}>
                    </AnimatedCircularProgress>

                </View>

                {/* Inner Circles */}
                <View style={[styles.containerInnerCircle,{width: sizeInnerCircle1, height: sizeInnerCircle1, borderRadius: sizeInnerCircle1/2}]}>
                    <View style={[{ width: sizeInnerCircle2, height: sizeInnerCircle2, borderRadius: sizeInnerCircle2/2, }, styles.innerCircle]}>
                        <Text style={styles.txtProgress}>{progress}</Text>
                    </View>
                </View>

            </View>


            <Slider
                style={[styles.slider, {width: props.size}]}
                minimumValue={0}
                maximumValue={props.maxValue}
                minimumTrackTintColor="#6edbe6"
                maximumTrackTintColor="white"
                step={1}
                onValueChange={onSliderValueChange}
            />

        </View>
    );
}


const styles = StyleSheet.create({
   
    outerCircle:{ 
        borderWidth: 2, 
        borderStyle: 'dashed', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: '#819da7'
    },

    containerProgressCircle:{ 
        position: 'absolute', 
        zIndex: 10000 
    },

    containerInnerCircle:{ 
        backgroundColor: '#456d7c', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    innerCircle:{
        backgroundColor: '#b8eff4', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    txtProgress:{ 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: 'white' 
    },

    slider:{ 
        height: 40, 
        marginTop:16 
    },

});

CircularRangeSlider.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
}

CircularRangeSlider.defaultProps = {
    size: 300,
    maxValue: 10,
}

export default CircularRangeSlider;
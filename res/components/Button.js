import React from "react";
import { Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from 'prop-types'
export default function Button(props) {

    let coolDown=true;
    function onClickWithThrottle(){
        // console.log("Button CoolDown :"+coolDown);
        if(props.disabled)
            return;
        if(coolDown){
            props.onPress();
            coolDown = false;
        }
        else{
            setTimeout(()=>coolDown=true,props.throttleTime);
        }
    }

    return (
        <TouchableHighlight
            style={props.buttonStyle}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onClickWithThrottle}>
            <Text style={props.labelStyle}>{props.label}</Text>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({
    button: {
        width:100,
        height: 40,
        backgroundColor: 'ivory',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        paddingHorizontal:20
    },
    label: {
        color: 'black',
        fontSize: 16,
    },
});

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string,
    buttonStyle: PropTypes.any,
    labelStyle: PropTypes.any,
    throttleTime: PropTypes.number,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    buttonStyle: styles.button,
    labelStyle: styles.label,
    throttleTime: 300,
    disabled:false,
}

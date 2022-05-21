import React from "react";
import { Text, StyleSheet, TouchableHighlight, View, Image } from "react-native";
import PropTypes from 'prop-types'

export default function PageTitleSegment(props) {

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.txtTitle}>{props.title}</Text>
                <TouchableHighlight
                    style={styles.btnClose}
                    activeOpacity={0.6}
                    underlayColor="#999999"
                    onPress={props.onPressClose}>
                    <Image source={require("../assets/image/close.png")} style={styles.imgClose} />
                </TouchableHighlight>
            </View>
            <Text style={styles.txtSubTitle}>{props.subTitle}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 10, 
        paddingVertical: 10, },

    txtTitle: { 
        color: 'white', 
        fontSize: 10, 
        fontWeight: 'bold', 
    },

    btnClose:{ 
        borderRadius: 10, 
        padding: 4 
    },

    imgClose:{ 
        width: 14, 
        height: 14 
    },
    
    txtSubTitle:{ 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 16, 
        marginTop: 20, 
        marginLeft: 10 
    },

});

PageTitleSegment.propTypes = {
    onPressClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
}

PageTitleSegment.defaultProps = {
    title: "",
    subTitle: "",
    onPressClose: null
}

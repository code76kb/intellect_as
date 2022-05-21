import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from 'prop-types'

export default function ViewPagerIndicator(props) {

    let pageArray = Array.from({ length: props.pageCount });
    return (
      <View style={styles.indicatorContainer}>
        {pageArray.map((v, i) => {
          return <View key={`indi_${i}`} style={[styles.indicatorBar, i > 0 ? { marginLeft: 10 } : null, i > props.currentPage ? { backgroundColor: props.color } : {backgroundColor: props.activeColor } ]} />
        })}
      </View>
    );
}


const styles = StyleSheet.create({
    indicatorContainer: { 
        height: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 10 
    },
    indicatorBar: {
         flex: 1, 
         height: 4, 
         borderRadius: 4
    },
});

ViewPagerIndicator.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    color:PropTypes.string,
    activeColor:PropTypes.string
}

ViewPagerIndicator.defaultProps = {
    pageCount: 0,
    currentPage: 0,
    color:"#819da7",
    activeColor:'white'
}

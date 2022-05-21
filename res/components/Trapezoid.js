import React, { useState, useEffect } from "react";
import { View } from "react-native";
import PropTypes from 'prop-types'

import { Surface, Shape, Path } from '@react-native-community/art';


// TODO : Min Max window size and StackSize checks

function generateTrapezoidPath(config) {

    // console.log("CONFIG :" + JSON.stringify(config));
    // initial points 
    let X = config.X;
    let Y = config.Y;
    let points = [];

    const offset = config.radius; // 8
    const R = 0 // X, Y radius 

    points.push({ x: X + config.width, y: Y });
    points.push({ x: X + config.width - offset, y: Y + config.height });
    points.push({ x: X + offset, y: Y + config.height });

    var path = new Path();

    path = path.moveTo(X, Y + config.radius);
    path = path.arcTo(X + config.radius, Y, R, R)

    path = path.lineTo(points[0].x - config.radius, points[0].y);
    path = path.arcTo(points[0].x, points[0].y + config.radius, R, R)

    path = path.lineTo(points[1].x, points[1].y - config.radius);
    path = path.arcTo(points[1].x - config.radius, points[1].y, R, R)

    path = path.lineTo(points[2].x + config.radius, points[2].y);
    path = path.arcTo(points[2].x, points[2].y - config.radius, R, R)

    path = path.lineTo(X, Y + config.radius);

    return path;
}

function generateTrapezoidStack(props) {
    const squashFactor = 2;
    const paddingFactor = 5; // TODO expose on props
    const curveRadius = (props.height / (props.stackSize * 7)); // factor:7
    const paddingVertical = props.height / (props.stackSize * paddingFactor);
    const stackSize = props.stackSize;
    const stackWidth = props.width;
    const stackHeight = props.height;
    const widthDelta = stackWidth / (stackSize * 2);

    const config = {
        height: (stackHeight - (stackSize * paddingVertical)) / stackSize,
        width: 0,
        radius: curveRadius,
        noOfPoints: 4,
        X: 0,
        Y: 0
    }
    let paths = []
    let configs = []
    for (let i = 0; i < stackSize; i++) {
        let conf = { ...config };
        conf.Y = i * (config.height + paddingVertical);
        conf.X = config.X + ((i * squashFactor) * (widthDelta / 2))
        conf.width = stackWidth - ((i * squashFactor) * (widthDelta))
        configs.push(conf);
        paths.push(generateTrapezoidPath(conf));
    }
    return { paths, configs };
}

export default function Trapezoid(props) {
    const { paths, configs } = generateTrapezoidStack(props);
    const [progress, setProgress] = useState(props.stackSize - props.value);

    useEffect(() => {
        if (progress != (props.stackSize - props.value)){
            setProgress(props.stackSize - props.value)
        }
    }, [props.value])

    function getValue() {
        return progress //props.stackSize - props.value;
    }

    function onTouch(e) {
        for (let i = 0; i < configs.length; i++) {
            if (e.nativeEvent.locationY < configs[i].Y + configs[i].height) {
                setProgress(i);
                props.onChange(props.stackSize - i)
                return;
            }
        }
        if (progress == props.stackSize - 1)
            props.onChange(1);
    }


    return (
        <View style={{ width: props.width, height: props.height }} onTouchStart={onTouch}>
            <Surface width={props.width} height={props.height}>
                {
                    paths.map((path, index) => {
                        return <Shape key={`trap_${index}`} d={path} stroke="white" fill={getValue() <= index ? 'white' : "#819da7"} strokeWidth={1} />
                    })
                }

            </Surface>
        </View>
    );
}



Trapezoid.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    stackSize: PropTypes.number.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func
}

Trapezoid.defaultProps = {
    height: 400,
    width: 250,
    stackSize: 5,
    value: 1
}

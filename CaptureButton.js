import React, {useState, useEffect, useRef} from "react";
import {View, TouchableWithoutFeedback} from "react-native";
import CircleProgress from "./CircleProgress";

export default (
    {
        onTakePicture = () => {},
        onRecordingStart = () => {},
        onRecordingEnd = () => {},
        delayLongPress = 1200,
        radiusOuter = 80,
        radiusOuterRecording = 120,
        radiusInner = 60,
        radiusInnerRecording = 30,
        duration = 10000,
        interval = 100,
        disableRecording = false,
        disableTakingPicture = false
    }
) => {
    const [state, setState] = useState({circleRadius: radiusInner, pressing: false});

    const setCircleRadius = (circleRadius) => {
        setState({
            ...state,
            circleRadius
        });
    };

    const setPressing = (pressing) => {
        setState({
            ...state,
            pressing
        });
    };

    const {circleRadius, pressing} = state;

    useEffect(() => {
        if (pressing) {
            onRecordingStart();
        } else {
            onRecordingEnd();
        }
    }, [pressing]);

    const outerCircleRadius = pressing ? radiusOuterRecording : radiusOuter;

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (!disableTakingPicture) {
                    onTakePicture();
                }
            }}
            onLongPress={() => {
                if (!disableRecording) {
                    setCircleRadius(radiusInnerRecording);
                    setPressing(true);
                }
            }}
            onPressOut={() => {
                if (!disableTakingPicture) {
                    setCircleRadius(radiusInner);
                    setPressing(false);
                }
            }}
            delayLongPress={delayLongPress}
        >
            <View style={{width: outerCircleRadius, height: outerCircleRadius}}>
                <CircleProgress
                    duration={duration}
                    interval={interval}
                    radiusOuter={outerCircleRadius}
                    radiusInner={circleRadius}
                    recording={pressing}
                    onComplete={() => {
                        setCircleRadius(radiusInner);
                        setPressing(false);
                    }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
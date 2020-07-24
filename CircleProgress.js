import React, {useState, useEffect, useRef} from "react";
import {View} from "react-native";
import {AnimatedCircularProgress} from "react-native-circular-progress";

export default (
    {
        radiusOuter = 100,
        radiusInner = 80,
        recording = false,
        duration = 10000,
        interval = 100,
        onComplete = () => {}
    }
) => {
    const timerRef = useRef(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let total = 0;
        if (recording) {
            if (timerRef.current)
                clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                if (total >= duration) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    onComplete();
                } else {
                    const nextTotal = Math.min(duration, total + interval);
                    if (nextTotal !== total) {
                        total = nextTotal;
                        setTime(total);
                    }
                }
            }, interval);
        } else {
            if (timerRef.current)
                clearInterval(timerRef.current);
            timerRef.current = null;
            setTime(0);
        }
        return () => {
            if (recording) {
                if (timerRef.current)
                    clearInterval(timerRef.current);
                timerRef.current = null;
                if (total < duration) {
                    onComplete();
                }
            }
        };
    }, [recording]);

    const progress = Math.min(parseInt((time / duration) * 100), 100);

    return (
        <View
            style={{
                width: radiusOuter,
                height: radiusOuter,
                borderRadius: radiusOuter / 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#808080"
            }}>
            <View
                style={{
                    position: "absolute",
                    width: radiusInner,
                    height: radiusInner,
                    borderRadius: radiusInner / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    zIndex: 3
                }}
            />
            <View
                style={{
                    left: 0,
                    width: radiusOuter,
                    height: radiusOuter,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <AnimatedCircularProgress
                    duration={recording ? 500 : 0}
                    easing={t => t}
                    size={radiusOuter}
                    width={8}
                    fill={progress}
                    rotation={0}
                    tintColor="#08C060"
                    backgroundColor="#808080"/>
            </View>
        </View>
    );
}
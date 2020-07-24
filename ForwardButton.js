import React from "react";
import {View, Image, TouchableWithoutFeedback} from "react-native";
import IconDown from "./images/collapse-down.png";

export default (
    {
        IconSource = IconDown,
        width = 30,
        height = 30,
        iconSize = 15,
        borderRadius = 15,
        backgroundColor = "rgba(255,255,255,1.0)",
        onBack = () => {}
    }
) => {
    return (
        <View style={{width, height}}>
            <TouchableWithoutFeedback onPress={onBack}>
                <View style={{
                    width,
                    height,
                    borderRadius,
                    backgroundColor,
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                }}>
                    <Image style={{width: iconSize, height: iconSize}} source={IconSource}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
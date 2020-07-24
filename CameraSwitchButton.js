import React from "react";
import {View, Image, TouchableWithoutFeedback} from "react-native";
import IconSwitchCamera from "./images/switch-camera.png";

export default (
    {
        visible,
        width = 40,
        height = 40,
        IconSource = IconSwitchCamera,
        onSwitchCamera = () => {}
    }
) => {
    if (!visible)
        return null;
    return (
        <View style={{width, height}}>
            <TouchableWithoutFeedback onPress={onSwitchCamera}>
                <View style={[
                    {
                        width,
                        height,
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden"
                    }
                ]}>
                    <Image source={IconSource} style={{width, height}}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
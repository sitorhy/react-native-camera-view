import React from "react";
import {View, StyleSheet} from "react-native";

import CameraSwitchButton from "./CameraSwitchButton";

const styles = StyleSheet.create(
    {
        actionContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        switchButtonContainer: {
            position: "absolute",
            right: "2.5%"
        }
    }
);

export default (
    {
        onSwitchCamera = () => {},
        switchButtonContainerStyle = {},
        switchButtonProps = {}
    }
) => {
    return (
        <View style={styles.actionContainer}>
            <View style={[
                styles.switchButtonContainer,
                switchButtonContainerStyle
            ]}>
                <CameraSwitchButton onSwitchCamera={onSwitchCamera} {...switchButtonProps}/>
            </View>
        </View>
    );
}
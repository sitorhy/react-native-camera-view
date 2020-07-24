import React from "react";
import {Image, StyleSheet, View, TouchableWithoutFeedback} from "react-native";
import IconBack from "./images/preview-back.png";
import IconYes from "./images/preview-yes.png";

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "row",
            width: "100%",
            position: "absolute",
            bottom: 0,
            height: 80,
            marginBottom: "40%"
        },
        actionContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        actionButton: {
            backgroundColor: "white",
            borderRadius: 25,
            width: 50,
            height: 50,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            elevation: 5
        },
        icon: {
            width: 30,
            height: 30
        }
    }
);

export default (
    {
        children,
        onConfirm = () => {},
        onCancel = () => {}
    }
) => {
    return (
        <View style={{flex: 1}}>
            {children}
            <View style={styles.container}>
                <View style={styles.actionContainer}>
                    <TouchableWithoutFeedback onPress={onCancel}>
                        <View style={styles.actionButton}>
                            <Image style={styles.icon} source={IconBack}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableWithoutFeedback onPress={onConfirm}>
                        <View style={styles.actionButton}>
                            <Image style={styles.icon} source={IconYes}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    );
}
import React, {useState} from "react";
import {View, StyleSheet, Text} from "react-native";
import CaptureButton from "./CaptureButton";
import ForwardButton from "./ForwardButton";

const styles = StyleSheet.create(
    {
        actionContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }
    }
);

export default (
    {
        onBack = () => {},
        onTakePicture = () => {},
        onRecordingStart = () => {},
        onRecordingEnd = () => {},
        forwardButtonProps = {},
        forwardButtonContainerStyle = {},
        captureButtonStyle = {},
        captureButtonProps = {},
        disableRecording = false,
        disableTakingPicture = false,
        operationTips = ""
    }
) => {
    const [recording, setRecording] = useState(false);

    return (
        <View style={styles.actionContainer}>
            {
                !recording ? (
                    <View style={[{
                        position: "absolute",
                        left: "12.5%"
                    }, forwardButtonContainerStyle]}>
                        <ForwardButton
                            onBack={onBack}
                            {...forwardButtonProps}
                        />
                    </View>
                ) : null
            }
            <View style={[{alignItems: "center"}, captureButtonStyle]}>
                <Text style={{color: "white", paddingTop: 12, paddingBottom: 12}}>{operationTips}</Text>
                <CaptureButton
                    disableRecording={disableRecording}
                    disableTakingPicture={disableTakingPicture}
                    onTakePicture={onTakePicture}
                    onRecordingStart={() => {
                        setRecording(true);
                        onRecordingStart();
                    }}
                    onRecordingEnd={() => {
                        setRecording(false);
                        onRecordingEnd();
                    }}
                    {...captureButtonProps}
                />
            </View>
        </View>
    );
}
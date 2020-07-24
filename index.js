import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, YellowBox, LogBox, Platform} from "react-native";
import {RNCamera} from 'react-native-camera';
import RNVideo from "react-native-video";
import fs from "react-native-fs";

import TopAction from "./TopAction";
import BottomAction from "./BottomAction";
import PreviewActionContainer from "./PreviewActionContainer";

if(LogBox){
    LogBox.ignoreLogs([
        "Video is not recording"
    ]);
} else if(YellowBox){
    YellowBox.ignoreWarnings([
        "Video is not recording"
    ]);
}

export const VideoQuality = RNCamera.Constants.VideoQuality;

export function LowestBitrate(videoWidth = 1920, videoHeight = 1080) {
    return parseInt(videoWidth * videoHeight * 3) / 4;
}

export function LowBitrate(videoWidth = 1920, videoHeight = 1080) {
    return parseInt(videoWidth * videoHeight * 3) / 2;
}

export function MediumBitrate(videoWidth = 1920, videoHeight = 1080) {
    return parseInt(videoWidth * videoHeight * 3);
}

export function HighBitrate(videoWidth = 1920, videoHeight = 1080) {
    return parseInt(videoWidth * videoHeight * 3) * 2;
}

export function HighestBitrate(videoWidth = 1920, videoHeight = 1080) {
    return parseInt(videoWidth * videoHeight * 3) * 4;
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "black",
            position: "relative"
        },
        camera: {
            flex: 1
        },
        actionBottom: {
            height: 150,
            width: "100%",
            position: "absolute",
            zIndex: 1,
            bottom: 0,
            marginBottom: "15%"
        },
        actionTop: {
            height: 100,
            width: "100%",
            position: "absolute",
            zIndex: 1,
            top: "5%"
        }
    }
);

export default (
    {
        videoQuality = VideoQuality["480p"],
        videoBitrate = MediumBitrate(640, 480),
        videoPreviewResizeMode = "cover",
        videoProps = {},
        videoDuration = 10000,
        disableRecording = false,
        disableTakingPicture = false,
        imagePreviewResizeMode = "cover",
        imageProps = {},
        recordOptions = {},
        maxImageWidth = 1920,
        imageQuality = 1.0,
        takePictureOptions = {},
        cameraProps = {},
        actionTopStyle = {},
        actionBottomStyle = {},
        cameraStyle = {},
        containerStyle = {},
        TopActionComponent = TopAction,
        TopActionProps = {},
        BottomActionComponent = BottomAction,
        BottomActionProps = {},
        onBack = () => {},
        notAuthorizedText = "请授予摄像头和麦克风使用权限",
        androidCameraPermissionOptions = {
            title: '摄像头使用授权',
            message: '应用需要您授权使用摄像头',
            buttonPositive: '确认',
            buttonNegative: '取消',
        },
        androidRecordAudioPermissionOptions = {
            title: '麦克风使用授权',
            message: '应用录制环境音需要您授权使用麦克风',
            buttonPositive: '确认',
            buttonNegative: '取消',
        },
        getOperationTips = (disableRecording, disableTakingPicture) => {
            const str1 = !disableTakingPicture ? "轻触拍照" : null;
            const str2 = !disableRecording ? "长按录像" : null;
            return [str1, str2].filter(i => !!i).join("，");
        }
    }
) => {
    const [type, setType] = useState(RNCamera.Constants.Type.back);
    const [media, setMedia] = useState(null);
    const [recording, setRecording] = useState(false);

    useEffect(() => {
        setType(RNCamera.Constants.Type.back);
    }, []);

    const onBackPress = () => {
        onBack(null);
    };

    const onSwitchCameraPress = () => {
        setType(type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back);
    };

    const onTakePicturePress = (camera) => {
        const options = {
            quality: Math.min(imageQuality > 0 ? imageQuality : 1.0, 1.0),
            fixOrientation: true
        };
        if (maxImageWidth) {
            options.width = maxImageWidth;
        }
        Object.assign(options, {
            ...takePictureOptions
        });
        camera.takePictureAsync(options).then((data) => {
            camera.stopRecording();
            setMedia({
                type: "image",
                ...data
            });
        });
    };

    const onRecordingStartPress = (camera) => {
        camera.stopRecording();
        camera.recordAsync({
            quality: videoQuality,
            videoBitrate,
            ...recordOptions
        }).then((data) => {
            setMedia({
                type: "video",
                ...data
            });
        }).catch(()=>{
            setMedia(null);
            camera.stopRecording();
        });
    };

    const onRecordingEndPress = (camera) => {
        camera.stopRecording();
    };

    const onConfirm = () => {
        const result = {...media};
        setMedia(null);
        onBack(result);
    };

    const onCancel = () => {
        setMedia(null);
        if (media) {
            fs.unlink(media.uri).then(() => {

            }).catch(() => {

            });
        }
    };

    const renderCapture = () => {
        return (
            <RNCamera
                style={[styles.camera, cameraStyle]}
                androidCameraPermissionOptions={androidCameraPermissionOptions}
                androidRecordAudioPermissionOptions={androidRecordAudioPermissionOptions}
                {...cameraProps}
                type={type}
            >
                {
                    ({camera, recordAudioPermissionStatus}) => {
                        return (
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <View style={[styles.actionTop, actionTopStyle]}>
                                    {
                                        !media ? <TopActionComponent
                                            switchButtonProps={{
                                                visible: !recording
                                            }}
                                            onSwitchCamera={onSwitchCameraPress}
                                            {...TopActionProps}
                                        /> : null
                                    }
                                </View>
                                {
                                    recordAudioPermissionStatus !== 'AUTHORIZED' ? (
                                        <View>
                                            <Text style={{color: "white"}}>{notAuthorizedText}</Text>
                                        </View>
                                    ) : null
                                }
                                <View style={[styles.actionBottom, actionBottomStyle]}>
                                    {
                                        !media ? <BottomActionComponent
                                            operationTips={getOperationTips(disableRecording, disableTakingPicture)}
                                            disableRecording={disableRecording}
                                            disableTakingPicture={disableTakingPicture}
                                            captureButtonProps={{
                                                duration: videoDuration + 1000
                                            }}
                                            onTakePicture={() => {
                                                onTakePicturePress(camera);
                                            }}
                                            onRecordingStart={() => {
                                                setRecording(true);
                                                onRecordingStartPress(camera);
                                            }}
                                            onRecordingEnd={() => {
                                                onRecordingEndPress(camera);
                                                setRecording(false);
                                            }}
                                            onBack={onBackPress}
                                            {...BottomActionProps}
                                        /> : null
                                    }
                                </View>
                            </View>
                        );
                    }
                }
            </RNCamera>
        );
    };

    const renderVideoPreview = () => {
        return (
            <PreviewActionContainer onCancel={onCancel} onConfirm={onConfirm}>
                <RNVideo repeat
                         controls
                         ignoreSilentSwitch={"ignore"}
                         style={{flex: 1, width: "100%"}}
                         {...videoProps}
                         resizeMode={videoPreviewResizeMode}
                         source={media}
                />
            </PreviewActionContainer>
        );
    };

    const renderImagePreview = () => {
        return (
            <PreviewActionContainer onCancel={onCancel} onConfirm={onConfirm}>
                <Image style={{flex: 1, width: "100%"}}
                       {...imageProps}
                       resizeMode={imagePreviewResizeMode}
                       source={media}/>
            </PreviewActionContainer>
        );
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {
                media && media.type && media.uri ? (
                    <View style={{position: "absolute", width: "100%", height: "100%", zIndex: 5}}>
                        {
                            media.type === "video" ? renderVideoPreview() : renderImagePreview()
                        }
                    </View>
                ) : null
            }
            {
                renderCapture()
            }
        </View>
    );
}
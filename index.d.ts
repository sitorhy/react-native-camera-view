import {Component} from "react";

export function LowestBitrate(videoWidth: number, videoHeight: number): number;

export function LowBitrate(videoWidth: number, videoHeight: number): number;

export function MediumBitrate(videoWidth: number, videoHeight: number): number;

export function HighBitrate(videoWidth: number, videoHeight: number): number;

export function HighestBitrate(videoWidth: number, videoHeight: number): number;

export class Result {
    type: string;
    uri: string;
}

export type VideoQuality = Readonly<{
    '2160p': any;
    '1080p': any;
    '720p': any;
    '480p': any;
    '4:3': any;
    /** iOS Only. Android not supported. */
    '288p': any;
}>;

export default class {
    videoQuality?: VideoQuality;
    videoBitrate ?: number;
    videoDuration?: number;
    videoPreviewResizeMode ?: string;
    videoProps?: any;
    imagePreviewResizeMode?: string;
    imageProps?: any;
    recordOptions?: any;
    maxImageWidth?: number;
    imageQuality?: number;
    takePictureOptions: any;
    cameraProps: any;
    actionTopStyle: any;
    actionBottomStyle: any;
    cameraStyle: any;
    containerStyle: any;
    TopActionComponent?: Component;
    TopActionProps: any;
    BottomActionComponent?: Component;
    BottomActionProps: any;
    onBack: (Result) => void;
    notAuthorizedText?: string;
    androidCameraPermissionOptions?: any;
    androidRecordAudioPermissionOptions?: any;
    getOperationTips ?: (disableRecording: boolean, disableTakingPicture: boolean) => string;
}
"use client";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import Hls from "hls.js";

interface Props extends React.HTMLProps<HTMLVideoElement> {
    manifest: string;
}

const HLSPlayer = forwardRef<HTMLVideoElement, Props>(
    ({ manifest, ...props }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null);

        useImperativeHandle(ref, () => videoRef.current!);

        useEffect(() => {
        const { current: video } = videoRef;
        if (!video) return;

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = manifest;
            return;
        }

        if (Hls.isSupported()) {
            const hls: Hls = new Hls();
            hls.loadSource(manifest);
            hls.attachMedia(video);

            return () => {
            hls.destroy();
            };
        }
        }, [manifest]);

        return <video {...props} ref={videoRef} />;
    }
);

HLSPlayer.displayName = "HLSPlayer";

export default HLSPlayer;
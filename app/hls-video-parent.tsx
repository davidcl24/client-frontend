"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Suspense, useEffect, useState } from "react";

const HLSPlayer = dynamic(() => import("./hls-player"), {
  loading: () => <p>Loading video...</p>,
  ssr: false,
});

interface Props {
  manifest: string;
  thumbnailMobile: string;
  thumbnailDesktop: string;
  className?: string; 
}

const VideoFallback = ({ thumbnailMobile, thumbnailDesktop }: Props) => (
  <>
    <div className="video-fallback rounded-lg w-full aspect-video object-contain relative z-10" />
    <style jsx>{`
      @media screen and (max-width: 600px) {
        .video-fallback {
          background-image: url(${thumbnailMobile});
          background-size: cover;
          background-position: center;
        }
      }
      @media screen and (min-width: 601px) {
        .video-fallback {
          background-image: url(${thumbnailDesktop});
          background-size: cover;
          background-position: center;
        }
      }
    `}</style>
  </>
);

const HLSVideo: React.FC<Props> = ({ manifest, thumbnailMobile, thumbnailDesktop }) => {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!video) return;
    const mq = window.matchMedia("(max-width: 600px)");
    video.poster = mq.matches ? thumbnailMobile : thumbnailDesktop;
  }, [video, thumbnailMobile, thumbnailDesktop]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="http://localhost:8080" />
        <link
          rel="preload"
          href={thumbnailMobile}
          as="image"
          type="image/jpeg"
          media="(max-width: 600px)"
        />
        <link
          rel="preload"
          href={thumbnailDesktop}
          as="image"
          type="image/jpeg"
          media="(min-width: 601px)"
        />
      </Head>

      <div className="h-full aspect-video relative">
        <Suspense fallback={<VideoFallback thumbnailMobile={thumbnailMobile} thumbnailDesktop={thumbnailDesktop} manifest={manifest} />}>
          <HLSPlayer
            className="rounded-lg w-full aspect-video object-contain relative z-10"
            playsInline
            controls
            manifest={manifest}
            ref={setVideo}
          />
        </Suspense>
      </div>
    </>
  );
};

export default HLSVideo;

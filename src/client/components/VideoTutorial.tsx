import React from "react";

export function VideoTutorial(props: { src: string}) {
    return <iframe
        className="w-full aspect-video max-h-[330px] max-w-[580px]"
        src="https://www.youtube.com/embed/UyLIi-TbcFc?si=r8aDawI_82_npeO8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
    />;
}
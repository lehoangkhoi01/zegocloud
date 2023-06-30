import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const customLabels = {
  participant: "Thành viên",
  roomMembers: "Thành viên",
  chatting: "Trò chuyện",
  muteAudio: "Tắt",
  unmuteAudio: "tắt",
  muteVideo: "tắt",
  unmuteVideo: "Tắt",
};

const CustomZegoUIKitPrebuilt = ({ customLabels }) => {
  return (
    <>
      {/* Render the ZegoUIKitPrebuilt component */}
      <ZegoUIKitPrebuilt />

      {/* Override text labels */}
      <style>
        {`
          .participant-label::before {
            content: "${customLabels.participant}";
          }

          .participants-label::before {
            content: "${customLabels.participants}";
          }

          .chatting-label::before {
            content: "${customLabels.chatting}";
          }

          .mute-audio-label::before {
            content: "${customLabels.muteAudio}";
          }

          .unmute-audio-label::before {
            content: "${customLabels.unmuteAudio}";
          }

          .mute-video-label::before {
            content: "${customLabels.muteVideo}";
          }

          .unmute-video-label::before {
            content: "${customLabels.unmuteVideo}";
          }
        `}
      </style>
    </>
  );
};

const RoomTest = () => {
  const { roomID } = useParams();
  const meetingRef = useRef(null);

  const joinRoom = async () => {
    const appID = 946219318;
    const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Le Hoang Khoi"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: meetingRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      showPreJoinView: false,
      // showTextChat: false,
      // showUserList: false,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      roomTimerDisplayed: true,
    });
  };

  joinRoom();

  useEffect(() => {
    const containerElement = meetingRef.current;

    // Apply custom color theme
    if (meetingRef) {
      console.log(meetingRef);
      // meetingRef.style.backgroundColor = "blue";
      // meetingRef.style.color = "white";
    }
  }, []);

  return (
    <div>
      <div ref={meetingRef} style={{ width: "100vw", height: "100vh" }}>
        {/* <CustomZegoUIKitPrebuilt customLabels={customLabels} /> */}
      </div>
    </div>
  );
};

export default RoomTest;

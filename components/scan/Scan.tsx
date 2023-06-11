import React, { Suspense, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Float, Html, PositionalAudio } from "@react-three/drei";
import { Audio } from "three";

interface ScanProps {
  id: string;
  filePath: string;
  position: number[];
  props: any;
  float: boolean;
  audioURL: string;
  inFocus: boolean;
}
export default function Scan({
  id,
  filePath,
  position,
  props,
  float,
  audioURL,
  inFocus = false,
}: ScanProps) {
  const gltf = useLoader(GLTFLoader, filePath);
  const audioRef = useRef<Audio>();
  const [audioPlaying, setAudioPlaying] = useState(false);

  function handleClick() {
    setAudioPlaying(!audioPlaying);
    if (inFocus && audioRef.current) {
      console.log("id: ", id, ", audio: ", audioURL, audioPlaying);
    }
  }

  function handlePlay() {
    audioRef.current?.play();
    console.log("play", audioRef.current);
  }
  function handlePause() {
    console.log("pause");

    audioRef.current?.pause();
  }
  function handleStop() {
    console.log("stop");

    audioRef.current?.stop();
  }

  var playButton = document.getElementById("play");
  playButton?.addEventListener("click", handlePlay);

  var pauseBotton = document.getElementById("pause");
  pauseBotton?.addEventListener("click", handlePause);

  var stopButton = document.getElementById("stop");
  stopButton?.addEventListener("click", handleStop);

  return (
    <>
      <Suspense>
        {float ? (
          <Float
            position={[1, 1.1, -0.5]}
            rotation={[Math.PI / 3.5, 0, 0]}
            rotationIntensity={1.5}
            floatIntensity={1}
            speed={1}
          >
            <mesh {...props} receiveShadow castShadow>
              <primitive
                object={gltf.scene}
                position={position}
                children-0-castShadow
              />
            </mesh>
          </Float>
        ) : (
          <>
            <group>
              <mesh
                {...props}
                receiveShadow
                castShadow
                onClick={() => handleClick()}
              >
                <primitive
                  object={gltf.scene}
                  position={position}
                  children-0-castShadow
                />

                {/* {audioPlaying && ( */}
                <>
                  <PositionalAudio
                    url={audioURL}
                    distance={8}
                    {...props}
                    // autoplay
                    setVolume={1}
                    position={position}
                    hasPlaybackControl
                    loop={false}
                    ref={audioRef}
                  />
                </>
                {/* )} */}
              </mesh>
            </group>
            {/* <group>
              <mesh>
                <Html
                  itemID="play"
                  transform
                  distanceFactor={10}
                  position={[position[0] - 3, position[1] - 1, position[2]]}
                  style={{ width: "200px", color: "white", cursor: "pointer" }}
                >
                  Play
                </Html>

                <Html
                  itemID="pause"
                  transform
                  distanceFactor={10}
                  position={[position[0] - 3, position[1], position[2]]}
                  style={{ width: "200px", color: "blue", cursor: "pointer" }}
                  // onClick={() => handlePause()}
                >
                  Pause
                </Html>
              </mesh>
            </group> */}
          </>
        )}
      </Suspense>
    </>
  );
}

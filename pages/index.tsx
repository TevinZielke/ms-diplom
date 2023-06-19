/* eslint-disable react/no-children-prop */
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { Canvas } from "@react-three/fiber";
import Scan from "@/components/scan/Scan";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
import classNames from "classnames";

var scanPosition: number = 0;
var scanPositions: number[][] = [
  [0, -15, 0],
  [0, 15, 0],
  [15, 0, 0],
  [-15, 0, 0],
  [0, 0, 15],
  [0, 0, -15],
];
const camPosition: number[] = [0, 0, 0];

export default function Home() {
  const [focusIterator, setFocusIterator] = useState(0);
  // var focusIterator = 0;
  const [camPos, setCamPos] = useState(camPosition);

  function repositionCam(currentPos: number) {
    let pos = ((focusIterator + currentPos) % 5) + 1;

    return pos;
  }

  useEffect(() => {
    if (typeof window === "object") {
      var fi = focusIterator;
      document.onkeydown = (e) => {
        console.log("key", e);

        switch (e.code) {
          case "ArrowLeft":
            handleStop();
            // setFocusIterator(focusIterator - 1);
            fi = -1;
            break;
          case "ArrowRight":
            handleStop();
            // setFocusIterator(focusIterator + 1);
            fi = +1;
            break;
        }
        // if (focusIterator < 0) focusIterator = 0;
        // if (focusIterator > 5) focusIterator = 5;
        if (fi < 0) setFocusIterator(0);
        if (fi > 5) setFocusIterator(5);
        if (fi >= 0 && fi <= 5) setFocusIterator(fi);

        var scanPosition = scanPositions[focusIterator];
        scanPosition[0] += camPos[0];
        scanPosition[1] += camPos[1];
        scanPosition[2] += camPos[2];
        // setCamPos(scanPosition);
      };
    }
  });

  const audioRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    audioRef.current?.play();
  }
  function handlePause() {
    audioRef.current?.pause();
  }
  function handleStop() {
    audioRef.current?.pause();
    audioRef.current!.currentTime = 0;
  }

  const [room, setRoom] = useState("Dach");

  useEffect(() => {
    switch (focusIterator) {
      case 0: {
        setRoom("Dach");
        break;
      }
      case 1: {
        setRoom("Flur");
        break;
      }
      case 2: {
        setRoom("Küche");
        break;
      }
      case 3: {
        setRoom("Parkplatz");
        break;
      }
      case 4: {
        setRoom("Polizeirevier");
        break;
      }
      case 5: {
        setRoom("Wohnzimmer");
        break;
      }
      default: {
        setRoom("Dach");
        break;
      }
    }
  }, [focusIterator]);

  const [pageProgress, setPageProgress] = useState(0);
  const [showIntroGif, setShowIntroGif] = useState(true);
  const [showIntroText, setShowIntroText] = useState(false);
  const [showIntroParagraphOne, setShowIntroParagraphOne] = useState(false);
  const [showIntroParagraphTwo, setShowIntroParagraphTwo] = useState(false);
  const [showIntroParagraphThree, setShowIntroParagraphThree] = useState(false);
  const [showIntroParagraphFour, setShowIntroParagraphFour] = useState(false);
  const [showIntroParagraphFive, setShowIntroParagraphFive] = useState(false);
  const [showInstructionText, setShowInstructionText] = useState(false);
  const [showContentWarning, setShowContentWarning] = useState(false);
  const [showScene, setShowScene] = useState(false);

  // 0 - GIF
  // 1 - IntroParagraph 1
  // 2 - IntroParagraph 2
  // 3 - IntroParagraph 3
  // 4 - IntroParagraph 4
  // 5 - IntroParagraph 5
  // 6 - Instructions
  // 7 - ContentWarning
  // 8 - Scene

  useEffect(() => {
    switch (pageProgress) {
      case 0: {
        setShowIntroGif(true);
        setShowIntroText(false);
        setShowIntroParagraphOne(false);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 1: {
        setShowIntroGif(false);
        setShowIntroText(true);
        setShowIntroParagraphOne(true);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 2: {
        setShowIntroGif(false);
        setShowIntroText(true);
        setShowIntroParagraphOne(true);
        setShowIntroParagraphTwo(true);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 3: {
        setShowIntroGif(false);
        setShowIntroText(true);
        setShowIntroParagraphOne(true);
        setShowIntroParagraphTwo(true);
        setShowIntroParagraphThree(true);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 4: {
        setShowIntroGif(false);
        setShowIntroText(true);
        setShowIntroParagraphOne(true);
        setShowIntroParagraphTwo(true);
        setShowIntroParagraphThree(true);
        setShowIntroParagraphFour(true);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 5: {
        setShowIntroGif(false);
        setShowIntroText(true);
        setShowIntroParagraphOne(true);
        setShowIntroParagraphTwo(true);
        setShowIntroParagraphThree(true);
        setShowIntroParagraphFour(true);
        setShowIntroParagraphFive(true);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 6: {
        setShowIntroGif(false);
        setShowIntroText(false);
        setShowIntroParagraphOne(false);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(true);
        setShowContentWarning(false);
        setShowScene(false);
        break;
      }
      case 7: {
        setShowIntroGif(false);
        setShowIntroText(false);
        setShowIntroParagraphOne(false);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(true);
        setShowScene(false);
        break;
      }
      case 8: {
        setShowIntroGif(false);
        setShowIntroText(false);
        setShowIntroParagraphOne(false);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(true);
        break;
      }
      default: {
        setShowIntroGif(true);
        setShowIntroText(false);
        setShowIntroParagraphOne(false);
        setShowIntroParagraphTwo(false);
        setShowIntroParagraphThree(false);
        setShowIntroParagraphFour(false);
        setShowIntroParagraphFive(false);
        setShowInstructionText(false);
        setShowContentWarning(false);
        setShowScene(false);
      }
    }
  }, [pageProgress]);

  function Loading() {
    return (
      <div className={styles.loading}>
        <p>
          Loading
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      </div>
    );
  }

  function IntroText() {
    return (
      <div
        className={classNames(styles["intro__text"], {
          [styles["intro__text--hidden"]]: !showIntroText,
        })}
      >
        <p
          className={classNames(styles["intro__text__paragraph"], {
            [styles["intro__text__paragraph--hidden"]]: !showIntroParagraphOne,
          })}
        >
          February 8th, 2018 This is my stepfather Bernd. These selfies were
          taken from the 7th of February 2015 till the 25th of January 2018, two
          weeks before he died.
          {/* <span
            className={classNames({
              [styles["intro__text__paragraph__dot"]]: pageProgress === 1,
            })}
          >
            .
          </span> */}
        </p>
        <p
          className={classNames(styles["intro__text__paragraph"], {
            [styles["intro__text__paragraph--hidden"]]: !showIntroParagraphTwo,
          })}
        >
          My Mother found the pictures on his phone after the police confiscate
          it and gave it to us. We can only assume why he took these pictures of
          himself but will never know the purpose of them since he never used
          them for anything else. The following experience shows my memories of
          the day my stepfather Bernd passed away, which significantly shaped my
          relationship with death. After struggling with depression for years,
          Bernd decided to take his own life on February 8th, 2018. I am not
          religious but when a pastor visited our house after Bernd’s death and
          described the depressions as a kind of tumour it helped me and my
          family a lot. Sometimes you can cure them but sometimes they are
          incurable. My memories of that day are tied to places that have since
          become charged with them. To visualize these memories, I returned to
          these places and 3D scanned them. The resulting fragmentary images are
          analogous to my own fragmented memories of these places.
          {/* <span
            className={classNames({
              [styles["intro__text__paragraph__dot"]]: pageProgress === 2,
            })}
          >
            .
          </span> */}
        </p>
        <p
          className={classNames(styles["intro__text__paragraph"], {
            [styles["intro__text__paragraph--hidden"]]:
              !showIntroParagraphThree,
          })}
        >
          Visitors will have the opportunity to explore my memories. They will
          be able to navigate through a three-dimensional space, moving through
          the 3D scanned locations. The experience will be accompanied by sound
          elements, including recordings of my voice telling the stories behind
          these places.
          {/* <span
            className={classNames({
              [styles["intro__text__paragraph__dot"]]: pageProgress === 3,
            })}
          >
            .
          </span> */}
        </p>
        <p
          className={classNames(styles["intro__text__paragraph"], {
            [styles["intro__text__paragraph--hidden"]]: !showIntroParagraphFour,
          })}
        >
          I was suddenly confronted with death and dealing with grief and
          experienced the inability of a lot of people to talk about death and
          grief and to approach me as grieving person. I was in a phase of
          mourning and also thought about the ways I was mourning, was I ‘sad
          enough’? Did I suppress my grief in order to protect myself from
          uncomfortable emotions? Are there good and bad ways of grieving?
          Through these experiences I realized a strange distancing or tabooing
          of this topic. The work is aimed at question the taboo surrounding
          death. Whether it is a suicide or any other cause of death, death is a
          part of our lives and it is important to confront it.
          {/* <span
            className={classNames({
              [styles["intro__text__paragraph__dot"]]: pageProgress === 4,
            })}
          >
            .
          </span> */}
        </p>
        <p
          className={classNames(styles["intro__text__paragraph"], {
            [styles["intro__text__paragraph--hidden"]]: !showIntroParagraphFive,
          })}
        >
          The Website was realised in collaboration with my friend Tevin Zielke.
          {/* <span
            className={classNames({
              [styles["intro__text__paragraph__dot"]]: pageProgress === 5,
            })}
          >
            .
          </span> */}
        </p>
      </div>
    );
  }

  function Instructions() {
    return (
      <div
        className={classNames(styles["intro__instructions"], {
          [styles["intro__instructions--hidden"]]: !showInstructionText,
        })}
      >
        <p>
          Use <span>arrow keys</span> to <span>change rooms</span>
        </p>
        <p>
          <span>Press and hold left mosue button </span>to
          <br />
          <span>through the room</span>
        </p>
        <p>
          Use <span>scroll wheel</span> to <span>zoom in and out</span>
        </p>
        <p>
          <span>Control audio</span> by{" "}
          <span>clicking Play, Pause or Stop</span>
        </p>
      </div>
    );
  }

  function ContentWarning() {
    return (
      <div
        className={classNames(styles["intro__content-warning"], {
          [styles["intro__content-warning--hidden"]]: !showContentWarning,
        })}
      >
        <span>
          Some viewers may be triggered, offended or scared by the
          <br /> memos of the memories
        </span>
      </div>
    );
  }

  function AudioPlayer() {
    return (
      <video
        className={styles["audio-player"]}
        ref={audioRef}
        src={`/audio/${room}.mp3`}
        muted
        // onTimeUpdate={onTimeUpdate}
      >
        <track
          className={styles.track}
          default
          kind="captions"
          src={`/captions/${room}.vtt`}
        />
      </video>
    );
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.intro}>
          <div
            className={classNames(styles["intro__gif"], {
              [styles["intro__gif--hidden"]]: pageProgress !== 0,
            })}
          >
            <Image
              src="/images/bernd_s_t.gif"
              alt="Bilder von Bernd in GIF Format."
              // quality={50}
              width={960}
              height={540}
            />
          </div>
          <IntroText />
          <Instructions />
          <ContentWarning />
        </div>

        <Suspense fallback={<Loading />}>
          <div
            className={classNames(styles["continue"], {
              [styles["continue--hidden"]]: pageProgress === 8,
            })}
            onClick={() => setPageProgress(pageProgress + 1)}
          >
            <p>Continue</p>
          </div>
          <div
            className={classNames(styles["scene-container"], {
              [styles["scene-container--hidden"]]: pageProgress !== 8,
            })}
          >
            <Canvas
              shadows
              className={styles.canvas}
              camera={{
                position: [camPos[0], camPos[1], camPos[2]],
              }}
            >
              <Scan
                id="dach"
                filePath="/scans/Dach_scan.glb"
                position={scanPositions[0]}
                // position={scanPositions[repositionScan(2)]}
                props={""}
                inFocus={focusIterator === 0 ? true : false}
                float={focusIterator === 0 ? false : true}
                audioURL="/audio/Dach.mp3"
              />
              <Scan
                id="flur"
                filePath="/scans/Flur_scan.glb"
                position={scanPositions[1]}
                props={""}
                inFocus={focusIterator === 1 ? true : false}
                float={focusIterator === 1 ? false : true}
                // audioURL={focusIterator === 1 ? "/audio/Flur.mp3" : ""}
                audioURL={"/audio/Flur.mp3"}
              />
              <Scan
                id="küche"
                filePath="/scans/Küche_scan.glb"
                position={scanPositions[2]}
                props={""}
                inFocus={focusIterator === 2 ? true : false}
                float={focusIterator === 2 ? false : true}
                audioURL={focusIterator === 2 ? "/audio/Küche.mp3" : ""}
              />
              <Scan
                id="parkplatz"
                filePath="/scans/Parkplatz_scan.glb"
                position={scanPositions[3]}
                props={""}
                inFocus={focusIterator === 3 ? true : false}
                float={focusIterator === 3 ? false : true}
                audioURL={focusIterator === 3 ? "/audio/Parkplatz.mp3" : ""}
              />
              <Scan
                id="polizeirevier"
                filePath="/scans/Polizeirevier_scan.glb"
                position={scanPositions[4]}
                props={""}
                inFocus={focusIterator === 4 ? true : false}
                float={focusIterator === 4 ? false : true}
                audioURL={focusIterator === 4 ? "/audio/Polizeirevier.mp3" : ""}
              />
              <Scan
                id="wohnzimmer"
                filePath="/scans/Wohnzimmer_scan.glb"
                position={scanPositions[5]}
                props={""}
                inFocus={focusIterator === 5}
                float={focusIterator === 5}
                audioURL={focusIterator === 5 ? "/audio/Wohnzimmer.mp3" : ""}
              />

              <OrbitControls
                // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
                target={scanPositions[focusIterator]}
                rotateSpeed={0.05}
                panSpeed={0.05}
                zoomSpeed={0.15}
              />
            </Canvas>
          </div>

          <div
            className={classNames(styles["audio-container"], {
              [styles["audio-container--hidden"]]: !showScene,
            })}
          >
            <div className={styles["audio-controls"]}>
              <div id="play" onClick={() => handlePlay()}>
                Play
              </div>
              <div id="pause" onClick={() => handlePause()}>
                Pause
              </div>
              <div id="stop" onClick={() => handleStop()}>
                Stop
              </div>
            </div>
            <AudioPlayer />
          </div>
        </Suspense>
      </main>
    </>
  );
}

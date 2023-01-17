import { useEffect, useState } from "react";
import YouTube from "react-youtube";

import {
  PauseIcon,
  PlayIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ExternalLinkIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  CogIcon,
} from "@heroicons/react/outline";

import { useMediaQuery } from "react-responsive";

const Player = ({ videoId, title }) => {
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const [full, setFull] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    var temp = document.getElementById("frame-cover").offsetWidth;
    setWidth(temp);
    document
      .getElementById("frame-cover")
      .addEventListener("fullscreenchange", (e) => {
        if (document.fullscreenElement == null) {
          setFull(false);
        }
      });
  }, [isPortrait, full]);

  const [player, setPlayer] = useState(null);
  const [paused, setPaused] = useState(true);
  const [mute, setMute] = useState(false);
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState();
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [intrvl, setIntrvl] = useState(null);
  const [rate, setRate] = useState(1);

  const onPlayerReady = (e) => {
    setPlayer(e.target);
    setDuration(e.target.getDuration());
    e.target.pauseVideo();

    setPaused(true);
    setVisible(false);
    setTime(0);
    setRate(1);

    if (intrvl != null) {
      clearInterval(intrvl);
      setIntrvl(null);
    }
  };
  return (
    <>
      <div id="frame-cover" className="relative m-auto">
        <YouTube
          videoId={videoId}
          onReady={onPlayerReady}
          opts={{
            playerVars: {
              autoplay: 0,
              controls: 0,
              rel: 0,
              loop: 1,
            },
            width: full ? screen.width : width,
            height: full ? screen.height : (width * 9) / 16,
          }}
        />
        <div
          className="group absolute top-0 flex h-full w-full"
          onMouseEnter={() => {
            if (timer !== null) {
              clearTimeout(timer);
            }
            setVisible(true);
            var temp = setTimeout(() => {
              setVisible(false);
              setTimer(null);
            }, 2500);
            setTimer(temp);
          }}
          onMouseLeave={() => {
            if (timer !== null) {
              clearTimeout(timer);
            }
            setVisible(false);
            setTimer(null);
          }}
          onMouseMove={() => {
            if (timer !== null) {
              clearTimeout(timer);
            }
            setVisible(true);
            var temp = setTimeout(() => {
              setVisible(false);
              setTimer(null);
            }, 2500);
            setTimer(temp);
          }}
        >
          <div
            className="absolute top-0 flex h-full w-full flex-col justify-end bg-neutral-800 transition-all"
            style={!visible ? { opacity: "0" } : { opacity: "80%" }}
          >
            <div className="absolute top-0 truncate p-4 max-w-[80vw] lg:max-w-[55vw] font-medium text-neutral-50 lg:text-xl">
              {title}
            </div>
            <div className="absolute flex h-full w-full items-center justify-between px-16">
              <button
                title="5 secs backward"
                className="h-8 w-8 text-neutral-50 transition-all"
                onClick={() => {
                  if (
                    player.getPlayerState() == -1 ||
                    player.getPlayerState() == 5
                  ) {
                    setPaused(false);
                    setIntrvl(
                      setInterval(() => {
                        setTime(player.getCurrentTime());
                      }, 100)
                    );
                  }

                  var temp = time - 5;
                  if (temp <= 0) {
                    setTime(0);
                    player.seekTo(0);
                  } else {
                    player.seekTo(temp.toFixed(2));
                  }
                }}
              >
                <ChevronDoubleLeftIcon />
              </button>
              <button
                className="h-12 w-12 text-neutral-50 transition-all"
                title={paused ? "Unpause" : "Pause"}
                onClick={() => {
                  if (
                    player.getPlayerState() == 5 ||
                    player.getPlayerState() == -1
                  ) {
                    setIntrvl(
                      setInterval(() => {
                        setTime(player.getCurrentTime());
                      }, 100)
                    );
                  }
                  if (paused) {
                    player.playVideo();
                    setPaused(false);
                  } else if (player.getPlayerState() == 1) {
                    player.pauseVideo();
                    setPaused(true);
                  }
                }}
              >
                {!paused ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                title="5 secs forward"
                className="h-8 w-8 text-neutral-50 transition-all"
                onClick={() => {
                  if (
                    player.getPlayerState() == -1 ||
                    player.getPlayerState() == 5
                  ) {
                    setPaused(false);
                    setIntrvl(
                      setInterval(() => {
                        setTime(player.getCurrentTime());
                      }, 100)
                    );
                  }
                  var temp = time + 5;
                  if (temp >= player.getDuration()) {
                    setTime(player.getDuration() - 5);
                    player.seekTo(player.getDuration() - 5);
                  } else {
                    player.seekTo(temp.toFixed(2));
                  }
                }}
              >
                <ChevronDoubleRightIcon />
              </button>
            </div>
            <div className="flex items-center justify-between py-1 md:py-2">
              <button
                title={mute ? "Unmute" : "Mute"}
                className="z-20 mx-2 h-6 w-6 text-neutral-50 transition-all lg:mx-4"
                onClick={() => {
                  if (mute) {
                    player.unMute();
                  } else {
                    player.mute();
                  }
                  setMute((arg) => !arg);
                }}
              >
                {mute ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </button>
              <div className="mr-1  text-[0.65rem] text-neutral-50 md:text-sm lg:mr-2">
                {Math.floor(time / 3600).toString().length == 1
                  ? "0" + Math.floor(time / 3600).toString()
                  : Math.floor(time / 3600)}
                :
                {(Math.floor(time / 60) % 60).toString().length == 1
                  ? "0" + (Math.floor(time / 60) % 60).toString()
                  : Math.floor(time / 60) % 60}
                :
                {Math.floor(time % 60).toString().length == 1
                  ? "0" + Math.floor(time % 60).toString()
                  : Math.floor(time % 60)}
              </div>
              <input
                id="seek"
                type="range"
                value={time}
                step="1"
                max={duration}
                onClick={() => {
                  if (
                    player.getPlayerState() == -1 ||
                    player.getPlayerState() == 5
                  ) {
                    setPaused(false);
                    setIntrvl(
                      setInterval(() => {
                        setTime(player.getCurrentTime());
                      }, 100)
                    );
                  }
                }}
                onChange={(e) => {
                  player.seekTo(parseInt(e.target.value));
                  setTime(parseInt(e.target.value));
                }}
              ></input>
              <div className="ml-1 text-[0.65rem] text-neutral-50 md:text-sm lg:ml-2">
                {Math.floor(duration / 3600).toString().length == 1
                  ? "0" + Math.floor(duration / 3600).toString()
                  : Math.floor(duration / 3600)}
                :
                {(Math.floor(duration / 60) % 60).toString().length == 1
                  ? "0" + (Math.floor(duration / 60) % 60).toString()
                  : Math.floor(duration / 60) % 60}
                :
                {Math.floor(duration % 60).toString().length == 1
                  ? "0" + Math.floor(duration % 60).toString()
                  : Math.floor(duration % 60)}
              </div>

              <select
                name="rate"
                id="rate-select"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  player.setPlaybackRate(parseInt(e.target.value));
                  //console.log(player.getAvailablePlaybackRates())
                }}
                className="z-20 mx-1 w-[2rem] bg-transparent text-center text-[0.6rem] text-neutral-50 transition-all md:text-[0.7rem] lg:mx-2 lg:w-[2.25rem]"
              >
                <option value="" disabled>
                  Choose Play Back Speed
                </option>
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((item, index) => (
                  <option value={item} key={index.toString()}>
                    {item} x
                  </option>
                ))}
              </select>
              <button
                className="z-20 mx-2 h-6 w-6 text-neutral-50 transition-all lg:mx-4"
                onClick={() => {
                  var iframe = document.getElementById("frame-cover");
                  var requestFullScreen =
                    iframe.requestFullScreen ||
                    iframe.mozRequestFullScreen ||
                    iframe.webkitRequestFullScreen;
                  if (requestFullScreen) {
                    requestFullScreen.bind(iframe)();
                    setFull(true);
                  }
                  if (full) {
                    document.exitFullscreen();
                    setFull(false);
                  }
                }}
              >
                <ExternalLinkIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;

import { useState, useRef } from "react";
import { Synth, Loop, Transport } from "tone";

const useAudio = () => {
  const [isLoaded, setLoaded] = useState(false);
  const synth = useRef(
    new Synth({
      envelope: {
        attack: 0.5,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8,
      },
    }).toDestination()
  );
  const loopA = useRef(
    new Loop((time) => {
      synth.current.triggerAttackRelease("C1", "4n", time);
    }, "2n")
  );

  const startTone = async () => {
    console.log("START TONE CALLED");
    loopA.current.start();
    if (!isLoaded) {
      setLoaded(true);
      Transport.start();
    }
  };
  const stopTone = async () => {
    loopA.current.stop();
  };
  return { synth, startTone, isLoaded, Transport, stopTone };
};

export default useAudio;

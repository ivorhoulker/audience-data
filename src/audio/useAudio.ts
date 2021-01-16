import { useState, useRef } from "react";
import {
  Synth,
  Loop,
  Transport,
  Chorus,
  Destination,
  JCReverb,
  Phaser,
} from "tone";

const useAudio = () => {
  const [isLoaded, setLoaded] = useState(false);

  const chorus = useRef(new Chorus(2, 2, 20));
  const reverb = useRef(new JCReverb(0.2));
  const phaser = useRef(new Phaser(0.5, 3, 350));
  const synth = useRef(
    new Synth({
      envelope: {
        attack: 0.5,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8,
      },
    })
      .chain(reverb.current)
      .chain(chorus.current)
      .chain(phaser.current)
      .toDestination()
  );
  const loopA = useRef(
    new Loop((time) => {
      synth.current.triggerAttackRelease("C2", "4n", time);
    }, "2n")
  );

  const startTone = async () => {
    console.log("START TONE CALLED");
    loopA.current.start();
    phaser.current.connect(Destination);

    chorus.current.connect(Destination);
    reverb.current.connect(Destination);
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

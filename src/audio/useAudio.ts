import { User } from "./../types/User";
import { Question } from "./../types/Question";
import { RootState } from "./../app/ReduxStore";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import React, { useState, useRef, useEffect } from "react";
import {
  Synth,
  Loop,
  Transport,
  Chorus,
  Destination,
  JCReverb,
  Phaser,
} from "tone";
import { useSelector } from "react-redux";
import Answer from "../types/Answer";

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
  //get user data to interact with
  const auth = useSelector<RootState>((state) => state.firebase.auth) as {
    uid: string;
  };

  const muted = useSelector<RootState>((state) => state.audio.muted);

  useEffect(() => {
    if (!muted) {
      startTone();
    } else {
      stopTone();
    }
    return () => {
      stopTone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted]);
  const questions = useSelector<RootState>(
    (state) => state.firestore.data.questions
  ) as Question[];
  const test = useFirestore();
  const answer = useSelector<RootState>(
    (state) => state.firestore.data.answers
  ) as Answer[];

  const user = useSelector<RootState>(
    (state) => state.firestore.data.users
  ) as User[];

  console.log("AUDIO DATA", answer, user, questions);

  return { synth, startTone, isLoaded, Transport, stopTone };
};

export default useAudio;

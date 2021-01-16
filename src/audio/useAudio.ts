import { User } from "./../types/User";
import { Question } from "./../types/Question";
import { RootState } from "./../app/ReduxStore";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import * as tone from "tone";
import { useSelector } from "react-redux";
import Answer from "../types/Answer";
import { calculateResults } from "../helpers/calculateResults";
import { clamp } from "../helpers/clamp";

const useAudio = () => {
  const [isLoaded, setLoaded] = useState(false);

  // const chorus = useRef(new Chorus(2, 2, 20));
  // const reverb = useRef(new JCReverb(0.2));
  // const phaser = useRef(new Phaser(0.5, 3, 350));
  const bassSynth = useRef<tone.Synth>();
  const liberalSynth = useRef<tone.Synth>();
  const communistSynth = useRef<tone.FMSynth>();
  const capitalistSynth = useRef<tone.MetalSynth>();
  // const loopA = useRef<tone.Loop>();
  const capitalistSequence = useRef(tone.Sequence);
  const liberalSequence = useRef<tone.Sequence>();
  const bassSequence = useRef<tone.Sequence>();
  const startTone = () => {
    if (!isLoaded) {
      setLoaded(true);
      tone.start();
      tone.Transport.start();
      //SYNTH CREATION
      initializeSynths();

      //DO NOT CREATE SEQUENCES AND LOOPS ON SHARED SYNTH: doing so gives a time error
      //SEQUENCES
      initializeSequnces();
      // route all audio through rever, filter and compressor
      const reverb = new tone.JCReverb(0.2);
      const lowpass = new tone.Filter(800, "lowpass");
      const compressor = new tone.Compressor(-18);
      tone.getDestination().chain(reverb, lowpass, compressor);
    }
    tone.getDestination().volume.rampTo(1);
  };
  const stopTone = async () => {
    // loopA.current?.stop();
    tone.getDestination().volume.rampTo(-Infinity);
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
    (state) => state.firestore.ordered.questions
  ) as Question[];
  const userAnswers = useSelector<RootState>(
    (state) => state.firestore.data?.answers?.[auth.uid] ?? {}
  ) as Answer;
  const user = useSelector<RootState>((state) => {
    return state.firestore.data?.users?.[auth.uid] ?? {};
  }) as User;

  const result = useMemo(() => {
    try {
      return calculateResults(questions, userAnswers);
    } catch (err) {
      return null;
    }
  }, [questions, userAnswers]);

  const [prevEcon, setPrevEcon] = useState(50);
  useEffect(() => {
    if (result && !muted) {
      // if (loopA.current && economicsN > 0.5) {
      //   loopA.current && loopA.current.stop();
      // } else {
      //   loopA.current && loopA.current.start();
      // }

      if (liberalSequence.current && result.economics > 50) {
        liberalSequence.current.clear().dispose();
        liberalSequence.current = new tone.Sequence(
          (time, note) => {
            capitalistSynth.current?.triggerAttackRelease(note, 0.1, time, 0.4);
          },
          ["C4", ["Eb4", "D4", "Eb4"], "G4", ["A4", "G4"]],
          "2n"
        );
        liberalSequence.current.start();
        // liberalSynth.current?.volume.rampTo(-Infinity, 10);
      } else if (liberalSequence.current) {
        liberalSequence.current.clear().dispose();

        // liberalSynth.current?.volume.rampTo(1, 1);
      }
      // loopA.current.dispose();
      // loopA.current = new Loop((time) => {
      //   synth.current.triggerAttackRelease(note, "4n", time);
      // }, "2n");
      // loopA.current.start();
    }
  }, [result, muted]);

  const initializeSynths = () => {
    bassSynth.current = new tone.Synth({
      envelope: {
        attack: 0.5,
        decay: 0.2,
        sustain: 0.5,
        release: 0.8,
      },
    }).toDestination();
    liberalSynth.current = new tone.Synth({
      envelope: {
        attack: 0.3,
        decay: 0.2,
        sustain: 0.1,
        release: 0.8,
      },
    }).toDestination();
    communistSynth.current = new tone.FMSynth({
      envelope: {
        attack: 0.3,
        decay: 0.2,
        sustain: 0.1,
        release: 0.8,
      },
    }).toDestination();
    capitalistSynth.current = new tone.MetalSynth({
      envelope: {
        attack: 0.3,
        decay: 0.2,
        sustain: 0.1,
        release: 0.8,
      },
    }).toDestination();
  };

  const initializeSequnces = () => {
    bassSequence.current = new tone.Sequence(
      (time, note) => {
        bassSynth.current?.triggerAttackRelease(note, 0.5, time);
      },
      ["C2", "G1", "C2", "A#1", "C2", "G1", "C2", ["A#1", "B1"]],
      "1n"
    );
    bassSequence.current.humanize = true;
    bassSequence.current.start();

    liberalSequence.current = new tone.Sequence(
      (time, note) => {
        liberalSynth.current?.triggerAttackRelease(note, 0.1, time, 0.4);
      },
      ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]],
      "2n"
    );
    liberalSequence.current.humanize = true;
    liberalSequence.current.start();
  };

  return { synth: bassSynth, startTone, isLoaded, stopTone };
};

export default useAudio;

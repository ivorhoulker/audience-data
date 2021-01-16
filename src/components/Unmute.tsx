import React, { useState, useEffect } from "react";
import useAudio from "../audio/useAudio";
import Button from "./Button";
import { unmute, mute } from "../audio/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/ReduxStore";

interface Props {}

const Unmute: React.FC<Props> = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const muted = useSelector<RootState>((state) => state.audio.muted);

  const handleUnmute = () => {
    if (muted) {
      dispatch(unmute());
    } else {
      dispatch(mute());
    }
  };
  return (
    <>
      <li className={""}>
        <Button onClick={handleUnmute}>{muted ? "Unmute" : "Mute"}</Button>
      </li>
    </>
  );
};

export default Unmute;

import React from "react";
import { unmute, mute } from "../audio/audioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/ReduxStore";

interface Props {}

const Unmute: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch();
  const muted = useSelector<RootState>((state) => state.audio.muted);

  const handleUnmute = () => {
    if (muted) {
      dispatch(unmute());
    } else {
      dispatch(mute());
    }
  };
  const cls = () => {
    let output =
      "focus:outline-none text-gray-400 active:outline-none py-1 px-3 rounded font-bold hover:text-green-400 transition ease-in duration-150 ";
    if (!muted) {
      output += " text-green-500";
    }
    return output;
  };
  return (
    <>
      <button className={cls()} onClick={handleUnmute}>
        {muted ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipRule="evenodd"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            ></path>
          </svg>
        )}
      </button>
    </>
  );
};

export default Unmute;

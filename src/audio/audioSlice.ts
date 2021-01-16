import { createSlice } from "@reduxjs/toolkit";

export interface AudioState {
  muted: boolean;
}

const initialState = { muted: true } as AudioState;
const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    unmute(state) {
      state.muted = false;
      console.log("muted changed", state.muted);
    },
    mute(state) {
      state.muted = true;
      console.log("muted changed", state.muted);
    },
  },
});

export const { unmute, mute } = audioSlice.actions;
export default audioSlice;

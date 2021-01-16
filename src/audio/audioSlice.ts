import { createSlice } from "@reduxjs/toolkit";

export interface AudioState {
  muted: boolean;
}

const initialState: AudioState = { muted: true };

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    unmute(state) {
      state.muted = false;
    },
    mute(state) {
      state.muted = true;
    },
  },
});

export const { unmute, mute } = audioSlice.actions;
export default audioSlice;

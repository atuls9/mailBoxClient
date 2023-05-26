import { createSlice } from "@reduxjs/toolkit";

const initialReceivedState = {
  receivedMails: [],
  read: [],
};

const receivedSlice = createSlice({
  name: "received",
  initialState: initialReceivedState,
  reducers: {
    getReceivedMail(state, action) {
      if (!action.payload) {
        state.receivedMails = [];
      } else {
        state.receivedMails = [...action.payload];
      }

      console.log("state.receivedMails", state.receivedMails);
    },
    addEmail(state, action) {
      state.receivedMails = [...state.receivedMails, action.payload];
    },
    readMail(state, action) {
      let updatatedItem = [];
      for (let el of state.receivedMails) {
        if (el.id === action.payload.id) {
          updatatedItem.push(action.payload);
        } else {
          updatatedItem.push(el);
        }
      }
      state.receivedMails = [...updatatedItem];
    },
  },
});

export const receivedActions = receivedSlice.actions;

export default receivedSlice.reducer;

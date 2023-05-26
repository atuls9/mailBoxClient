import { createSlice } from "@reduxjs/toolkit";

const initialsentState = {
  sentMails: [],
};

const sentSlice = createSlice({
  name: "sent",
  initialState: initialsentState,
  reducers: {
    getSentMail(state, action) {
      if (!action.payload) {
        state.sentMails = [];
      } else {
        state.sentMails = [...action.payload];
      }

      console.log("state.sentMails", state.sentMails);
    },
    addEmail(state, action) {
      state.sentMails = [...state.sentMails, action.payload];
      console.log(" sent mails", state.sentMails);
    },
    removeEmail(state, action) {
      let updatedItems;
      updatedItems = state.sentMails.filter((el) => el.id !== action.payload);
      state.sentMails = [...updatedItems];
    },
  },
});

export const sentActions = sentSlice.actions;

export default sentSlice.reducer;

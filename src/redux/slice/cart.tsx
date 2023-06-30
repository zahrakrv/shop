import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  deliveryDate: string;
}

const initialState: CounterState = {
  // deliveryDate: '',
};
export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    FORM: (state, action) => {
      const { type, date } = action.payload;
      console.log(action.payload);
      if (type === 'RESET_CART') {
        state.deliveryDate = '';
      } else {
        state.deliveryDate = date;
      }
      // console.log(action.payload.deliveryDate);
    },
  },
});

// Action creators are generated for each case reducer function
export const { FORM } = cartSlice.actions;

export default cartSlice.reducer;

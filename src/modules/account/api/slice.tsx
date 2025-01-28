import {createSlice} from '@reduxjs/toolkit';

export const accoutSlice = createSlice({
  name: 'account',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {setLoading, setData, setError} = accoutSlice.actions;
export default accoutSlice.reducer;

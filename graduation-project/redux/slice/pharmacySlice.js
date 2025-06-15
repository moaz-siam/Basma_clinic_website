import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pharmacy: null,
  isLoading: true,
  isError: null,
};

export const get_prescriptions = createAsyncThunk(
  "/dashbboard/pharmacy/prescriptions",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/pharmacy/prescriptions`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);

export const get_prescriptions_details = createAsyncThunk(
  "/dashbboard/pharmacy/get_prescriptions_details",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/pharmacy/prescription_details/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);
export const add_order_status = createAsyncThunk(
  "/dashbboard/pharmacy/add_order_status",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/pharmacy/add_order_status`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);

export const get_order_details = createAsyncThunk(
  "/dashbboard/pharmacy/get_order_details",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/pharmacy/order_details/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);

export const uploadInvoice = createAsyncThunk(
  "/dashbboard/pharmacy/uploadInvoice",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/pharmacy/uploadInvoice`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);

export const pharmacySlice = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    rest: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(get_prescriptions.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(get_prescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pharmacy = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_prescriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.pharmacy = null;
      }),
      builder.addCase(get_prescriptions_details.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_prescriptions_details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pharmacy = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_prescriptions_details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.pharmacy = null;
      }),
      builder.addCase(add_order_status.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(add_order_status.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.pharmacy = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(add_order_status.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.pharmacy = null;
      }),
      builder.addCase(get_order_details.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_order_details.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pharmacy = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_order_details.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        state.pharmacy = null;
      }),
      builder.addCase(uploadInvoice.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(uploadInvoice.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.pharmacy = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(uploadInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
        // state.pharmacy = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { rest } = pharmacySlice.actions;

export default pharmacySlice.reducer;

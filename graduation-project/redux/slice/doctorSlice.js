import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  doctor: null,
  isLoading: true,
  isError: null,
};

export const get_Consultations_Doctor = createAsyncThunk(
  "/dashbboard/doctor/consultations",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/doctor/consultations`,
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

export const get_ConsultationId_doctor = createAsyncThunk(
  "/dashbboard/doctor/consultationId",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/doctor/consultation/${id}`,
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
export const get_Medicines = createAsyncThunk(
  "/dashbboard/doctor/getMedicines",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/doctor/medicines`,
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
export const consultation_replie = createAsyncThunk(
  "/dashbboard/doctor/consultation_replie",
  async (formDate) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/doctor/consultation_replie`,
        formDate,
        {
          withCredentials: true,
          // headers: {
          //   "Content-Type": "application/json",
          // },
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
export const get_Consultations_Doc_detiles = createAsyncThunk(
  "/dashbboard/doctor/consultation_detiles",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/doctor/consultation_detiles/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // (response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
);
export const appointment_status_doc = createAsyncThunk(
  "/dashbboard/doctor/appointment_status_doc",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/doctor/appointment_status`,
        formData,
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
export const Reschedule_Doc = createAsyncThunk(
  "/dashbboard/doctor/reschedule",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/doctor/reschedule`,
        formData,
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
export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    rest: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(get_Consultations_Doctor.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(get_Consultations_Doctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctor = action.payload.success ? action.payload.data : null;
      }),
      builder.addCase(get_Consultations_Doctor.rejected, (state, action) => {
        state.isLoading = false;
        state.doctor = null;
      }),
      builder.addCase(get_ConsultationId_doctor.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_ConsultationId_doctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctor = action.payload.success ? action.payload.data : null;
        state.isError = null;
      }),
      builder.addCase(get_ConsultationId_doctor.rejected, (state, action) => {
        state.isLoading = false;
        state.doctor = null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_Medicines.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_Medicines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_Medicines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(consultation_replie.pending, (state, action) => {}),
      builder.addCase(consultation_replie.fulfilled, (state, action) => {
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(consultation_replie.rejected, (state, action) => {
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(
        get_Consultations_Doc_detiles.pending,
        (state, action) => {
          state.isLoading = true;
        }
      ),
      builder.addCase(
        get_Consultations_Doc_detiles.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.doctor = action.payload.success ? action.payload.data : null;
          state.isError = action.payload.success
            ? null
            : action.payload.message;
        }
      ),
      builder.addCase(
        get_Consultations_Doc_detiles.rejected,
        (state, action) => {
          state.isLoading = false;
          state.doctor = null;
          state.isError = action.payload.success
            ? null
            : action.payload.message;
        }
      ),
      builder.addCase(appointment_status_doc.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(appointment_status_doc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(appointment_status_doc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(Reschedule_Doc.pending, (state, action) => {
        // state.isLoading = true;
      }),
      builder.addCase(Reschedule_Doc.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(Reschedule_Doc.rejected, (state, action) => {
        // state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { rest } = doctorSlice.actions;

export default doctorSlice.reducer;

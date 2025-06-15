import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patient: null,
  medical_points: null,
  isLoading: true,
  isError: null,
};

export const getDoctors = createAsyncThunk("/dashbpard/doctors", async () => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/dashboard/patient/getdoctors`,
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
});
export const getConsultations = createAsyncThunk(
  "/dashbboard/consultations",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/consultations`,
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
export const consultation_create = createAsyncThunk(
  "/dashbpard/consultation_create",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/patient/consultation_create`,
        formData,
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
export const symptom_analyst = createAsyncThunk(
  "/dashbpard/symptom_analyst",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/symptom-analyst`,
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

export const getConsultationId = createAsyncThunk(
  "/dashbboard/getConsultationId",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/consultation/${id}`,
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
export const Book_appointment = createAsyncThunk(
  "/dashbboard/book_appointment",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/patient/book_appointment`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      ;

      return response.data;
    } catch (error) {
      

      if (error.response) {
        

        return error.response.data;
      }
    }
  }
);
export const get_medical_points = createAsyncThunk(
  "/dashbboard/get_medical_points",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/medical_points`,
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
export const get_medicines = createAsyncThunk(
  "/dashbboard/get_medicines",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/get_medicines`,
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
export const add_order = createAsyncThunk(
  "/dashbboard/add_order",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/patient/add_order`,
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
export const get_patient_medical_points = createAsyncThunk(
  "/dashbboard/patient_medical_points",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/patient_medical_points`,
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
export const add_medical_points = createAsyncThunk(
  "/dashbboard/add_medical_points",
  async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/dashboard/patient/add_medical_points`,
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
export const get_status_prescriptions = createAsyncThunk(
  "/dashbboard/status_prescriptions",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/dashboard/patient/status_prescriptions`,
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

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    rest: (state, actions) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctors.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload.success ? action.payload.data : null;
      }),
      builder.addCase(getDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.patient = null;
      }),
      builder.addCase(consultation_create.pending, (state, action) => {
        state.isError = null;
      }),
      builder.addCase(consultation_create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      }),
      builder.addCase(consultation_create.rejected, (state, action) => {
        state.isError = action?.payload?.success
          ? null
          : action?.payload?.message;
      }),
      builder.addCase(getConsultations.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getConsultations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload.success ? action.payload.data : null;
      }),
      builder.addCase(getConsultations.rejected, (state, action) => {
        state.isLoading = false;
        state.patient = null;
      }),
      builder.addCase(getConsultationId.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getConsultationId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patient = action.payload.success ? action.payload.data : null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(getConsultationId.rejected, (state, action) => {
        state.isLoading = false;
        state.patient = null;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(symptom_analyst.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(symptom_analyst.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(symptom_analyst.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(Book_appointment.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(Book_appointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(Book_appointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_medical_points.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_medical_points.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_medical_points.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_medicines.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_medicines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_medicines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      }),
      builder.addCase(add_order.pending, (state, action) => {}),
      builder.addCase(add_order.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      }),
      builder.addCase(add_order.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_patient_medical_points.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_patient_medical_points.fulfilled, (state, action) => {
        state.isLoading = false;
        state.medical_points = action.payload.success
          ? action.payload.data
          : null;
        state.isError = null;
      }),
      builder.addCase(get_patient_medical_points.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(add_medical_points.pending, (state, action) => {}),
      builder.addCase(add_medical_points.fulfilled, (state, action) => {
        state.isError = null;
      }),
      builder.addCase(add_medical_points.rejected, (state, action) => {
        state.isError = action.payload.success ? null : action.payload.message;
      }),
      builder.addCase(get_status_prescriptions.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(get_status_prescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
      }),
      builder.addCase(get_status_prescriptions.rejected, (state, action) => {
        state.isLoading = true;
        state.isError = action.payload.success ? null : action.payload.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { rest } = patientSlice.actions;

export default patientSlice.reducer;

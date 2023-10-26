import { AxiosLogged } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";

export const estadisticasGet = createAsyncThunk(
  "user/estadisticas",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `/estadisticas`
      );

      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const prestacionesGet = createAsyncThunk(
  "user/prestaciones",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `ayudas_prestaciones/3&2023`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const gruposGet = createAsyncThunk(
  "user/grupos",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `cantidad_grupo_familiares`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data[0];
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const intervencionesGet = createAsyncThunk(
  "user/intervenciones",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `intervenciones_familiares/3&2023`
      );
      //@ts-ignore
      //@ts-ignore
      return response.data[0];
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);
/* 
export const changePass = createAsyncThunk(
  "user/changePassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosRequest.put("/api/security/change/password", data);
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
);

export const changeProfileImage = createAsyncThunk(
  "user/changeProfileImage",
  async (data: any, { rejectWithValue }) => {
    try {
      const image = `data:image/jpg;base64,${data.base64}`;
      console.log(image);
      const response: any = await AxiosRequest.post("/api/user/profile_picture", { file: image });
      console.log('funciono');
      //@ts-ignore
      return response.data;
    } catch (error: any) {
      console.log(error, "falle aqui");
      return rejectWithValue(error.response.data);
    }
  }
); */

interface Pros {
  loading: boolean;
  personasregistradas: number;
  gruposfamiliares: number;
  intervenciones: number;
  prestacionesregistradas: any;
  servicios?: number;
  choferes?: number;
  empresas?: number;
  movimientos?: number;

  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
}

const initialState: Pros = {
  loading: false,
  personasregistradas: 0,
  gruposfamiliares: 0,
  intervenciones: 0,
  servicios: 0,
  choferes: 0,
  empresas: 0,
  movimientos: 0,
  prestacionesregistradas: [],
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
};

const inicioSlice = createSlice({
  name: "inicio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(estadisticasGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(estadisticasGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.servicios = payload.servicios;
      state.empresas = payload.empresas;
      state.choferes = payload.choferes;
      state.movimientos = payload.movimientos;

    });
    builder.addCase(estadisticasGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(intervencionesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(intervencionesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.intervenciones = payload.Intervisiones;
    });
    builder.addCase(intervencionesGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(prestacionesGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(prestacionesGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.prestacionesregistradas = payload;
    });
    builder.addCase(prestacionesGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(gruposGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gruposGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.gruposfamiliares = payload.CGF;
    });
    builder.addCase(gruposGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
  },
});

export default inicioSlice.reducer;

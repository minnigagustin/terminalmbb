import { AxiosLogged } from "@component/configs/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Image, UserResponse } from "../../interfaces/Use-interface";
//import { AxiosRequest } from "../../../helpers/axiosInstance";
//import { Profile } from "../../interfaces/data-interface";
import axios from "axios";



export const getEmpresas = createAsyncThunk(
  "user/getEmpresas",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `empresas/`
      );
      //@ts-ignore
      //@ts-ignore
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const getUsersDireccion = createAsyncThunk(
  "user/getUsersDireccion",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `consulta_beneficiario_codigo_calle/${data}`
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

export const getUsersNombre = createAsyncThunk(
  "user/getUsersNombre",
  async (data: any, { rejectWithValue }) => {
    try {
      if (data.nombre !== "" && data.apellido !== "") {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/an/${data.apellido}/${data.nombre}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      } else if (data.nombre !== "" && data.apellido === "") {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/nombre/${data.nombre}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      } else {
        const response: any = await AxiosLogged.get(
          `consulta_beneficiario_apellido_nombre/apellido/${data.apellido}`
        );
        //@ts-ignore
        //@ts-ignore
        return response.data;
      }
    } catch (error: any) {
      console.log(error.response.data, "falle aqui");
      return rejectWithValue(error);
    }
  }
);

export const atencionMedicaGet = createAsyncThunk(
  "user/atencionMedica",
  async (data: any, { rejectWithValue }) => {
    try {
      const response: any = await AxiosLogged.get(
        `turnos_ayudas_sociales/${data.documento}`
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
  loadingUsers: boolean;
  changeusername: boolean;
  changepassword: boolean;
  user: {
    Nombre: string;
    Apellido: string;
    NumeroDocumento: number;
    Calle: string;
    Altura: number;
    Barrio: string;
  };

  error: {
    status?: number;
    message: string;
    isPinError?: boolean;
  };
  locations?: any;
  grupoFamiliar?: any;
  atencionMedica?: any;
  servicios?: any;
  ayudas?: any;
  hacinamiento?: any;
  materiales?: any;
  movimientos?: any;
  instituciones?: any;
  empresas?: any;
  calles?: any;
  vivienda?: any;
  users?: any;
}

const initialState: Pros = {
  loading: false,
  loadingUsers: false,
  changeusername: false,
  changepassword: false,
  user: {
    Nombre: "",
    Apellido: "",
    NumeroDocumento: 0,
    Calle: "",
    Altura: 0,
    Barrio: "",
  },
  error: {
    status: 0,
    message: "",
    isPinError: false,
  },
  locations: [],
  grupoFamiliar: [],
  atencionMedica: [],
  ayudas: [],
  servicios: {},
  hacinamiento: {},
  materiales: {},
  movimientos: [],
  instituciones: [],
  calles: [],
  vivienda: {},
  users: [],
  empresas: []
};

const empresasSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getEmpresas.pending, (state) => {
    });
    builder.addCase(getEmpresas.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.empresas = payload;
    });
    builder.addCase(getEmpresas.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(getUsersDireccion.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getUsersDireccion.fulfilled, (state, { payload }) => {
      state.loadingUsers = false;
      state.users = payload;
    });
    builder.addCase(getUsersDireccion.rejected, (state, action: any) => {
      state.loadingUsers = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(getUsersNombre.pending, (state) => {
      state.loadingUsers = true;
    });
    builder.addCase(getUsersNombre.fulfilled, (state, { payload }) => {
      state.loadingUsers = false;
      state.users = payload;
    });
    builder.addCase(getUsersNombre.rejected, (state, action: any) => {
      state.loadingUsers = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
    builder.addCase(atencionMedicaGet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(atencionMedicaGet.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.atencionMedica = payload;
    });
    builder.addCase(atencionMedicaGet.rejected, (state, action: any) => {
      state.loading = false;
      console.log(action);

      state.error = {
        message: "Hubo un error",
      };
      console.log(action.error.message);
    });
  },
});

export default empresasSlice.reducer;

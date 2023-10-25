import { combineReducers } from "@reduxjs/toolkit";
import consultaSlice from "./consultaSlice";
import inicioSlice from "./inicioSlice";
import movimientosSlice from "./movimientosSlice";
import choferesSlice from "./choferesSlice";
import empresasSlice from "./empresasSlice";
import serviciosSlice from "./serviciosSlice";

export default combineReducers({
  consulta: consultaSlice,
  inicio: inicioSlice,
  movimientos: movimientosSlice,
  choferes: choferesSlice,
  empresas: empresasSlice,
  servicios: serviciosSlice
});

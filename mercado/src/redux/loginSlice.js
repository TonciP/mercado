import { createSlice } from "@reduxjs/toolkit"

const initialData = {
    token: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh'),
    permisos: localStorage.getItem('permisos'),
    productos: localStorage.getItem('productos'),
    id: "",
    idEmpresa: localStorage.getItem('idEmpresa')
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialData,
    reducers: {
        sesionIniciada: (state, action) => {
            const token = action.payload;
            state.token = token
            localStorage.setItem('token', token);
        },
        refreshToken: (state, action) => {
            const refresh = action.payload;
            state.refresh = refresh
            localStorage.setItem('refresh', refresh);
        },
        guardarPermisos:  (state, action) => {
            const permisos = action.payload;
            state.permisos = action.payload; 
            /* const permiso = action.payload;
            state.permiso = permiso; */
             localStorage.setItem('permisos', JSON.stringify(permisos));
        },
        guardarProductos:  (state, action) => {
            const productos = action.payload;
            state.productos = action.payload; 

             localStorage.setItem('productos', JSON.stringify(productos));
        },
        guardarUsuario: (state, action) => {
            const id = action.payload;
            state.id = id;
        },
        guardarIdEmpresa: (state, action) => {
            const idEmpresa = action.payload;
            state.idEmpresa = idEmpresa;

            localStorage.setItem("idEmpresa", idEmpresa);
        },
        sesionCerrada: (state) => {
            state.token = null
            state.permisos = null
            state.productos = null
            localStorage.removeItem('token');
            localStorage.removeItem('permisos');
            localStorage.removeItem('productos');
        },
        eliminarProductos: (state) => {
            state.productos = null
            localStorage.removeItem('productos');
        }
    }
});
export const { sesionIniciada, refreshToken, sesionCerrada, guardarPermisos,guardarUsuario, guardarProductos, eliminarProductos, guardarIdEmpresa } = loginSlice.actions;

export default loginSlice.reducer;
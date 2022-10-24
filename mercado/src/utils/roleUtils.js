export const usuarioTienePermisos = (nombrePermiso, permisos) => {
    const permiso = permisos.filter(item => item.rol === nombrePermiso);
    return (permiso.length > 0);
}
export interface Permission {
  id: number;
  nombreEmpleado: string;
  apellidosEmpleado: string;
  tipoPermisoId: number;
  fechaPermiso: string;
}

export interface PermissionType {
  descripcion: string;
  id: number;
}

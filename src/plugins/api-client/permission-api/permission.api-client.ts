import { ApiClientBase } from "../api-client.base";
import { Permission, PermissionType } from "./permission.interfaces";

class PermissionApiClient extends ApiClientBase {
  constructor() {
    const baseURL = process.env.VUE_APP_PERMISSION_API_BASE_URL;
    super(baseURL);
  }

  async getPermissions(): Promise<Permission[]> {
    return this.get<Permission[]>({ url: "/permiso" });
  }

  async addPermission(permission: Permission): Promise<Permission> {
    return this.post<Permission>({ url: "/permiso", data: permission });
  }

  async updatePermission(permission: Permission): Promise<Permission> {
    return this.put<Permission>({
      url: `/permiso/${permission.id}`,
      data: permission,
    });
  }

  async deletePermission(permissionId: number): Promise<void> {
    return this.delete<void>({ url: `/permiso/${permissionId}` });
  }

  async getPermissionTypes(): Promise<PermissionType> {
    return this.get<PermissionType>({ url: "/tipoPermiso" });
  }
}

const permissionApiClient = new PermissionApiClient();
export default permissionApiClient;

import { Module } from "vuex";
import permissionApiClient from "@/plugins/api-client/permission-api/permission.api-client";
import {
  Permission,
  PermissionType,
} from "@/plugins/api-client/permission-api/permission.interfaces";

export interface PermissionState {
  permissions: Permission[];
  permissionsTypes: PermissionType[];
}

const permissionModule: Module<PermissionState, unknown> = {
  state: {
    permissions: [],
    permissionsTypes: [],
  },
  mutations: {
    setPermissions(state, permissions: Permission[]) {
      state.permissions = permissions;
    },
    addPermission(state, permission: Permission) {
      state.permissions.push(permission);
    },
    updatePermission(state, updatedPermission: Permission) {
      const index = state.permissions.findIndex(
        (p) => p.id === updatedPermission.id
      );
      if (index !== -1) {
        state.permissions[index] = updatedPermission;
      }
    },
    deletePermission(state, permissionId: number) {
      state.permissions = state.permissions.filter(
        (p) => p.id !== permissionId
      );
    },
    setPermissionTypes(state, permissionTypes: PermissionType[]) {
      state.permissionsTypes = permissionTypes;
    },
  },
  actions: {
    async fetchPermissions({ commit }) {
      try {
        const response = await permissionApiClient.getPermissions();
        commit("setPermissions", response);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    },
    async addPermission({ commit }, permission: Permission) {
      try {
        const response = await permissionApiClient.addPermission(permission);
        commit("addPermission", response);
      } catch (error) {
        console.error("Error adding permission:", error);
      }
    },
    async updatePermission({ commit }, permission: Permission) {
      try {
        const response = await permissionApiClient.updatePermission(permission);
        commit("updatePermission", response);
      } catch (error) {
        console.error("Error updating permission:", error);
      }
    },
    async deletePermission({ commit }, permissionId: number) {
      try {
        await permissionApiClient.deletePermission(permissionId);
        commit("deletePermission", permissionId);
      } catch (error) {
        console.error("Error deleting permission:", error);
      }
    },
    async fetchPermissionTypes({ commit }) {
      try {
        const response = await permissionApiClient.getPermissionTypes();
        console.log("response", response);
        commit("setPermissionTypes", response);
      } catch (error) {
        console.error("Error fetching permission types:", error);
      }
    },
  },
  namespaced: true,
};

export default permissionModule;

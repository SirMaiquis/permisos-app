<template>
  <div class="container mt-4">
    <h2>Listado de Permisos Registrados</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Tipo de Permiso</th>
          <th scope="col">Fecha de Permiso</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.id">
          <td>{{ permission.id }}</td>
          <td>{{ permission.nombreEmpleado }}</td>
          <td>{{ permission.apellidosEmpleado }}</td>
          <td>{{ permission.tipoPermisoDescripcion }}</td>
          <td>
            {{ new Date(permission.fechaPermiso).toLocaleDateString() }}
          </td>
          <td>
            <button
              class="btn btn-primary me-2"
              @click="editPermission(permission.id)"
            >
              Editar
            </button>
            <button
              class="btn btn-danger"
              @click="confirmDelete(permission.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "PermissionList",
  computed: {
    ...mapState("permission", ["permissions"]),
  },
  methods: {
    ...mapActions("permission", ["fetchPermissions", "deletePermission"]),
    confirmDelete(permissionId: number) {
      if (window.confirm("¿Estás seguro que deseas eliminar este permiso?")) {
        this.deletePermission(permissionId);
      }
    },
    editPermission(permissionId: number) {
      this.$router.push({
        name: "edit-permission",
        params: { id: permissionId },
      });
    },
  },
  mounted() {
    this.fetchPermissions();
  },
});
</script>

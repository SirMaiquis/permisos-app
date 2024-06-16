<template>
  <div class="container mt-4">
    <h2>{{ formTitle }}</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="firstName" class="form-label">Nombre:</label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          v-model="form.nombreEmpleado"
          @blur="touchField('nombreEmpleado')"
          required
        />
        <span
          v-if="touched.nombreEmpleado && !form.nombreEmpleado"
          class="text-danger"
        >
          El nombre es obligatorio.
        </span>
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Apellidos:</label>
        <input
          type="text"
          id="lastName"
          class="form-control"
          v-model="form.apellidosEmpleado"
          @blur="touchField('apellidosEmpleado')"
          required
        />
        <span
          v-if="touched.apellidosEmpleado && !form.apellidosEmpleado"
          class="text-danger"
        >
          Los apellidos son obligatorios.
        </span>
      </div>
      <div class="mb-3">
        <label for="permissionType" class="form-label">Tipo de Permiso:</label>
        <select
          id="permissionType"
          class="form-select"
          v-model="form.tipoPermisoId"
          @blur="touchField('tipoPermisoId')"
          required
        >
          <option value="">Selecciona un tipo de permiso</option>
          <option
            v-for="type in permissionsTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.descripcion }}
          </option>
        </select>
        <span
          v-if="touched.tipoPermisoId && !form.tipoPermisoId"
          class="text-danger"
        >
          Selecciona un tipo de permiso.
        </span>
      </div>
      <div class="mb-3">
        <label for="permissionDate" class="form-label">Fecha de Permiso:</label>
        <input
          type="date"
          id="fechaPermiso"
          class="form-control"
          v-model="form.fechaPermiso"
          @blur="touchField('fechaPermiso')"
          required
        />
        <span
          v-if="touched.fechaPermiso && !form.fechaPermiso"
          class="text-danger"
        >
          La fecha del permiso es obligatoria.
        </span>
        <span
          v-if="touched.fechaPermiso && !isFutureDate(form.fechaPermiso)"
          class="text-danger"
        >
          La fecha del permiso debe ser futura.
        </span>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">
          {{ submitButtonText }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { TouchedFields } from "@/interfaces/TouchedFields";
import { Permission } from "@/plugins/api-client/permission-api/permission.interfaces";
import { DateHelper } from "@/plugins/helpers/date.helper";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "PermissionForm",
  props: {
    initialPermission: Object,
  },
  data() {
    return {
      form: {
        nombreEmpleado: "",
        apellidosEmpleado: "",
        tipoPermisoId: 0,
        fechaPermiso: "",
      } as Permission,
      touched: {
        nombreEmpleado: false,
        apellidosEmpleado: false,
        tipoPermisoId: false,
        fechaPermiso: false,
      } as TouchedFields,
    };
  },
  computed: {
    formTitle(): string {
      return this.initialPermission ? "Editar Permiso" : "Agregar Permiso";
    },
    submitButtonText(): string {
      return this.initialPermission ? "Guardar Cambios" : "Agregar Permiso";
    },
    ...mapState("permission", ["permissionsTypes"]),
  },
  methods: {
    ...mapActions("permission", [
      "addPermission",
      "updatePermission",
      "fetchPermissionTypes",
    ]),
    touchField(field: string) {
      this.touched[field] = true;
    },
    isFutureDate(date: string): boolean {
      return DateHelper.isFutureDate(date);
    },
    async submitForm() {
      try {
        if (!this.isValidForm()) {
          return;
        }

        if (this.initialPermission) {
          await this.updatePermission({
            ...this.form,
            id: this.initialPermission.id,
          });
          alert("Permiso actualizado correctamente.");
        } else {
          await this.addPermission(this.form);
          alert("Permiso agregado correctamente.");
        }
        this.$emit("form-submitted");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    isValidForm(): boolean {
      return (
        this.form.nombreEmpleado !== "" &&
        this.form.apellidosEmpleado !== "" &&
        this.form.tipoPermisoId !== 0 &&
        this.form.fechaPermiso !== "" &&
        this.isFutureDate(this.form.fechaPermiso)
      );
    },
  },
  async mounted() {
    await this.fetchPermissionTypes();
    if (this.initialPermission) {
      this.form = { ...this.initialPermission } as Permission;
      this.form.fechaPermiso = new Date(this.form.fechaPermiso)
        .toISOString()
        .substr(0, 10);
    }
  },
});
</script>

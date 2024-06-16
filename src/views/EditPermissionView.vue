<template>
  <div>
    <PermissionForm
      v-if="permission"
      :initialPermission="permission"
      @form-submitted="handleFormSubmitted"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import PermissionForm from "@/components/PermissionForm.vue";
import { Permission } from "@/plugins/api-client/permission-api/permission.interfaces";

export default defineComponent({
  name: "EditPermissionView",
  components: {
    PermissionForm,
  },
  data() {
    return {
      permission: null as Permission | null,
    };
  },
  computed: {
    ...mapState("permission", ["permissions"]),
  },
  methods: {
    ...mapActions("permission", ["fetchPermissions"]),
    handleFormSubmitted() {
      this.$router.push("/permissions");
    },
    loadPermission() {
      const permissionId = parseInt(this.$route.params.id as string, 10);
      this.permission =
        this.permissions.find(
          (permission: Permission) => permission.id === permissionId
        ) || null;
    },
  },
  mounted() {
    if (this.permissions.length === 0) {
      this.fetchPermissions().then(this.loadPermission);
    } else {
      this.loadPermission();
    }
  },
});
</script>

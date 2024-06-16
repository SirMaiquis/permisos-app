<template>
  <div>
    <PermissionForm v-if="showForm" @form-submitted="handleFormSubmitted" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PermissionForm from "@/components/PermissionForm.vue";

export default defineComponent({
  name: "AddPermissionView",
  components: {
    PermissionForm,
  },
  data() {
    return {
      showForm: true,
    };
  },
  methods: {
    handleFormSubmitted() {
      this.showForm = false;
      this.$router.push("/permissions");
    },
  },
});
</script>

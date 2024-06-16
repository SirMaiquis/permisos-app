<template>
  <div>
    <PermissionList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PermissionList from "@/components/PermissionList.vue";

export default defineComponent({
  name: "PermissionsView",
  components: {
    PermissionList,
  },
});
</script>

import { createRouter, createWebHistory } from "vue-router";
import AddPermissionView from "@/views/AddPermissionView.vue";
import PermissionsView from "@/views/PermissionsView.vue";
import EditPermissionView from "@/views/EditPermissionView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PermissionsView,
  },
  {
    path: "/permissions",
    name: "permissions",
    component: PermissionsView,
  },
  {
    path: "/permissions/add",
    name: "add-permission",
    component: AddPermissionView,
  },
  {
    path: "/permissions/edit/:id",
    name: "edit-permission",
    component: EditPermissionView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

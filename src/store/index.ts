import { createStore } from "vuex";
import permissionModule from "./modules/permission.module.";

export default createStore({
  modules: {
    permission: permissionModule,
  },
});

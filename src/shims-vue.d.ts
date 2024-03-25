/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// shims-vue.d.ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}


// vue.d.ts 或 vue-shim.d.ts
import { ComponentCustomProperties } from '@vue/runtime-core';
import axios from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

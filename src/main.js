import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GStore from './store'
import vuex from './store2'
import 'nprogress/nprogress.css'

createApp(App).use(router).use(vuex).provide('GStore', GStore).mount('#app')

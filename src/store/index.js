import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Auth from "@/store/modules/auth.module";
import Signup from "@/store/modules/signup.module";

import User from "@/store/modules/masterlist/user.module";

import ObjectKeys from "@/store/app/object.key.module,js";

import {MY_APP_KEYS} from "@/config/constants.config";
import createPersistedState from 'vuex-persistedstate';

const modules = () => {
  return {
    Auth,
    Signup,
    User,
    ObjectKeys
  }
}

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: modules(),
  plugins: [
    createPersistedState({
      key: MY_APP_KEYS.ENCRYPTED_KEY,
      paths: [
        'Auth.authUser',
      ]
    })
  ],
  storage: window.localStorage
})

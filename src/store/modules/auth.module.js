import axios from 'axios';

import {MY_APP_CONSTANTS, MY_APP_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";

const initAuthState = () => {
    return {
        status: '',
        token: localStorage.getItem(TOKEN.MY_APP || ''),
        authUser: {},
        authData: {
            username: null,
            password: null,
        },
    }
}


const state = {
    ...initAuthState()
};


const mutations = {
    SET_AUTH_USER(state, params) {
        // console.log('Payload mutation', params);
        state.authUser = params;
    },

    SET_TOKEN(state, params) {
        localStorage.setItem(TOKEN.MY_APP, params);
    },

    SET_AUTH_DATA_NULL(state, params) {
        state.authData = {
            username: null,
            password: null,
        };
    },

    LOGOUT(state) {
        state.status = null;
        state.token = null;
        state.authUser = {};
        state.authData = {};
        window.localStorage.removeItem(TOKEN.MY_APP);
        window.localStorage.removeItem(MY_APP_KEYS.ENCRYPTED_KEY)
    },


};


const actions = {
    loginUser({commit}, params) {
        commit('set_is_loading', true);
        return axios.post(MY_APP_CONSTANTS.LOGIN, params).then((r) => {

            commit('SET_AUTH_USER', r.data.authUser);
            commit('SET_TOKEN', r.data.token);
            commit('set_is_loading', false);

            UtilityService.generateResponseMessage(r, 'Login');
            return true;

        }).catch((errors) => {
            commit('SET_AUTH_DATA_NULL');
            commit('set_is_loading', false);
            if(!errors.response){
                AlertService.errorAlert('Cant establish server connection','Login')
            }else {
                UtilityService.generateResponseMessage(errors, 'Login');
            }
            return false;
        });
    },

    logoutUser({commit}) {
        return axios.get(MY_APP_CONSTANTS.LOGOUT).then((res) => {
            commit('LOGOUT');
            return res
        }).catch((error) => {
            UtilityService.generateResponseMessage(error);
            return false;

        });
    },

};


const getters = {
    authUser: state => state.authUser,
    authData: state => state.authData,
    token: state => state.token,
};


/** export **/
export default {state, actions, mutations, getters};
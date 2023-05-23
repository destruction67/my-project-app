import axios from 'axios';

import {MY_APP_CONSTANTS, MY_APP_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";


const initAuthState = () => {
    return {
        newUserFromSignUp: {},
    }
}


const state = {
    ...initAuthState()
};


const mutations = {
    create_user_from_signup (state) {
        state.newUserFromSignUp = {};
    },
};


const actions = {
    async create_user_from_signup({commit}, params) {
        return axios.post(MY_APP_CONSTANTS.SIGNUP_USER, params).then((r) => {
            commit('create_user_from_signup', r.data);
            return true;

        }).catch((error) => {
            UtilityService.generateResponseMessage(error, 'Create signatory');
            return false;
        })
    },
};


const getters = {};


/** export **/
export default {state, actions, mutations, getters};
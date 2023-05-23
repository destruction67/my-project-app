import axios from 'axios';

import {MY_APP_CONSTANTS, MY_APP_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";


const initAuthState = () => {
    return {
        objUserPositions: [],
    }
}


const state = {
    ...initAuthState()
};


const mutations = {
    set_obj_userPositions(state, params) {
        state.objUserPositions = params
    },
};


const actions = {
    getuserPositionKeys({commit}, params) {
        return axios.get(MY_APP_CONSTANTS.GET_USER_POSITION_KEYS, {params}).then((r) => {
            commit('set_obj_userPositions', r.data)
            return true
        }).catch((er) => {
            UtilityService.generateResponseMessage(er, 'User Position Keys')
            return false
        })
    },
};


const getters = {
    objUserPositions: state => state.objUserPositions,
};


/** export **/
export default {state, actions, mutations, getters};
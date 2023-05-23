import axios from 'axios';

import {MY_APP_CONSTANTS, MY_APP_KEYS, TOKEN} from '@/config/constants.config';
import {AlertService} from "@/service/AlertService";
import {UtilityService} from "@/service/UtilityService";

const initAuthState = () => {
    return {
        user: {},
        users: [],
        newUser: {},

        userFormParam: {
            searchValue: null,
            type: null,
            level: null,
            count: 5,
            status: null,
            page: null,
        },


        userPagination: {
            from: 1,
            currentPage: 1,
            lastPage: 0,
            perPage: 5,
            to: 5,
            total: 0,
        },

        isReloading: false,

    }
}


const state = {
    ...initAuthState()
};



const mutations = {
    set_users(state, params) {
        state.users = params
    },

    set_user(state, params) {
        state.user = params
    },


    create_user (state) {
        state.newUser = {};
    },

    update_user (state, params) {
        let user = state.users.find((val, index) => val.id === params.id)
        Object.assign(user, params)
    },

    update_userUnsubscribe (state, params) {
        let user = state.users.find((val, index) => val.id === params.id)
        Object.assign(user, params)
    },

    set_unsubscribe(state) {
        window.localStorage.removeItem(TOKEN.MY_APP);
        window.localStorage.removeItem(MY_APP_KEYS.ENCRYPTED_KEY)
    },

    delete_user (state, params) {
        let index = state.users.findIndex((val, index) => val.id === params)
        state.users.splice(index, 1)
    },


    set_user_pagination(state, params) {
        state.userPagination = {
            from: params.from,
            currentPage: params.current_page,
            lastPage: params.last_page,
            perPage: params.per_page,
            to: params.to,
            total: params.total,
        }
    },

    set_is_reloading(state, payload) {
        state.isReloading = payload
    },
};


const actions = {
    async set_users({commit}, params) {
        commit('set_is_reloading', true)
        return await axios.get(MY_APP_CONSTANTS.USER, {params}).then((r) => {
            commit('set_users', r.data.data)
            commit('set_user_pagination', r.data)
            commit('set_is_reloading', false)
            // console.log(r.data, 'users')
            return true

        }).catch((er) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(er, 'Get users')
            return false
        })
    },

    async set_user({commit}, params) {
        return await axios.get(`${MY_APP_CONSTANTS.USER}/${params}`).then((r) => {
            commit('set_user', r.data)
            // console.log(r.data, 'users')
            return true

        }).catch((er) => {
            commit('set_is_reloading', false)
            UtilityService.generateResponseMessage(er, 'Get user')
            return false
        })
    },

    async create_user({commit}, params) {
        return axios.post(MY_APP_CONSTANTS.USER, params).then((r) => {
            commit('create_user', r.data);
            return true;

        }).catch((error) => {
            UtilityService.generateResponseMessage(error, 'Create User');
            return false;
        })
    },

    async update_user({commit}, params) {
        return axios.put(`${MY_APP_CONSTANTS.USER}/${params.id}`, params).then((r)=>{
            commit('update_user',r.data.updatedUser);
            return true;

        }).catch((error)=>{
            UtilityService.generateResponseMessage(error,'Update User');
            return false;

        });
    },

    async update_userUnsubscribe({commit}, params) {
        return axios.post(MY_APP_CONSTANTS.USER_UNSUBSCRIBE, params).then((r)=>{
            commit('set_unsubscribe');
            return true;

        }).catch((error)=>{
            UtilityService.generateResponseMessage(error,'Unsubscribe User');
            return false;

        });
    },

    async delete_user({ commit }, params) {
        let _del = AlertService.questionAlertService("Do you want to delete this record.",'Delete User','question');
        if(await _del){
            return axios.delete(`${MY_APP_CONSTANTS.USER}/${params}`).then((r)=>{
                AlertService.successAlert("Deleted successfully",'Delete User');
                commit('delete_user',r.data.id);
                return true;

            }).catch((er)=>{
                UtilityService.generateResponseMessage(er,"Delete signatory");
                return false;

            })
        }
    },

};


const getters = {
    users: state => state.users,
    user: state => state.user,
    userFormParam: state => state.userFormParam,
    userPagination: state => state.userPagination,
    isReloading: state => state.isReloading,
};


/** export **/
export default {state, actions, mutations, getters};
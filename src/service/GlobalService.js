'use strict'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { AlertService } from './AlertService'

export const GlobalService = {

    handleError (error, source) {
        try {
            switch (error.response.status) {
                case 401:
                    AlertService.errorAlert('UNAUTHORIZED', source)

                // eslint-disable-next-line no-fallthrough
                case 403:
                    AlertService.errorAlert('UNAUTHORIZED', source)
                    return false

                case 404:
                    AlertService.errorAlert('File Not Found', source)

                // eslint-disable-next-line no-fallthrough
                case 500:
                    AlertService.errorAlert('SYSTEM ERROR', source)
                    return false

                case 400:
                    this.handleRequestErrors(error.response.data.errors, source)
                    return this.parseErrors(error.response.data.errors)
            }
            return { errors: error.response.data.errors }
        } catch (e) {
            // console.log(e, source)
        }
    },

    handleRequestErrors(errorMessages, source) {
        let message = "";
        if(errorMessages) {
            Object.keys(errorMessages).forEach((key, index) => {
                message += `<p class="text-left">${index + 1}. ${errorMessages[key]}</p>`;
            });
        }
        AlertService.errorAlert(message, source);
    },

    parseErrors(errors) {
        let errorMessages = [];
        errors = errors.hasOwnProperty('errors') ? errors.errors : errors;
        Object.keys(errors).forEach(column => errorMessages[column] = errors[column].join(', '));
        return { errors: errorMessages };
    },




}

export default { GlobalService }
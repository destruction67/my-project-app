import { mapGetters } from 'vuex';

export const gateMixin = {

    data() {
        return {

        }
    },

    computed: {
        ...mapGetters([ 'authUser']),

        isSystemAdmin() {
            return this.authUser !==false && this.authUser.user_position_id === 1;
        },

        isStaff() {
            return this.authUser !==false && this.authUser.user_position_id === 2;
        },

        isGuest() {
            return this.authUser !==false && this.authUser.user_position_id === 3;
        },


    }

};

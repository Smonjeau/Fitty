import axios from "axios";

export const store = {
    userInfo: {},
    token: '',
    logged: false,
    updateDataUser() {
        if (localStorage.token && !store.logged) {
            axios.get('user/current', {headers: {'Authorization': 'Bearer ' + localStorage.token}})
                .then(result => {
                    this.logged = true;
                    this.userInfo = result.data;
                }).catch(error => {
                console.log(error);
            });
        }
    },
}
import axios from "axios";

export const store = {
    userInfo: {},
    token: '',
    logged: false,
    updateToken(token) {
        this.token = token;
        this.logged = true;
    },
    updateDataUser() {
        axios.get('user/current', {headers: {'Authorization': 'Bearer ' + localStorage.token}})
            .then(result => {
                this.userInfo = result.data;
            }).catch(error => {
                console.log(error);
            });
    },
    checkIfLogged() {

        if (localStorage.getItem("token") !== null) {
            this.updateToken(localStorage.token);
            this.updateDataUser();
        }
    },
    getUsername() {
        return this.userInfo.username;
    },
    closeSesion() {
        this.logged = false;
        localStorage.removeItem('token');
        this.userInfo = {};
        window.location.href = "/";
    }
}
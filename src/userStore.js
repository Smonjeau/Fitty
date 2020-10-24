
export const store = {
    userInfo: {},
    //token: '',
    logged: false,
    /*updateToken(token) {
        this.token = token;
        this.logged = true;
    },*/
    updateDataUser(data) {
        this.userInfo = data;
    },/*
    checkIfLogged() {

        if (localStorage.getItem("token") !== null) {
            //this.updateToken(localStorage.token);
            this.updateDataUser();
        }
    },*/
    getUsername() {
        return this.userInfo.username;
    },
    closeSesion() {
        this.logged = false;
        localStorage.removeItem('token');
        this.userInfo = {};
        window.location.href = "/";
    },
    loginRefreshed: true
}
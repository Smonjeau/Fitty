
import logIn from './components/registration/logIn';
import signIn from "./components/registration/signIn";
//import excercise_form from "@/components/routines/excercise_form";
import Home from "@/components/Home";

import create_routine from "@/components/routines/create_routine";

export const routes = [
    {path: '/login', component: logIn},
    {path: '/signin', component: signIn},
    {path: '/create_routine', component: create_routine},
    {path: '/', component: Home}
    ];
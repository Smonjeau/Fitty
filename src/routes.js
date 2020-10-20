
import logIn from './components/registration/logIn';
import signUp from "./components/registration/signUp";
//import excercise_form from "@/components/routines/excercise_form";
import Home from "@/components/Home";

import create_routine from "@/components/routines/create_routine";

export const routes = [
    {path: '/login', component: logIn},
    {path: '/signup', component: signUp},
    {path: '/create_routine', component: create_routine},
    {path: '/', component: Home}
    ];

import logIn from './components/registration/logIn';
import signUp from "./components/registration/signUp";
//import excercise_form from "@/components/routines/excercise_form";
import Home from "@/components/Home";

import create_routine from "@/components/routines/create_routine";
import Routine from "./components/routines/Routine";

export const routes = [
    {path: '/login', component: logIn},
    {path: '/signup', component: signUp},
    {path: '/create_routine', component: create_routine},
    { path: '/routine/:id_routine', component: Routine },
    {path: '/', component: Home}
    ];
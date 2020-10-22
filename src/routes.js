
import logIn from './components/registration/logIn';
import signUp from "./components/registration/signUp";
//import excercise_form from "@/components/routines/excercise_form";
import Home from "@/components/Home";

import create_routine from "@/components/routines/create_routine";
import Routine from "./components/routines/Routine";
import MisRutinas from "@/components/MisRutinas";
import Category from "@/components/Category";
import Perfil from "@/components/Perfil";
import MisEjercicios from "@/components/MisEjercicios";

export const routes = [
    { path: '/login', component: logIn },
    { path: '/signup', component: signUp },
    { path: '/create_routine', component: create_routine },
    { path: '/mis_rutinas', component: MisRutinas },
    { path: '/mis_ejercicios', component: MisEjercicios },
    { path: '/routine/:id_routine', component: Routine },
    {path:'/perfil', component: Perfil},
    { path: '/category/:id_category', component: Category },
    { path: '/', component: Home }
    ];
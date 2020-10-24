
import logIn from './components/registration/logIn';
import signUp from "./components/registration/signUp";
import Home from "@/components/Home";

import create_routine from "@/components/createRoutine/create_routine";
import editRoutine from "@/components/editRoutine/editRoutine";
import Routine from "./components/routines/Routine";
import MisRutinas from "@/components/MisRutinas";
import Category from "@/components/Category";
import Perfil from "@/components/Perfil";
import MisEjercicios from "@/components/MisEjercicios";
import EmailConfirmation from "@/components/registration/EmailConfirmation";
import EmailValidation from "@/components/registration/EmailValidation";

export const routes = [
    { path: '/login', component: logIn },
    { path: '/signup', component: signUp },
    { path: '/create_routine', component: create_routine },
    { path: '/mis_rutinas', component: MisRutinas },
    { path: '/mis_ejercicios', component: MisEjercicios },
    { path: '/routine/:id_routine', component: Routine },
    {path:'/perfil', component: Perfil},
    { path: '/category/:id_category', component: Category },
    { path: '/edit_routine/:id_routine', component: editRoutine },
    { path: '/', component: Home },
    {path: '/codigo_verificacion/:email' , component: EmailValidation},
    {path: '/confirmar_email/:code&:email', component: EmailConfirmation}

    ];
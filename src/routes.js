
import logIn from './components/registration/logIn';
import signIn from "./components/registration/signIn";
//import excercise_form from "@/components/routines/excercise_form";
import routine_panel from "@/components/routines/routine_panel";

export const routes = [
    {path: '/login', component: logIn},
    {path: '/signin', component: signIn},
    {path: '/create_routine', component: routine_panel}
    ];
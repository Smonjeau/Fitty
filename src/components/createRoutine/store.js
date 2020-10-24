import axios from "axios";

export const store = {
    myExercises: [],
    routineId: 0,
    cycleId: 0,
    video: '',
    getMyExercises() {
        axios.get('user/current/routines/')
            .then(response1 => {
                this.routineId = parseInt(response1.data.results[0].id);
                axios.get('routines/' + this.routineId + '/cycles/')
                    .then(response2 => {
                        this.cycleId = parseInt(response2.data.results[0].id);
                        axios.get('routines/' + this.routineId + '/cycles/' + this.cycleId + '/exercises')
                            .then(response3 => {
                                this.myExercises = response3.data.results;
                            })
                    })
            })
    },
    getVideo(exerciseId) {
        axios.get('routines/' + this.routineId + '/cycles/' + this.cycleId + '/exercises/' + exerciseId + '/videos')
            .then(response => {
                this.video =  response.data.results[0].url;
        })
    }
}
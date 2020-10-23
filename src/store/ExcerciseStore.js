const ExerciseStore = {
    exercises: [],
    /*getSize(){
        return this.exercises_id +1;
    },*/
    add(exercise) {
        return this.exercises.push(exercise);
    },
    get(index) {
        if (index === undefined)
            return this.exercises;

        /*if (index > this.exercises_id.length)
            return null;

        return this.exercises_id[index];*/
    },
    empty() {
        return this.exercises.length == 0;
    }/*,
    remove(id) {
        if (!id || this.exercises_id.length === 0)
            return false;

        let index = this.exercises_id.findIndex(item => (item === id));
        if (index === -1)
            return false;

        this.exercises_id.splice(index, 1);
        return true;
    }*/
};

export default ExerciseStore;
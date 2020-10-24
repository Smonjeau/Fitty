const ExerciseStore = {
    exercises: [],
    add(exercise) {
        return this.exercises.push(exercise);
    },
    get(query) {
        if (query === undefined || query === '') {
            return this.exercises;
        } else {
            return this.exercises.filter(excercise => excercise.name.toLowerCase().includes(query.toLowerCase()));
        }

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
        return true;a
    }*/
};

export default ExerciseStore;
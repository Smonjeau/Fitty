const ExerciseStore = {
    exercises: [],
    idRutina: -1,
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
    },
    remove(id) {
        if (!id || this.exercises.length === 0)
            return false;

        let index = this.exercises.findIndex(item => (item.idEjercicio == id));
        if (index === -1)
            return false;

        this.exercises.splice(index, 1);
        return true;
    }
};

export default ExerciseStore;
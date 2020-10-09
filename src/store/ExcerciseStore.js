const ExerciseStore = {
    exercises_id: [],
    getSize(){
        return this.exercises_id +1;
    },
    add(id) {
        //validar distintos nombres?
        return this.exercises_id.push(id);
    },
    get(index) {
        if (index === undefined)
            return this.exercises_id;

        if (index > this.exercises_id.length)
            return null;

        return this.exercises_id[index];
    },
    remove(id) {
        if (!id || this.exercises_id.length === 0)
            return false;

        let index = this.exercises_id.findIndex(item => (item === id));
        if (index === -1)
            return false;

        this.exercises_id.splice(index, 1);
        return true;
    }
};

export default ExerciseStore;
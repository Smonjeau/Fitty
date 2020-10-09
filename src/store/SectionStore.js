const SectionStore = {
    sections: [],
    add(section) {
        return this.sections.push(section);
    },
    get(index) {
        if (index === undefined)
            return this.sections;

        if (index > this.sections.length)
            return null;

        return this.sections[index];
    },
    remove(section) {
        if (!section || this.sections.length === 0)
            return false;

        let index = this.sections.findIndex(item => (item === section));
        if (index === -1)
            return false;

        this.sections.splice(index, 1);
        return true;
    }
};

export default SectionStore;
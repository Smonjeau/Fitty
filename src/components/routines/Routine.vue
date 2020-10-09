<template>
  <div>
    <div v-for="section in store.get()" :key="section">
      <button @click="removeSection(section)">X</button>
      <span>{{ section }}</span>
    </div>

  </div>
</template>

<script>
import SectionStore from "@/store/SectionStore";

export default {
name: "Routine",
  data() {
    return {
      store: SectionStore,
      name: '',
      category:'',
      duration: 0
    }
  },
  methods: {
    addSection() {
      this.store.add('Seccion');

    }
  },
}
</script>


<style scoped>

</style>
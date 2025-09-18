import { defineStore } from "pinia";
import { ref } from "vue";

/* STORE FOR ENTRIES */

export const useStoreEntries = defineStore("entries", () => {
  /* state  */
  const entries = ref([
    {
      id: "id1",
      name: "Salary",
      amount: 4999.99,
    },
    {
      id: "id2",
      name: "Rent",
      amount: -999.0,
    },
    {
      id: "id3",
      name: "Phone",
      amount: -14.99,
    },
    {
      id: "id4",
      name: "Unknown",
      amount: 0,
    },
  ]);

  /* getters */

  /* actions */

  return { entries };
});

import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid } from "quasar";

/* STORE FOR ENTRIES */

export const useStoreEntries = defineStore("entries", () => {
  /* state  */
  const entries = ref([
    {
      id: "id1",
      name: "Salary",
      amount: 4999.99,
      paid: false
    },
    {
      id: "id2",
      name: "Rent",
      amount: -999.0,
      paid: false
    },
    {
      id: "id3",
      name: "Phone",
      amount: -14.99,
      paid: false
    },
    {
      id: "id4",
      name: "Unknown",
      amount: 0,
      paid: false
    },
  ]);

  const options = reactive({
    sort: false
  })
  /* getters */

  const balance = computed(() => {
    return entries.value.reduce((acc, { amount, paid }) => {
      return acc + amount;
    }, 0)
  });


  const balancePaid = computed(() => {
    return entries.value.reduce((acc, {amount, paid}) => {
      return paid ? acc + amount : acc
    }, 0)
  });


  /* actions */
  const addEntry = (entry) => {
    const newEntry = Object.assign({}, entry, { id: uid(), paid: false });
    entries.value.push(newEntry);
  }

  const deleteEntry = (index) => {
    entries.value.splice(index, 1);
  }

  const updateEntry = (index, update) => {
    Object.assign(entries.value[index], update);
  }

  const sortEnd = ({ oldIndex, newIndex}) => {
    const movedEntry = entries.value[oldIndex];
    entries.value.splice(oldIndex, 1);
    entries.value.splice(newIndex, 0, movedEntry);
  }
  return { entries, options, balance, balancePaid, addEntry, deleteEntry, updateEntry, sortEnd };
});

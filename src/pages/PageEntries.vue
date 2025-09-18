<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-slide-item v-for="(entry, index) in storeEntries.entries" :key="entry.id" left-color="positive"
          right-color="negative" @right="onRight($event, index, entry)">
          <!-- <template v-slot:left>
            <q-icon name="done" />
          </template> -->
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
              {{ entry.name }}
            </q-item-section>

            <q-item-section side top :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
              {{ useCurrencyFormatter(entry.amount) }}
            </q-item-section>
          </q-item>
        </q-slide-item>
      </q-list>
    </div>
    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
          {{ useCurrencyFormatter(balance) }}
        </div>
      </div>
      <form @submit="addEntry" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input ref="nameRef" v-model="addEntryForm.name" outlined dense bg-color="white" placeholder="Name" />
        </div>
        <div class="col">
          <q-input v-model.number="addEntryForm.amount" input-class="text-right" outlined dense bg-color="white"
            placeholder="Amount" type="number" step="0.01" />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" type="submit" />
        </div>
      </form>

    </q-footer>
  </q-page>
</template>

<script setup>

/* IMPORTS  */

import { ref, computed, reactive } from 'vue';
import { useStoreEntries } from 'src/stores/storeEntries';
import { useCurrencyFormatter } from 'src/use/useCurrencyFormatter';
import { useAmountColorClass } from 'src/use/useAmountColorClass';
import { colors, uid, useQuasar } from 'quasar';


/* stores */

const storeEntries = useStoreEntries();

/* quasar */

const $q = useQuasar();
/* ENTRIES */


/* balance */

const balance = computed(() => {
  const total = storeEntries.entries.reduce((acc, entry) => acc + entry.amount, 0);
  return total;
});


/* add entry */

const nameRef = ref(null);

const addEntryFormDefault = reactive({
  name: '',
  amount: null,
});

const addEntryForm = reactive({
  ...addEntryFormDefault
});

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = Object.assign({}, addEntryForm, uid());
  storeEntries.entries.push(newEntry);
  addEntryFormReset();
};


/* delete */

const onRight = ({ reset }, index, entry) => {
  $q.dialog({
    title: 'Delete Entry',
    message:
      `
    Delete this entry?
    <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
      ${entry.name}: ${useCurrencyFormatter(entry.amount)}
    </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    }
  }).onOk(() => {
    deleteEntry(index);
    $q.notify({
      message: "Entry deleted",
      position: "top",
    })
  }).onCancel(() => {
    reset();
  })
}

const deleteEntry = (index) => {
  storeEntries.entries.splice(index, 1);
}
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
            {{ entry.name }}
          </q-item-section>

          <q-item-section side top :class="useAmountColorClass(entry.amount)" class="text-weight-bold">
            {{ useCurrencyFormatter(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-footer>
      <div class="row q-pa-sm q-col-gutter-sm">
        <div class="col">
          <q-input outlined dense v-model="text" bg-color="white" placeholder="Name" />
        </div>
        <div class="col">
          <q-input input-class="text-right" outlined dense v-model="amount" bg-color="white" placeholder="Amount"
            type="number" step="0.01" />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" />
        </div>
      </div>

    </q-footer>
  </q-page>
</template>

<script setup>

/* IMPORTS  */

import { ref } from 'vue';
import { useCurrencyFormatter } from 'src/use/useCurrencyFormatter';
import { useAmountColorClass } from 'src/use/useAmountColorClass';

/* ENTRIES */

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.99,
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999.00,
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99,
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0,
  }
]);

</script>

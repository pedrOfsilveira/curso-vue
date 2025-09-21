<template>
  <div
    class="row q-mb-sm q-px-md q-py-sm  items-center"
    :class="useLightOrDark('shadow-up-3', 'bg-black')"
  >
    <div class="col text-grey-7 text-h6">Balance:</div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencyFormatter(storeEntries.balance) }}
        </div>
      </div>
      <div class="row" v-if="storeEntries.balancePaid">
        <div class="col text-caption text-grey-6">
          Paid:
          <span
            class="text-weight-bold"
            :class="useAmountColorClass(storeEntries.balancePaid)"
          >
            {{ useCurrencyFormatter(storeEntries.balancePaid) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { useCurrencyFormatter } from "src/use/useCurrencyFormatter";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useLightOrDark } from 'src/use/useLightOrDark';

const storeEntries = useStoreEntries();
</script>

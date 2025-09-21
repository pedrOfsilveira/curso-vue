<template>
  <q-slide-item
    left-color="positive"
    right-color="negative"
    @left="onLeft"
    @right="onRight"
    :id="`id-${ entry.id }`"
    :class="
      !entry.paid
        ? useLightOrDark('bg-white', 'bg-black')
        : useLightOrDark('bg-grey-2', 'bg-grey-10')"
  >
    <template v-slot:left>
      <q-icon name="done"></q-icon>
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold"
      >
        <span :class="{ 'text-strike': entry.paid }">{{ entry.name }}</span>
        <q-popup-edit
          buttons
          label-set="Ok"
          :cover="false"
          :offset="[16, 12]"
          anchor="top left"
          :model-value="entry.name"
          auto-save
          @save="onNameUpdate"
          v-slot="scope"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none"
            v-model="scope.value"
            dense
            autofocus
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        side
        top
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold justify-center"
      >
        <span :class="{ 'text-strike': entry.paid }">{{
          useCurrencyFormatter(entry.amount)
        }}</span>
        <q-popup-edit
          buttons
          label-set="Ok"
          :cover="false"
          :offset="[16, 12]"
          anchor="top left"
          :model-value="entry.amount"
          @save="onAmountUpdate"
          auto-save
          v-slot="scope"
        >
          <q-input
            input-class="text-weight-bold letter-spacing-none text-right"
            v-model.number="scope.value"
            step="0.01"
            type="number"
            dense
            autofocus
            @keyup.enter="scope.set"
            v-select-all
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          class="q-mr-none"
          :class="useAmountColorClass(storeEntries.runningBalance[index])"
          size="9px"
          outline
          dense
        >
          {{ useCurrencyFormatter(storeEntries.runningBalance[index]) }}
        </q-chip>
      </q-item-section>

      <q-item-section side v-if="storeEntries.options.sort">
        <q-icon class="handle" name="reorder" color="primary" />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries";
import { useStoreSettings } from "src/stores/storeSettings";
import { useCurrencyFormatter } from "src/use/useCurrencyFormatter";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useLightOrDark } from "src/use/useLightOrDark";
import { useQuasar } from "quasar";
import vSelectAll from "src/directives/directiveSelectAll";

/* store */
const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

/* props */

const props = defineProps({
  entry: Object,
  index: Number,
});

/* quasar */
const $q = useQuasar();

/* slide */
const onRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) {
    promptToDelete(reset);
  } else {
    storeEntries.deleteEntry(props.index);
  }
};

const promptToDelete = (reset) => {
  $q.dialog({
    title: "Delete Entry",
    message: `
    Delete this entry?
    <div class="q-mt-md text-weight-bold ${useAmountColorClass(
      props.entry.amount
    )}">
      ${props.entry.name}: ${useCurrencyFormatter(props.entry.amount)}
    </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id, props.index);
      $q.notify({
        message: "Entry deleted",
        position: "top",
      });
    })
    .onCancel(() => {
      reset();
    });
};
const onLeft = ({ reset }) => {
  storeEntries.updateEntry(props.index, { paid: !props.entry.paid });
  reset();
};

/* name and amount update */

const onNameUpdate = (newName) => {
  storeEntries.updateEntry(props.index, { name: newName });
};

const onAmountUpdate = (newAmount) => {
  storeEntries.updateEntry(props.index, { amount: newAmount });
};
</script>

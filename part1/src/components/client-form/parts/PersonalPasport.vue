<template>
  <div class="client-form__section pasport">
    <h2 class="client__sub-title pasport__title sub-title">Паспорт</h2>
    <clientSelect
      :options="type.names"
      :selected="typeSelected"
      :label="'Тип документа'"
      @select="$emit('update:typePassport', $event)"
      class="pasport__item"
      :mainClass="`pasport__type`"
      :invalid="invalid"
      :name="`type`"
    />
    <div
      class="pasport__item item-input"
      v-for="item, name in inputs"
      :class="[item.class, {'active': focusItem===name||$props[name]}]"
      :key="name"
      @click="focusInput($event,'pasport__item')"
    >
      <div class="item-input__wrapper">
        <input
          @input.passive="inputUpdate(name, $event.target.value.trim())"
          class="client-form__input item-input__input"
          type="text"
          @focus="focusItem = name;"
          @blur="focusItem=null"
          :value="$props[name]"
        >
        <label class="client-form__label item-input__label">{{item.label}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import ClientSelect from "@/common/ui-select.vue";
import focusInput from "@/mixins/input-methods.js";
export default {
  name: "client-pasport",
  components: {
    ClientSelect,
  },
  mixins: [focusInput],
  props: ["typeSelected", "serial", "number", "issuedBy", "date", "invalid"],

  data() {
    return {
      focusItem: null,
      inputs: {
        serial: {
          label: "Серия",
        },
        number: {
          label: "Номер",
        },
        issuedBy: {
          label: "Кем выдан",
        },
        date: {
          label: "Дата выдачи",
        },
      },
      type: {
        label: "Тип документа",
        names: ["Паспорт", "Свидетельство о рождении", "Вод. удостоверение"],
      },
    };
  },
};
</script>
<style lang="sass">
.pasport
  &__item
    &:not(:last-child)
      margin: 0 0 20px 0

  @media (min-width:$tabletWidth + 'px')
    display: grid
    grid-template-columns: 1fr 1fr
    align-items: center
    gap: 20px
    &__item
      &:not(:last-child)
        margin: 0
  &__title
    grid-column: 1 / 3
</style>
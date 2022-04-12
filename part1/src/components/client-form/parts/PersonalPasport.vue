<template>
  <div class="client-form__section pasport">
    <h2 class="client__sub-title pasport__title sub-title">Паспорт</h2>
    <clientSelect
      :options="formData.type.names"
      :selected="isData.type"
      :label="'Тип документа'"
      @select="emitForm('type' , $event)"
      class="pasport__item"
      :mainClass="`pasport__type`"
      :invalid="invalid"
      :name="`type`"
    />

    <client-input
      v-for="item, name in formData.inputs"
      :class="[item.class, {'active': focusItem===name||isData[name]}, 'pasport__item']"
      :key="name"
      :warnClass="`client-form__invalid client-form__invalid--required`"
      :isInvalid="false"
      :inputClass="`client-form__input`"
      :isValue="isData[name]"
      :labelClass="`client-form__label`"
      :labelValue="item.label"
      @isInput="emitForm(name , $event)"
      @inputFocus="focusItem = name"
      @inputBlur="focusItem=null"
      @click.native="focusInput($event,'pasport__item')"
    ></client-input>
  </div>
</template>

<script>
import ClientSelect from "@/common/ui-select.vue";
import focusInput from "@/mixins/input-methods.js";
import ClientInput from "@/common/ui-input.vue";
export default {
  name: "client-pasport",
  components: {
    ClientSelect,
    ClientInput,
  },
  mixins: [focusInput],
  props: ["isData", "invalid"],

  data() {
    return {
      focusItem: null,
      formData: {
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
      },
    };
  },
  methods: {
    emitForm(name, value) {
      this.$emit("formData", { name, value });
    },
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
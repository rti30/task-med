<template>
  <div class="client-form__section address">
    <h2 class="client__sub-title address__title sub-title">Адрес</h2>
    <client-input
      v-for="item, name in formData"
      :class="[item.class, {'active': focusItem===name||isData[name]}, 'address__item']"
      :key="name"
      :warnClass="`client-form__invalid client-form__invalid--required`"
      :isInvalid="(name in invalid)&&!invalid[name].required&&invalid[name].$dirty"
      :inputClass="`client-form__input`"
      :isValue="isData[name]"
      :labelClass="`client-form__label`"
      :labelValue="item.label"
      @isInput="emitForm(name , $event)"
      @inputFocus="focusItem = name"
      @inputBlur="focusItem=null"
      @click.native="focusInput($event,'address__item')"
    ></client-input>
  </div>
</template>

<script>
import focusInput from "@/mixins/input-methods.js";

import ClientInput from "@/common/ui-input.vue";
export default {
  name: "client-address",
  components: {
    ClientInput,
  },
  mixins: [focusInput],
  props: ["isData", "invalid"],
  data() {
    return {
      focusItem: null,
      formData: {
        index: {
          label: "Индекс",
        },
        country: {
          label: "Страна",
        },
        region: {
          label: "Область",
        },
        city: {
          label: "Город",
        },
        street: {
          label: "Улица",
        },
        house: {
          label: "Дом",
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
.address
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
<template>
  <div class="client-form__section address">
    <h2 class="client__sub-title address__title sub-title">Адрес</h2>
    <div
      class="address__item item-input"
      v-for="item, name in address"
      :class="[item.class, {'active': focusItem===name||$props[name]}]"
      :key="item.id"
      @click="focusInput($event,'address__item')"
    >

      <div
        class="item-input__wrapper"
        :class="{'item-input__input--warn':(name in invalid)&&!invalid[name].required&&invalid[name].$dirty}"
      >
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
      <div
        class="client-form__invalid client-form__invalid--required"
        v-if="(name in invalid)&&!invalid[name].required&&invalid[name].$dirty"
      >Поле должно быть заполнено
      </div>
    </div>
  </div>
</template>

<script>
import focusInput from "@/mixins/input-methods.js";
export default {
  name: "client-address",
  components: {},
  mixins: [focusInput],
  props: ["index", "country", "region", "city", "street", "house", "invalid"],
  data() {
    return {
      focusItem: null,
      address: {
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
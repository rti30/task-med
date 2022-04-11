<template>
  <div
    class="select item-input"
    :class="[{'active': isFocus||selected}, mainClass]"
  >
    <div
      class="item-input__wrapper"
      :class="{'item-input__input--warn':(name in invalid)&&!invalid[name].required&&invalid[name].$dirty}"
    >
      <label
        tabindex="0"
        :value="currentSelect"
        @focus="isFocus=true"
        @blur="hideOptions"
        class="select__button client-form__input item-input__input item-input__input--light"
      >{{selected}}</label>
      <label
        class="client-form__label item-input__label item-input__label--light"
        @click="isFocus=true"
      >{{label}}</label>
      <ul
        v-if="isFocus"
        class="select__options"
      >
        <li
          class="select__option"
          v-for="option in options"
          :key="option"
          @click="select(option)"
        >
          {{option}}
        </li>
      </ul>
    </div>
    <div
      class="client-form__invalid client-form__invalid--required"
      v-if="(name in invalid)&&!invalid[name].required&&invalid[name].$dirty"
    >Поле должно быть заполнено
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: "Выберете...",
    },
    selected: {
      type: String,
      default: "",
    },
    mainClass: {
      type: String,
      default: "",
    },
    invalid: {
      default() {
        return {};
      },
    },
    name: {
      default: "",
    },
  },
  data() {
    return {
      isFocus: false,
    };
  },
  computed: {
    currentSelect() {
      return this.selected ? this.selected : "";
    },
  },
  methods: {
    select(option) {
      this.$emit("select", option);
      this.hideOptions();
    },
    hideOptions() {
      setTimeout(() => {
        this.isFocus = false;
      }, 150);
    },
  },
};
</script>

<style lang="sass">
</style>
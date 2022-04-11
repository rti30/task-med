<template>
  <div
    class="personal__item personal__phone item-input"
    :class="{'active': isFocus||validValue}"
    @click="focusInput($event, 'personal__phone')"
  >
    <div class="item-input__wrapper">
      <input
        class="client-form__input item-input__input"
        type="tel"
        @focus="isFocus = true;"
        @blur="isFocus=false"
        :placeholder="isFocus?'+7(___)—___—____':''"
        @input.passive="isInput"
        :value="inputMask"
        @keyup.delete="customDelete"
        ref="phone"
      >
      <label class="client-form__label item-input__label">{{"Телефон"}}</label>
    </div>
    <div
      class="client-form__invalid client-form__invalid--required"
      v-if="('phone' in invalid)&&!invalid['phone'].required&&invalid['phone'].$dirty"
    >Поле должно быть заполнено
    </div>
    <div
      class="client-form__invalid client-form__invalid--min"
      v-else-if="('phone' in invalid)&&!invalid['phone'].minLength&&invalid['phone'].$dirty"
    >Телефон должен состоять из {{invalid['phone'].$params.minLength.min}} цифр
    </div>
  </div>
</template>

<script>
import customDelete from "@/mixins/input-delete.js";
import focusInput from "@/mixins/input-methods.js";
export default {
  mixins: [customDelete, focusInput],
  props: {
    invalid: {
      default: {},
    },
    propsValue: {
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.propsValue,
      isFocus: false,
      code: 7,
    };
  },
  computed: {
    validValue() {
      let value = this.inputValue.replace(/\D/g, "").slice(0, 11);
      return value.length > 1 ? value.slice(1, 11) : "";
    },

    inputMask() {
      let value = this.validValue;
      let cursorIndex = () => {
        if (value.length <= 3) {
          return this.validValue.length + 3;
        } else if (value.length > 3 && value.length <= 6) {
          return this.validValue.length + 5;
        } else if (value.length > 6 && value.length <= 10) {
          return this.validValue.length + 6;
        } else return this.validValue.length;
      };
      const cursor = () => {
        setTimeout(() => {
          this.$refs.phone.selectionStart = this.$refs.phone.selectionEnd =
            cursorIndex();
        });
      };
      if (value) {
        let result = "";
        if (value.length <= 3) {
          while (value.length < 3) {
            value += "_";
          }
          cursor();
          result = `+7(${value})—___—____`;
          return result;
        }
        if (value.length > 3 && value.length <= 6) {
          const part1 = value.slice(0, 3);
          let part2 = value.slice(3, 6);
          while (part2.length < 3) {
            part2 += "_";
          }
          cursor();
          result = `+7(${part1})—${part2}—____`;
          return result;
        }
        if (value.length > 6 && value.length <= 10) {
          const part1 = value.slice(0, 3);
          const part2 = value.slice(3, 6);
          let part3 = value.slice(6, 10);
          while (part3.length < 4) {
            part3 += "_";
          }
          cursor();
          result = `+7(${part1})—${part2}—${part3}`;
          return result;
        }
        cursor();
        return value;
      } else return "";
    },
  },
  methods: {
    isInput(e) {
      this.inputValue =
        e.target.value.length > 1
          ? e.target.value
          : "+" + this.code + e.target.value;
      this.$emit("phone", this.code + this.validValue);
    },
  },
  watch: {
    propsValue(val) {
      this.inputValue = val;
    },
  },
};
</script>
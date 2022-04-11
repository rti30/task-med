
   <template>
  <div
    class="personal__item personal__birthday item-input"
    :class="{'active': isFocus||validInput}"
    @click="focusInput($event, 'personal__birthday')"
  >
    <div
      class="item-input__wrapper"
      :class="{'item-input__input--warn': !isValid}"
    >
      <input
        class="client-form__input item-input__input"
        type="tel"
        @focus="isFocus = true;"
        @blur="isFocus=false"
        :placeholder="isFocus?'дд—мм—гггг':''"
        @input.passive="isInput"
        :value="inputMask"
        @keyup.delete="customDelete"
        ref="birthday"
      >
      <label class="client-form__label item-input__label">Дата рождения</label>
    </div>
    <div
      class="client-form__invalid client-form__invalid--required"
      v-if="!isValid"
    >Такой даты не существует
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
      isValidDate: false,
    };
  },
  computed: {
    isValid() {
      return (
        ("birthday" in this.invalid &&
          this.invalid["birthday"].required &&
          this.isValidDate) ||
        !this.invalid["birthday"].$dirty
      );
    },
    validInput() {
      return this.inputValue.replace(/\D/g, "").substr(0, 8);
    },
    inputMask() {
      let value = this.validInput;
      let cursorIndex = () => {
        if (value.length <= 2) {
          return this.validInput.length;
        } else if (value.length > 2 && value.length <= 4) {
          return this.validInput.length + 1;
        } else if (value.length > 4 && value.length <= 8) {
          return this.validInput.length + 2;
        } else return this.validInput.length;
      };
      const cursor = () => {
        setTimeout(() => {
          this.$refs.birthday.selectionStart =
            this.$refs.birthday.selectionEnd = cursorIndex();
        });
      };
      if (value) {
        if (value.length <= 2) {
          while (value.length < 2) {
            value += "д";
          }
          cursor();
          return `${value}—мм—гггг`;
        }
        if (value.length > 2 && value.length <= 4) {
          const part1 = value.slice(0, 2);
          let part2 = value.slice(2, 4);
          while (part2.length < 2) {
            part2 += "м";
          }
          cursor();
          return `${part1}—${part2}—гггг`;
        }
        if (value.length > 4 && value.length <= 8) {
          const part1 = value.slice(0, 2);
          const part2 = value.slice(2, 4);
          let part3 = value.slice(4, 8);
          while (part3.length < 4) {
            part3 += "г";
          }
          cursor();
          return `${part1}—${part2}—${part3}`;
        }
        cursor();
        return value;
      } else return "";
    },
  },
  methods: {
    isInput(e) {
      this.inputValue = e.target.value;
      if (this.validDate(this.inputMask)) {
        this.isValidDate = true;
        this.$emit("birthday", this.inputMask);
      } else {
        this.isValidDate = false;
      }
    },
    validDate(date) {
      const dateArr = date?.split("—");
      let [day, month, year] = [dateArr[0], dateArr[1], dateArr[2]];
      [day, month, year] = [+day, +month, +year];
      if (
        Number.isInteger(day) &&
        Number.isInteger(month) &&
        Number.isInteger(year)
      ) {
        if (month == 2) {
          if (day == 29) {
            if (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) {
              return false;
            }
          } else if (day > 28) {
            return false;
          }
        } else if (
          (month == 4 || month == 6 || month == 9 || month == 11) &&
          day > 30
        ) {
          return false;
        }
        if (day > 31 || month > 12) {
          return false;
        }
        return true;
      } else return false;
    },
  },
  watch: {
    propsValue(val) {
      this.inputValue = val;
    },
  },
};
</script>

<style lang="sass">
</style>
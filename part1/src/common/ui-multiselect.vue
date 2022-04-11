<template>
  <div
    class="select item-input"
    :class="[{'active': isFocus||selected.length}, mainClass]"
  >
    <div
      class="item-input__wrapper"
      :class="{'item-input__input--warn': ('phone' in invalid)&&!invalid['phone'].required&&invalid['phone'].$dirty}"
    >
      <label
        tabindex="0"
        class="select__button client-form__input item-input__input item-input__input--light"
        @focus="isFocus=true"
        @keydown.tab="hideOptions($event,'root')"
      >
        <ul class="select__selected selected">
          <li
            v-for="item in selected"
            :key="item"
            class="selected__item"
          >
            <span class="selected__name">{{item}}</span>
            <span
              class="selected__delete"
              @click="select(item)"
            >&#10006;</span>
          </li>

        </ul>
      </label>
      <label
        class="client-form__label item-input__label item-input__label--light"
        @click="isFocus=true"
      >Группы клиента
      </label>
      <ul
        v-if="isFocus"
        class="select__options"
      >
        <li
          class="select__option"
          :class="{'select__option--active':selected.some(item=>item===option)}"
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
      v-if="('phone' in invalid)&&!invalid['phone'].required&&invalid['phone'].$dirty"
    >Поле должно быть заполнено
    </div>
  </div>
</template>

<script>
import focusInput from "@/mixins/input-methods.js";
export default {
  mixins: [focusInput],
  props: {
    invalid: {
      default: {},
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    selected: {
      type: Array,
      default() {
        return [];
      },
    },
    mainClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFocus: false,
      selectedArr: [],
    };
  },
  computed: {},
  methods: {
    select(option) {
      const has = (option) => this.selectedArr.some((item) => item === option);
      if (has(option)) {
        this.selectedArr = this.selectedArr.filter((item) => item !== option);
      } else {
        this.selectedArr.push(option);
      }

      this.$emit("select", this.selectedArr);
    },
    hideOptions(e, root) {
      if (!e.target.closest(`.${this.mainClass}`) || !!root) {
        this.isFocus = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.hideOptions.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideOptions.bind(this));
  },
};
</script>

<style lang="sass">
.personal__groups
  .select__button
    min-height: 70px
    height: auto

.selected
  display: flex
  flex-wrap: wrap
  gap: 0 4px
  &__item
    padding: 4px 8px
    border-radius: 10px
    background-color: $c-light
    position: relative
  &__delete
    font-size: 10px
    position: absolute
    top: 0
    display: flex
    justify-content: center
    align-items: center
    right: 4px
    height: 15px
    width: 15px
    background-color: $bg-color
    border-radius: 50%
</style>
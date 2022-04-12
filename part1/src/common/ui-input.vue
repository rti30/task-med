<template>
  <div class="item-input">
    <div
      class="item-input__wrapper"
      :class="{classWarn:isInvalid}"
    >
      <input
        @input.passive="$emit(`isInput`,$event.target.value.trim())"
        class="item-input__input"
        :class="inputClass"
        type="text"
        @focus="$emit('inputFocus', true)"
        @blur="$emit('inputBlur', true)"
        :value="isValue"
      >
      <label class="client-form__label item-input__label">{{labelValue}}</label>
    </div>
    <div
      :class="warnClass"
      v-if="isInvalid"
    >Поле должно быть заполнено
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "classWarn",
    "inputClass",
    "isValue",
    "labelClass",
    "labelValue",
    "warnClass",
    "isInvalid",
  ],
};
</script>

<style lang="sass">
</style>

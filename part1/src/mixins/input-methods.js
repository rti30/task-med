
export default {
   methods: {
      focusInput(e, className) {
         const wrapper = e.target.closest(`.${className}`);
         wrapper?.querySelector("input")?.focus();
      },
      focusLabel(e, className) {
         console.log(e);
         const wrapper = e.target.closest(`.${className}`);
         wrapper?.querySelector("label")?.focus();
      },
      inputUpdate(name, value) {
         value = value ? value[0].toUpperCase() + value.substring(1, value.length) : "";
         this.$emit(`update:${name}`, value);
      },
   },
};
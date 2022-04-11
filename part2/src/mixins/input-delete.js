
export default {
   methods: {
      customDelete(e) {
         e.target.value.slice(e.selectionStart - 1, e.selectionEnd);
      },
   },
};
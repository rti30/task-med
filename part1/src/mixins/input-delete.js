
export default {
   methods: {
      customDelete(e) {
         //Разрешаю удаление только с конца. Можно придумать решения по-лучше, но в реальных проектах, наверное, используются плагины
         e.target.value.slice(e.selectionStart - 1, e.selectionEnd);
      },
   },
};
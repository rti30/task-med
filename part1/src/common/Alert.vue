<template>
  <div
    v-if="messages.length"
    class="alert text"
  >
    <transition-group name="fade">
      <div
        class="alert__text"
        v-for="message in messages"
        :key="message.id"
      >
        {{ message.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      counter: 0,
    };
  },
  methods: {
    remove(id) {
      this.messages = this.messages.filter((msg) => msg.id !== id);
    },
    add(text) {
      let id = ++this.counter;
      this.messages.push({ id, text });
      setTimeout(() => {
        this.remove(id);
      }, 3000);
    },
  },
};
</script>

<style lang="sass">
.alert
  margin-top: 50px
  position: fixed
  width: 100%
  z-index: 999999
  display: flex
  flex-direction: column
  align-items: center

  // .alert__text
  &__text
    background-color: #ffffff
    color: $c-light
    border: 1px solid $c-light
    text-align: center
    padding: 40px 15px
</style>
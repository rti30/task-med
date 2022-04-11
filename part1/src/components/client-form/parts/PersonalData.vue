<template>
  <div class="client-form__section personal">
    <h2 class="client__sub-title personal__title sub-title">Личная информация</h2>
    <div
      class="personal__item item-input"
      v-for="item, name in main.inputs"
      :key="name"
      @click="focusInput($event,'personal__item')"
      :class="[item.class, {'active': focusItem===name||$props[name]}]"
    >
      <div
        class="item-input__wrapper"
        :class="{'item-input__input--warn':(name in invalid)&&!invalid[name].required&&invalid[name].$dirty}"
      >
        <input
          @input.passive="inputUpdate(name,$event.target.value.trim())"
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
    <div class="personal__gender personal-gender">
      <h4 class="personal__sub-title personal-gender__title">Пол</h4>
      <div
        class="personal__item radio-item"
        v-for="item in radioGender"
        :class="[item.class, {'checked': genderChecked===item.value}]"
        :key="item.value"
        @pointerdown="addEventClass($event, 'active')"
        @pointerout="removeEventClass($event, 'active')"
        @pointerover="addEventClass($event, 'active')"
        @click="$emit(`update:${item.name}`, item.value)"
      >
        <input
          @change="$emit(`update:${item.name}`, item.value)"
          class="client-form__radio radio-item__radio"
          type="radio"
          :name="item.name"
          :value="item.value"
        >
        <label class="client-form__label radio-item__label">{{item.label}}</label>
      </div>
      <div
        class="personal-gender__delete"
        @click="$emit(`update:gender`, '')"
        v-if="genderChecked"
      >&#8635;</div>
    </div>
    <div
      class="personal__item checkbox-item"
      v-for="item in checkboxSms"
      :class="[item.class, {'checked': smsNotice}]"
      :key="item.id"
      @pointerdown="addEventClass($event, 'active')"
      @pointerout="removeEventClass($event, 'active')"
      @pointerover="addEventClass($event, 'active')"
      @click="$emit(`update:${item.name}`, !smsNotice)"
    >
      <input
        @change="$emit(`update:${item.name}`, !smsNotice)"
        class="checkbox-item__box"
        type="checkbox"
        :name="item.name"
        @focus="addEventClass($event, 'active')"
        @blur="removeEventClass($event, 'active')"
      >
      <label class="client-form__label checkbox-item__label">{{item.label}}</label>
    </div>
    <clientSelect
      :options="select.doctors"
      :selected="doctorSelected"
      @select="$emit('update:doctor', $event)"
      :label="'Лечащий врач'"
      class="personal__item"
      :mainClass="`personal__doctor`"
    />
    <clientMultiselect
      :options="multiSelect.groups"
      :selected="groupsSelected"
      @select="$emit('update:groups', $event)"
      class="personal__item"
      :mainClass="`personal__groups`"
      :invalid="invalid"
    />
    <client-birthday
      :invalid="invalid"
      @birthday="$emit('birthday', $event)"
      :propsValue="propsBirthday"
    />
    <client-phone
      @phone="$emit('phone', $event)"
      :invalid="invalid"
      :propsValue="propsPhone"
    />
  </div>
</template>

<script>
import ClientSelect from "@/common/ui-select.vue";
import ClientMultiselect from "@/common/ui-multiselect.vue";
import ClientBirthday from "@/common/input-birthday.vue";
import ClientPhone from "@/common/input-phone.vue";
import customDelete from "@/mixins/input-delete.js";
import focusInput from "@/mixins/input-methods.js";
export default {
  name: "client-data",
  components: {
    ClientSelect,
    ClientMultiselect,
    ClientBirthday,
    ClientPhone,
  },
  mixins: [customDelete, focusInput],
  props: {
    surname: { default: "" },
    name: { default: "" },
    patronymic: { default: "" },
    genderChecked: {
      default: "",
    },
    smsNotice: {
      default: false,
    },
    doctorSelected: {
      default: "",
    },
    groupsSelected: {
      default: [],
    },
    propsPhone: {
      default: "",
    },
    propsBirthday: {
      default: "",
    },
    invalid: {
      default: {},
    },
  },
  data() {
    return {
      focusItem: null,
      main: {
        inputs: {
          surname: {
            label: "Фамилия",
            class: "personal__surname",
          },
          name: {
            label: "Имя",
            class: "personal__name",
          },
          patronymic: {
            label: "Отчество",
            class: "personal__patronymic",
          },
        },
      },

      radioGender: [
        {
          label: "Мужской",
          value: "men",
          class: "personal__radio",
          name: "gender",
        },
        {
          value: "women",
          label: "Женский",
          class: "personal__radio",
          name: "gender",
        },
      ],
      checkboxSms: [
        {
          id: "smsNotice",
          label: "Не отправлять СМС",
          class: "personal__smsNotice",
          name: "notice",
        },
      ],
      select: {
        doctors: ["Не выбрано", "Иванов", "Захаров", "Чернышева"],
      },
      multiSelect: {
        groups: ["VIP", "Проблемные", "ОМС"],
      },
    };
  },
  computed: {},
  methods: {
    addEventClass(e, name) {
      const item = e.target.closest(".checkbox-item");
      item?.classList.add(name);
    },
    removeEventClass(e, name) {
      const item = e.target.closest(".checkbox-item");
      item?.classList.remove(name);
    },
  },
};
</script>
<style lang="sass">
@import "@/assets/style/mixins.sass"

.personal
  display: grid
  grid-template-areas: "title" "surname" "name" "patronymic" "birthday" "phone" "gender" "groups" "doctor" "sms"
  gap: 20px
  @media (min-width:$tabletWidth + 'px')
    grid-template-areas: "title title" "surname name" "patronymic birthday" "phone gender" "groups doctor" "sms sms"
    grid-template-columns: 1fr 1fr
    align-items: center
  &__title
    grid-area: title
    margin: 0
  &__surname
    grid-area: surname
  &__name
    grid-area: name
  &__patronymic
    grid-area: patronymic
  &__birthday
    grid-area: birthday
  &__phone
    grid-area: phone
  &__gender
    grid-area: gender
  &__groups
    grid-area: groups
  &__doctor
    grid-area: doctor
  &__smsNotice
    grid-area: sms
    position: relative
    justify-self: start

.personal-gender
  position: relative
  display: grid
  grid-template-areas: "title title" "man woman"
  justify-content: space-around
  border: 1px solid $border-color
  border-radius: 5px
  padding: 5px 10px
  gap: 5px 0

  &__title
    grid-area: title
    text-align: center
    font-size: 16px
    @media (min-width:$tabletWidth + 'px')
      font-size: 18px

  &__m
    grid-area: man
  &__w
    grid-area: woman
  &__delete
    cursor: pointer
    font-size: 10px
    position: absolute
    top: 0
    display: flex
    justify-content: center
    align-items: center
    right: 4px
    height: 20px
    width: 20px
    background-color: #b3d7ff
    border-radius: 50%
</style>

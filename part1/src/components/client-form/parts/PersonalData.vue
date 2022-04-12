<template>
  <div class="client-form__section personal">
    <h2 class="client__sub-title personal__title sub-title">Личная информация</h2>
    <client-input
      v-for="item, name in formData.inputs"
      :class="[item.class, {'active': focusItem===name||isData[name]}, 'personal__item']"
      :key="name"
      :warnClass="`client-form__invalid client-form__invalid--required`"
      :isInvalid="(name in invalid)&&!invalid[name].required&&invalid[name].$dirty"
      :inputClass="`client-form__input`"
      :isValue="isData[name]"
      :labelClass="`client-form__label`"
      :labelValue="item.label"
      @isInput="emitForm(name , $event)"
      @inputFocus="focusItem = name"
      @inputBlur="focusItem=null"
      @click.native="focusInput($event,'personal__item')"
    ></client-input>

    <div class="personal__gender personal-gender">
      <h4 class="personal__sub-title personal-gender__title">Пол</h4>
      <div
        class="personal__item radio-item"
        v-for="item in formData.radioGender"
        :class="[item.class, {'checked': isData.gender===item.value}]"
        :key="item.value"
        @pointerdown="addEventClass($event, 'active')"
        @pointerout="removeEventClass($event, 'active')"
        @pointerover="addEventClass($event, 'active')"
        @click="emitForm(item.name , item.value)"
      >
        <input
          @change="emitForm(item.name , item.value)"
          class="client-form__radio radio-item__radio"
          type="radio"
          :name="item.name"
          :value="item.value"
        >
        <label class="client-form__label radio-item__label">{{item.label}}</label>
      </div>
      <div
        class="personal-gender__delete"
        @click="emitForm('gender' , '')"
        v-if="isData.gender"
      >&#8635;</div>
    </div>
    <div
      class="personal__item checkbox-item"
      v-for="item in formData.checkboxSms"
      :class="[item.class, {'checked': isData.notice}]"
      :key="item.id"
      @pointerdown="addEventClass($event, 'active')"
      @pointerout="removeEventClass($event, 'active')"
      @pointerover="addEventClass($event, 'active')"
      @click="emitForm(item.name , !isData.notice)"
    >
      <input
        @change="emitForm(item.name , !isData.notice)"
        class="checkbox-item__box"
        type="checkbox"
        :name="item.name"
        @focus="addEventClass($event, 'active')"
        @blur="removeEventClass($event, 'active')"
      >
      <label class="client-form__label checkbox-item__label">{{item.label}}</label>
    </div>
    <clientSelect
      :options="formData.select.doctors"
      :selected="isData.doctor"
      @select="emitForm('doctor' , $event)"
      :label="'Лечащий врач'"
      class="personal__item"
      :mainClass="`personal__doctor`"
    />
    <clientMultiselect
      :options="formData.multiSelect.groups"
      :selected="isData.groups"
      @select="emitForm('groups' , $event)"
      class="personal__item"
      :mainClass="`personal__groups`"
      :invalid="invalid"
    />
    <client-birthday
      :invalid="invalid"
      @birthday="emitForm('birthday' , $event)"
      :propsValue="isData.birthday"
    />
    <client-phone
      @phone="emitForm('phone' , $event)"
      :invalid="invalid"
      :propsValue="isData.phone"
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
import ClientInput from "@/common/ui-input.vue";
export default {
  name: "client-data",
  components: {
    ClientSelect,
    ClientMultiselect,
    ClientBirthday,
    ClientPhone,
    ClientInput,
  },
  mixins: [customDelete, focusInput],
  props: ["isData", "invalid"],
  data() {
    return {
      focusItem: null,

      formData: {
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
      },
    };
  },
  methods: {
    addEventClass(e, name) {
      const item = e.target.closest(".checkbox-item");
      item?.classList.add(name);
    },
    removeEventClass(e, name) {
      const item = e.target.closest(".checkbox-item");
      item?.classList.remove(name);
    },
    emitForm(name, value) {
      this.$emit("formData", { name, value });
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

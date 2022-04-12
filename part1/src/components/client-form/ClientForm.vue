<template>
  <section class="client">
    <div class="content-width">
      <h1 class="client__title title">Форма клиента</h1>
      <div class="client__body">
        <form
          @submit.prevent="onSubmit"
          class="client__form client-form"
        >
          <form-personal
            :isData="form.main"
            @formData="setData('main', $event)"
            :invalid="$v.form.main"
          />
          <form-address
            :isData="form.address"
            @formData="setData('address', $event)"
            :invalid="$v.form.address"
          />

          <form-pasport
            :isData="form.pasport"
            @formData="setData('pasport', $event)"
            :invalid="$v.form.pasport"
          />
          <div class="client__button">
            <button
              type="submit"
              class="btn-form"
            >Создать</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import FormPersonal from "@/components/client-form/parts/PersonalData.vue";
import FormAddress from "@/components/client-form/parts/PersonalAddress.vue";
import FormPasport from "@/components/client-form/parts/PersonalPasport.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "client-form",
  components: {
    FormPersonal,
    FormAddress,
    FormPasport,
  },
  data() {
    return {
      form: {},
      formTemplate: {
        main: {
          surname: "",
          name: "",
          patronymic: "",
          notice: false,
          gender: "",
          doctor: "",
          groups: [],
          phone: "",
          birthday: "",
        },
        address: {
          index: null,
          country: "",
          region: "",
          city: "",
          street: "",
          house: "",
        },
        pasport: {
          type: "",
          serial: "",
          number: "",
          issuedBy: "",
          date: "",
        },
      },
    };
  },
  validations: {
    form: {
      main: {
        surname: { required },
        name: { required },
        phone: { required, minLength: minLength(11) },
        birthday: { required },
      },
      address: {
        city: { required },
      },
      pasport: {
        type: { required },
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.$emit(
          "message",
          "Проверте правильность заполнения обязательных полей"
        );
        return;
      }
      this.form = JSON.parse(JSON.stringify(this.formTemplate));
      this.$v.$reset();
      this.$emit("message", "Форма успешно создана");
    },
    setData(nameData, { name, value }) {
      this.form[nameData][name] = value;
    },
  },
  beforeMount() {
    this.form = JSON.parse(JSON.stringify(this.formTemplate));
  },
};
</script>

<style lang="sass">
</style>

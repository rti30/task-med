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
            :surname.sync="form.main.surname"
            :name.sync="form.main.name"
            :patronymic.sync="form.main.patronymic"
            :gender.sync="form.main.gender"
            :genderChecked="form.main.gender"
            :notice.sync="form.main.notice"
            :smsNotice="form.main.notice"
            :doctor.sync="form.main.doctor"
            :doctorSelected="form.main.doctor"
            :groups.sync="form.main.groups"
            :groupsSelected="form.main.groups"
            @birthday="form.main.birthday=$event"
            :propsBirthday="form.main.birthday"
            @phone="form.main.phone=$event"
            :propsPhone="form.main.phone"
            :invalid="$v.form.main"
          />
          <form-address
            :index.sync="form.address.index"
            :country.sync="form.address.country"
            :region.sync="form.address.region"
            :city.sync="form.address.city"
            :street.sync="form.address.street"
            :house.sync="form.address.house"
            :invalid="$v.form.address"
          />

          <form-pasport
            :typeSelected="form.pasport.type"
            :typePassport.sync="form.pasport.type"
            :serial.sync="form.pasport.serial"
            :number.sync="form.pasport.number"
            :issuedBy.sync="form.pasport.issuedBy"
            :date.sync="form.pasport.date"
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
  },
  beforeMount() {
    this.form = JSON.parse(JSON.stringify(this.formTemplate));
  },
};
</script>

<style lang="sass">
</style>

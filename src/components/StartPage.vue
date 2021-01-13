<template>
  <div class="StartPage">
    <div class="row">
      <div class="input-field col s12 delivery-address">
        <span>Введите адрес доставки</span>

        <input
          id="delivery_address"
          type="text"
          class="validate"
          v-model="address"
        />
      </div>
    </div>

    <button id="show-modal" class="add-address" @click="showForm">
      Добавить адрес
    </button>

    <DeliveryAddressForm
      v-if="showModal"
      :savedAddresses="savedAddresses"
      @closeForm="closeForm"
      @selectAddress="selectAddress"
      @editDeliveryAddress="editDeliveryAddress"
    />
  </div>
</template>

<script>
import DeliveryAddressForm from "../components/DeliveryAddressForm.vue";

export default {
  components: { DeliveryAddressForm },
  name: "StartPage",
  proprs: {},
  data() {
    return {
      showModal: false,
      SuggestView: null,
      address: "",
      savedAddresses: new Array
    };
  },
  created() {},
  mounted() {},
  methods: {
    showForm() {
      this.showModal = true;
    },
    closeForm() {
      this.showModal = false;
    },
    selectAddress(address) {
      this.savedAddresses.push(address);
      this.address = address;
    },
    editDeliveryAddress(deliveryAddress) {
      this.$store.state.deliveryAddressInfo = deliveryAddress;
      this.$store.dispatch("sendDeliveryAddress", 1);
    }
  },
};
</script>

<style scoped>
.delivery-address {
  margin: 90px 0 0;
  text-align: center;
}
.add-address {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>

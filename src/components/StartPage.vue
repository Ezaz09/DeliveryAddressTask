<template>
  <div class="StartPage">
    <div class="row">
      <div class="input-field col s12 delivery-address">
        <label for="delivery_address">Введите адрес доставки</label>
        <input
          id="delivery_address"
          type="text"
          class="validate"
          v-model="address"
          list="savedAddresses"
        />
        <datalist id="savedAddresses">
          <option
            v-for="(address, i) in savedAddresses"
            :key="i"
            :value="address"
          >
            {{ address }}
          </option>
        </datalist>
      </div>
    </div>

    <button id="show-modal" class="add-address" @click="showPopup">
      Добавить адрес
    </button>

    <popup
      v-if="showModal"
      @closePopup="closePopup"
      @selectAddress="selectAddress"
    />
  </div>
</template>

<script>
import popup from "../components/popup-with-google.vue";

export default {
  components: { popup },
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
    showPopup() {
      this.showModal = true;
    },
    closePopup() {
      this.showModal = false;
    },
    selectAddress(address) {
      this.savedAddresses.push(address);
      this.address = address;
    },
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

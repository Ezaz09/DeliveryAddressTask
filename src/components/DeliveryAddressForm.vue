<template>
  <div class="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>Адрес доставки</span>
      </div>

      <div class="v-popup__content">
        <input type="text" v-model="location" list="addressesFromGoogle" />

        <datalist v-if="location == ''" id="addressesFromGoogle">
          <option
            v-for="(address, i) in savedAddresses"
            :key="i"
            :value="address"
          >
            {{ address }}
          </option>
        </datalist>

        <datalist v-else id="addressesFromGoogle">
          <option v-for="(result, i) in searchResults" :key="i" :value="result">
            {{ result }}
          </option>
        </datalist>
      </div>
      
      <div class="v-popup__footer">
        <button class="v-popup-save-data" @click="selectAddress">
          Сохрать
        </button>
        <button class="v-popup-close-form" @click="closeForm">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    savedAddresses: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  data: () => ({
    location: "",
    searchResults: [],
    service: null,
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=[API_KEY]&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit(), // will declare it in methods
        },
      ],
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },

    selectAddress() {
      if (this.location == "") {
        return;
      }

      const deliveryAddress = {
        value: this.location,
      };

      this.$emit("selectAddress", this.location);
      this.$emit("editDeliveryAddress", deliveryAddress);
      this.$emit("closeForm");
    },

    MapsInit() {
      // @ts-ignore
      this.service = new window.google.maps.places.AutocompleteService();
    },

    displaySuggestions(predictions, status) {
      // @ts-ignore
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions.map(
        (prediction) => prediction.description
      );
    },
  },
  computed: {},
  mounted() {},
  watch: {
    location(newValue) {
      if (newValue) {
        this.service.getPlacePredictions(
          {
            input: this.location,
          },
          this.displaySuggestions
        );
      }
    },
  },
};
</script>

<style lang="scss">
.popup_wrapper {
  background: rgba(64, 64, 64, 0.4);
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.v-popup {
  padding: 16px;
  position: fixed;
  top: 30%;
  width: 400px;
  background: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.v-popup-close-form {
  background-color: #f44336;
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
.v-popup-save-data {
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

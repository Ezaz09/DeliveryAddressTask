import Vue from 'vue'
import Vuex from 'vuex'
import axiosInstanse from "../api/axios"
import { MAIN_LINK } from "../api/axiosRoutes"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deliveryAddressInfo: new Object,
  },
  mutations: {

  },
  actions: {
    sendDeliveryAddress(){
      
      return axiosInstanse.post( MAIN_LINK(), this.state.deliveryAddressInfo).catch(err => console.log(err));
    }
  },
  modules: {
  }
})

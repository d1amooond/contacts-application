import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    contacts: [],
  },
  mutations: {
    loadContacts(state) {
      state.contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    },
    addContact(state, payload) {
      state.contacts = [...state.contacts, payload];
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    deleteContact(state, payload) {
      state.contacts = state.contacts.filter((el) => el.id !== payload.id);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    editContact(state, payload) {
      state.contacts = state.contacts.map((el) => el.id === payload.id ? payload : el);
      localStorage.setItem('contacts', JSON.stringify(state.contacts));
    },
    updateContacts(state, payload) {
      state.contacts = payload;
    },
  },
});

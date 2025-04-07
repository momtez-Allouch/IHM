import axios from "axios";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("counter", {
  state: () => ({
    categoryList: [],
    category: {},
  }),

  getters: {},

  actions: {
    async getAllCategories() {
      try {
        const data = await axios.get("http://localhost:3000/api/category");

        this.categoryList = data.data;
      } catch (error) {
        console.log(error);
      }
    },

    incrementBy(amount: number) {
      this.count += amount;
    },

    reset() {
      this.count = 0;
    },
  },
});

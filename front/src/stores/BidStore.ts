import axios from "axios";
import { defineStore } from "pinia";

export const useBidStore = defineStore("bid", {
  state: () => ({
    bidList: [],
    bid: {},
  }),

  getters: {},

  actions: {
    async getAllBids() {
      try {
        const data = await axios.get("http://localhost:3000/api/article");
        this.bidList = data.data;
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

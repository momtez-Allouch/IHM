<script setup>
import avatar1 from "@images/avatars/avatar-1.png";
import avatar2 from "@images/avatars/avatar-2.png";
import avatar3 from "@images/avatars/avatar-3.png";
import avatar4 from "@images/avatars/avatar-4.png";
import eCommerce2 from "@images/eCommerce/2.png";
import pages1 from "@images/pages/1.png";
import pages2 from "@images/pages/2.png";
import pages3 from "@images/pages/3.png";
import pages5 from "@images/pages/5.jpg";
import pages6 from "@images/pages/6.jpg";

import { useBidStore } from "@/stores/BidStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia/dist/pinia.prod.cjs";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const { getAllBids } = useBidStore();
const { bidList } = storeToRefs(useBidStore());

const isCardDetailsVisible = ref(false);

onMounted(async () => {
  await getAllBids();
});
</script>

<template>
  <div class="home-page">
    <VCard
      v-for="item in bidList"
      style="
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      "
    >
      <div>
        <VImg :src="item?.image" />

        <VCardItem>
          <VCardTitle>{{ item?.name }}</VCardTitle>
        </VCardItem>

        <VCardText>
          <p class="font-weight-medium text-base">
            {{ item?.begginingPrice }} TND
          </p>
        </VCardText>

        <VCardText>
          <p class="mb-0">
            {{ item?.description }}
          </p>
        </VCardText>
      </div>
      <div>
        <VBtn block class="rounded-t-0"> Add to cart </VBtn>
      </div>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
}
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}
:deep(.v-responsive) {
  height: 200px !important;
}
</style>

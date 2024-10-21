<template>
  <div
      @click="goToProduct(product.id)"
      class="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out flex flex-col justify-between p-6 h-full cursor-pointer"
  >
    <div class="relative overflow-hidden rounded-t-lg">
      <img
          :src="product.image"
          alt="Product image"
          class="w-full h-56 object-contain mb-4"
      />
      <div
          class="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-bold rounded-full p-2 shadow-lg">
        ${{ product.price }}
      </div>
    </div>

    <h3 class="text-xl font-semibold text-gray-800 mb-2 leading-snug line-clamp-2">
      {{ product.title }}
    </h3>

    <p class="text-gray-600 mb-4 text-sm leading-relaxed flex-grow line-clamp-3">
      {{ product.description.substring(0, 120) }}...
    </p>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';
import {useRouter} from 'vue-router';

const props = defineProps({
  product: Object
});

const router = useRouter();

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};
</script>

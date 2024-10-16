<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-6">Contact Us</h1>
      <p class="text-lg leading-relaxed mb-8">Got questions? We'd love to hear from you! Fill out the form below,
        and we'll get back to you as soon as possible.</p>
    </div>

    <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" v-model="name" id="name" class="mt-1 block w-full p-2 border border-gray-300 rounded-md
          shadow-sm focus:outline-none focus:ring focus:ring-green-500" placeholder="John Doe" required/>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="email" id="email" class="mt-1 block w-full p-2 border border-gray-300
          rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500" placeholder="you@example.com"
                 required/>
        </div>

        <div class="mb-6">
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea v-model="message" id="message" rows="4" class="mt-1 block w-full p-2 border border-gray-300
          rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-500"
                    placeholder="Write your message here..." required></textarea>
        </div>

        <button type="submit" class="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600
        focus:outline-none focus:ring focus:ring-green-300 transition ease-in-out">Send Message
        </button>
      </form>
    </div>
  </div>
  <!-- FAQs Section to press footer down-->
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mb-8">
    <h2 class="text-2xl mb-4">Frequently Asked Questions</h2>
    <ul>
      <li class="mb-2">
        <strong>Q: How can I place an order?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: What payment methods do you accept?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Can I track my order?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: What is your return policy?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: How can I contact customer service?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Do you offer international shipping?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: How long does shipping take?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Can I change or cancel my order after it's been placed?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: What should I do if I receive a defective item?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Do you offer gift cards?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: How can I create an account?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: What if I forget my password?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Do you have a size guide?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: Can I return items purchased on sale?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
      <li class="mb-2">
        <strong>Q: How can I provide feedback about my shopping experience?</strong><br />
        A: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');

function submitForm() {
  alert(`Thank you, ${name.value}! We'll get back to you shortly.`);
  name.value = '';
  email.value = '';
  message.value = '';
}
</script>

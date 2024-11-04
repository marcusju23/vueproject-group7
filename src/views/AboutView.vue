<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl font-bold mb-6">About Us</h1>
      <p class="text-lg leading-relaxed mb-8">
        Welcome to our store! We are a team of dedicated developers who have worked hard to create this platform for you
        to enjoy and use. Below is more information about us and our goals. </p>
    </div>

    <div class="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
      <h2 class="text-3xl font-semibold mb-6">Our Team</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-gray-100 rounded-lg p-6">
          <img
              src="/src/assets/images/Daniel.png"
              alt="Team member 1"
              class="rounded-full mx-auto w-28 h-28 object-cover mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">
            Daniel<br/>Bäckberg
          </h3>
          <p class="text-gray-700">Product Owner</p>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
          <img
              src="/src/assets/images/Marcus.png"
              alt="Team member 2"
              class="rounded-full mx-auto w-28 h-28 object-cover mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">
            Marcus<br/>Olsson
          </h3>
          <p class="text-gray-700">Scrum Master</p>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
          <img
              src="/src/assets/images/Dennis.png"
              alt="Team member 3"
              class="rounded-full mx-auto w-28 h-28 object-cover mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">
            Dennis<br/>Staffansson
          </h3>
          <p class="text-gray-700">Developer</p>
        </div>

        <div class="bg-gray-100 rounded-lg p-6">
          <img
              src="/src/assets/images/Rishad.png"
              alt="Team member 4"
              class="rounded-full mx-auto w-28 h-28 object-cover mb-4"
          />
          <h3 class="text-xl font-semibold mb-2">
            Rishad<br/>Mahmudi
          </h3>
          <p class="text-gray-700">Developer</p>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto text-center mt-10">
      <h2 class="text-3xl font-semibold mb-4">Our Mission</h2>
      <p class="text-lg leading-relaxed">
        Our mission is to create innovative solutions that meet the needs of our users. Through the use of our amazing online store,
        you can easily browse and find products that fit your needs. We as a team believe in the power of
        collaboration and strive to deliver high-quality results and will always strive to make our customers happy.
      </p>
    </div>
    <div class="mt-8 text-center">
      <h2 class="text-3xl font-semibold mb-4">Follow Us</h2>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="https://www.youtube.com/watch?v=h9uFQv3t1AU" target="_blank"
           class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 transition ease-in-out duration-150">
          YouTube
        </a>

        <a href="https://www.youtube.com/watch?v=h9uFQv3t1AU" target="_blank"
           class="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 transition ease-in-out duration-150">
          Instagram
        </a>

        <a href="https://www.youtube.com/watch?v=h9uFQv3t1AU" target="_blank"
           class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition ease-in-out duration-150">
          Twitter
        </a>

        <a href="https://www.youtube.com/watch?v=h9uFQv3t1AU" target="_blank"
           class="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-400 transition ease-in-out duration-150">
          Facebook
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
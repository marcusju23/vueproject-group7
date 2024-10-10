<template>
  <footer class="bg-neutral-800 mt-8">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-white sm:text-center">
        <img class="inline w-6 h-6 mx-2" src="@/components/icons/github-mark-white.png" alt="GitHub Icon"/>
        <a href="https://github.com/marcusju23/vueproject-group7" class="hover:underline">vueproject-group7</a>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
        <RouterLink to="/about">
            <p class="hover:underline me-4 md:me-6">About</p>
        </RouterLink>
        <RouterLink to="/contact">
            <p class="hover:underline">Contact</p>
        </RouterLink>
      </ul>
    </div>
  </footer>
</template>

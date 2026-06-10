<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" :aria-label="name">
    <!-- mail -->
    <template v-if="name === 'mail'">
      <rect x="48" y="96" width="416" height="320" rx="40" ry="40" fill="none" stroke="currentColor"
        stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
        d="M112 160l144 112 144-112" />
    </template>
    <!-- github -->
    <template v-else-if="name === 'github'">
      <path class="filled"
        d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
    </template>
    <!-- paper -->
    <template v-else-if="name === 'paper'">
      <path
        d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z"
        fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" />
      <path d="M256 56v120a32 32 0 0032 32h120" fill="none" stroke="currentColor" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="32" />
    </template>
    <!-- share/code -->
    <template v-else-if="name === 'share'">
      <circle cx="128" cy="256" r="48" fill="none" stroke="currentColor" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="32" />
      <circle cx="384" cy="112" r="48" fill="none" stroke="currentColor" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="32" />
      <circle cx="384" cy="400" r="48" fill="none" stroke="currentColor" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="32" />
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
        d="M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94" />
    </template>
    <!-- rocket -->
    <template v-else-if="name === 'rocket'">
      <path
        d="M461.81 53.81a4.4 4.4 0 00-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 00-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 009.8 10.4l81.07-8.9a180.29 180.29 0 001.1 18.3 18.15 18.15 0 005.3 11.09l31.39 31.39a18.15 18.15 0 0011.1 5.3 179.91 179.91 0 0018.19 1.1l-8.89 81a9 9 0 0010.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0039.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1160.38 0 42.65 42.65 0 01-60.38 0z"
        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
      <path
        d="M109.64 352a45.06 45.06 0 00-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 00160 402.32"
        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
    </template>
    <!-- sun -->
    <template v-else-if="name === 'sun'">
      <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10"
        stroke-width="32" />
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
        d="M256 112v32M256 368v32M144 144l22.6 22.6M345.4 345.4 368 368M112 256h32M368 256h32M144 368l22.6-22.6M345.4 166.6 368 144" />
    </template>
    <!-- moon -->
    <template v-else-if="name === 'moon'">
      <path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216c88.68 0 166.73-51.57 200-128c-26.39 11.49-57.38 16-88 16c-128.13 0-216-87.89-216-216z"
        fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" />
    </template>
  </svg>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
    validator: (v) => ['mail', 'github', 'paper', 'share', 'rocket', 'sun', 'moon'].includes(v)
  }
})
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  flex-shrink: 0;
}

.icon .filled {
  fill: currentColor;
  stroke: none;
}
</style>
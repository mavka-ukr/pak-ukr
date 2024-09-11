<script setup lang="ts"></script>

<template>
  <div class="UiHero">
    <h2>Сховище паків Мавки</h2>
    <form action="/public">
      <input type="text" name="пошук" placeholder="Пошук..." value="" />
    </form>
    <svg
      width="542"
      height="298"
      viewBox="0 0 542 298"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="matrix(0.880307 0.474405 -0.872541 0.488541 356.583 49.8717)"
        fill="#B3271A"
        fill-opacity="0.5"
        d="M0 0h105.124v302.612H0Z"
      ></path>
      <path
        transform="matrix(0.872541 -0.488541 0.880307 0.474405 0.176758 147.775)"
        fill="#F3D74B"
        fill-opacity="0.5"
        d="M0 0h100.871v315.373H0Z"
      ></path>
      <path
        transform="matrix(0.880307 0.474405 -0.872541 0.488541 264.042 6.10352e-05)"
        fill="black"
        fill-opacity="0.5"
        d="M0 0h105.124v302.612H0Z"
      ></path>
      <path
        transform="matrix(0.872541 -0.488541 0.880307 0.474405 176.027 49.2796)"
        fill="#375BB6"
        fill-opacity="0.5"
        d="M0 0h100.871v315.373H0Z"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss">
.UiHero {
  position: relative;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  margin-bottom: 40px;
  font-weight: 500;
  width: 100%;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 0 1rem;
  }

  h2 {
    font-family: Jost, sans-serif;
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  form {
    max-width: 600px;
    width: 100%;
    z-index: 2;

    input:not([type="checkbox"]) {
      display: block;
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    height: 200px;

    h2 {
      font-size: 2rem;
    }

    form {
      max-width: 100%;
    }
  }

  svg {
    position: absolute;
    bottom: -60px;
    height: 220px;
    z-index: 0;
    user-select: none;
    opacity: 1;
    display: none;

    path {
      fill-opacity: 0.125;

      &:hover {
        fill-opacity: 1;
      }
    }
  }
}
</style>

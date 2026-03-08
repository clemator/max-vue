<template>
    <div
        class="not-found-component"
    >
        <transition
            :duration="showBackgroundDuration"
            name="custom-classes-transition"
            enterActiveClass="animated bounceInUp"
        >
            <div
                v-if="showBackground"
                class="not-found-component__background"
            >
                <transition
                    :duration="showContentDuration"
                    name="custom-classes-transition"
                    enterActiveClass="animated jackInTheBox"
                >
                    <div
                        v-if="showContent"
                        class="not-found-component__content"
                    >
                        <div>?</div>
                        <div>404 - NOT FOUND</div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';

const showBackground = ref(false);
const showBackgroundDuration = 750;
const showContent = ref(false);
const showContentDuration = 750;

onMounted(() => {
    nextTick(() => {
        showBackground.value = true;
        setTimeout(() => {
            showContent.value = true;
        }, showBackgroundDuration);
    });
});
</script>

<style lang="scss">
.not-found-component {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: calc(100% - 60px);
  width: 100%;

  &__background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 400px;
    border: 2px solid #C0C0C0;
    border-radius: 5px;
    background-color: white;
  }
  &__content {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
}
</style>
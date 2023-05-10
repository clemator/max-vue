<template>
    <div class="top-toolbar">
        <h3
            class="top-toolbar__title"
        >
            <router-link
                class="link"
                to="/"
            >
                Clemator's hideout
            </router-link>
        </h3>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopToolbar',
});
</script>

<style lang="scss">
.top-toolbar {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);

  &__title .link {
    color: black;
    text-decoration: none;
  }
}
</style>

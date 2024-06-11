<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import api from '../api'
import SpinnerLoader from './SpinnerLoader.vue'

const pokemonImage = ref<any>('')
const isLoading = ref(false)

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})
defineEmits(['close-modal'])

onBeforeMount(() => {
  isLoading.value = true
  api.pokemon.downloadSprite(props.pokemon.id).then(res => {
    const blob = new Blob([res.data], { type: 'image/png' })
    pokemonImage.value = URL.createObjectURL(blob)
    isLoading.value = false
  })
})
</script>

<template>
  <div class="modal-container"></div>
  <div class="modal">
    <SpinnerLoader v-if="isLoading" />
    <div v-else class="pokemon-details">
      <div class="pokemon-details-header">
        <div class="title">Pokemon Details</div>
        <i @click="$emit('close-modal')" class="fas fa-times"></i>
      </div>
      <div class="pokemon-details-body">
        <img :src="pokemonImage" height="250px" alt="pokemon-image" />
        <div class="pokemon-details-content">
          <div class="details">
            <div class="property">Number:</div>
            <div class="value">{{ pokemon.number || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Name:</div>
            <div class="value">{{ pokemon.name || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Attack:</div>
            <div class="value">{{ pokemon.attack || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">SP Attack:</div>
            <div class="value">{{ pokemon.sp_attack || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Defense:</div>
            <div class="value">{{ pokemon.defense || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">SP Defense:</div>
            <div class="value">{{ pokemon.sp_defense || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">HP:</div>
            <div class="value">{{ pokemon.hp || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Speed:</div>
            <div class="value">{{ pokemon.speed || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Type 1:</div>
            <div class="value">{{ pokemon.type_1 || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Type 2:</div>
            <div class="value">{{ pokemon.type_2 || '--' }}</div>
          </div>

          <div class="details">
            <div class="Name">Total:</div>
            <div class="value">{{ pokemon.total }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: #575454;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  height: 380px;
  width: 480px;
  .pokemon-details {
    padding: 12px 20px;
    .pokemon-details-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .title {
        font-size: 24px;
      }
      i {
        cursor: pointer;
      }
    }
    .pokemon-details-body {
      display: flex;
      .pokemon-details-content {
        width: 100%;
        margin-left: 16px;
        .details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          .value {
            font-size: 18px;
            font-weight: 600;
            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>

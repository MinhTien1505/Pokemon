<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import api from '../api'
import { PokemonParams } from '../api/interface/pokemon.ts'
import Pagination from './Pagination.vue'
import Sorting from './Sorting.vue'
import {
  PokemonTypeMapping,
  Filter,
  PokemonType,
} from '../interface/pokemon.ts'
import ProgressBar from './ProgressBar.vue'
import PokemonDetailsModal from './PokemonDetailsModal.vue'

const headers = [
  {
    label: 'Number',
    value: 'number',
    sortable: true,
  },
  {
    label: 'Name',
    value: 'name',
    sortable: false,
  },
  {
    label: 'Attack',
    value: 'attack',
    sortable: true,
  },
  {
    label: 'SP Attack',
    value: 'sp_atk',
    sortable: true,
  },
  {
    label: 'Defense',
    value: 'defense',
    sortable: true,
  },
  {
    label: 'SP Defense',
    value: 'sp_def',
    sortable: true,
  },
  {
    label: 'HP',
    value: 'hp',
    sortable: true,
  },
  {
    label: 'Speed',
    value: 'speed',
    sortable: true,
  },
  {
    label: 'Type 1',
    value: 'type_1',
    sortable: false,
  },
  {
    label: 'Type 2',
    value: 'type_2',
    sortable: false,
  },
  {
    label: 'Total',
    value: 'total',
    sortable: true,
  },
]

const pokemonlist = ref<any[]>([])
const pokemonTypes = ref<PokemonType[]>([])
const mappingType = ref<PokemonTypeMapping>({})
const totalPages = ref(0)
const loading = ref(false)
const filter = ref<Filter>({
  pageIndex: 1,
  pageSize: 10,
  sort: 'number',
  type: undefined,
})
const pokemonDetails = ref({})
const isOpenDetalsModal = ref(false)

const getPokemonsList = () => {
  loading.value = true
  const params: PokemonParams = {
    'page[number]': filter.value.pageIndex,
    'page[size]': filter.value.pageSize,
    sort: filter.value.sort,
    'filter[type]': filter.value.type,
  }
  api.pokemon.list(params).then(response => {
    loading.value = false
    pokemonlist.value = response.data.data
    totalPages.value = response.data.meta.last_page
  })
}

const getTypes = () => {
  api.pokemon.typeList().then(response => {
    pokemonTypes.value = response.data.data
    mappingType.value = response.data.data.reduce(
      (prev: PokemonType, cur: PokemonType) => {
        return {
          ...prev,
          [cur.id]: cur.name,
        }
      },
      [],
    )
  })
}

const openPokemonDetailsModal = (pokemon: any) => {
  isOpenDetalsModal.value = true
  pokemonDetails.value = pokemon
}

const closeModal = () => {
  isOpenDetalsModal.value = false
}

onBeforeMount(() => {
  getPokemonsList()
  getTypes()
})

const changeSort = (sort: string) => {
  filter.value.sort = sort
}
const pageChange = (pageIndex: number) => {
  filter.value.pageIndex = pageIndex
}

watch(
  filter,
  () => {
    getPokemonsList()
  },
  {
    deep: true,
  },
)
</script>

<template>
  <PokemonDetailsModal
    v-if="isOpenDetalsModal"
    :pokemon="pokemonDetails"
    @close-modal="closeModal()"
  />
  <div class="pokemon-list-container">
    <div class="pokemon-list-header">
      <div class="title">Pokemon List</div>
      <div class="filter-section">
        <div>Filter by Type:</div>
        <div class="select-dropdown">
          <select v-model="filter.type">
            <option :value="undefined">All</option>
            <option v-for="type in pokemonTypes" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="header of headers" scope="col" :key="header.value">
            <Sorting
              v-if="header.sortable"
              :key-sort="header.value"
              :label-sort="header.label"
              @emit-srot="changeSort($event)"
            />
            <div v-else>
              {{ header.label }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <ProgressBar v-if="loading" />
        <tr
          v-for="pokemon of pokemonlist"
          :key="pokemon.id"
          @click="openPokemonDetailsModal(pokemon)"
        >
          <td v-for="header of headers" :data-label="header.label">
            <div v-if="header.value === 'type_1' || header.value === 'type_2'">
              {{ mappingType[pokemon[header.value]] || '--' }}
            </div>
            <div v-else>
              {{ pokemon[header.value] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-container">
      <Pagination
        :page-index="filter.pageIndex"
        :total-page="totalPages"
        @change-page="pageChange($event)"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.pokemon-list-container {
  padding: 24px;
  .pokemon-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    .title {
      font-size: 24px;
      margin-right: 12px;
    }
    .filter-section {
      display: flex;
      align-items: center;
    }
    .select-dropdown {
      position: relative;
      background-color: #e6e6e6;
      border-radius: 4px;
      margin-left: 8px;
    }
    .select-dropdown select {
      font-size: 1rem;
      font-weight: normal;
      max-width: 100%;
      padding: 8px 24px 8px 10px;
      border: none;
      background-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    .select-dropdown select:active,
    .select-dropdown select:focus {
      outline: none;
      box-shadow: none;
    }
    .select-dropdown:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 8px;
      width: 0;
      height: 0;
      margin-top: -2px;
      border-top: 5px solid #aaa;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
    }
  }
  .sorting {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.pagination-container {
  display: flex;
  justify-content: end;
}
</style>

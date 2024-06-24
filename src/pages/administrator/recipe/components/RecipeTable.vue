<template>
  <div align="right">
    <q-input
      class="q-pb-lg q-pl-md"
      v-model="filter"
      outlined
      placeholder="Search"
      debounce="1000"
      style="width: 500px; max-width: 1500px; min-width: 100px"
      flat
      dense
      rounded
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>

  <div class="spinner-wrapper" v-if="loading">
    <q-spinner-dots size="50px" color="primary" />
  </div>

  <div v-else>
    <div v-if="filteredRows.length === 0" class="data-error">
      <q-icon name="warning" color="warning" size="4em" />
      <div class="q-ml-sm text-h6">No data available</div>
    </div>
    <q-table
      v-else
      class="table-container elegant-container sticky-header"
      :filter="filter"
      :virtual-scroll-sticky-size-start="48"
      flat
      :columns="recipeColumns"
      :rows="filteredRows"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      hide-bottom
      style="height: 400px"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props" class="cursor-pointer">
          <span>{{ props.row.name }}</span>
          <q-popup-edit
            @update:model-value="(val) => updateRecipeName(props.row, val)"
            v-model="props.row.name"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td key="name" :props="props">
          <q-badge :color="getBadgeCategoryColor(props.row.category)">
            {{ props.row.category }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-availableStocks="props">
        <q-td :props="props">
          <q-badge
            square
            class="text-white"
            :class="getRawMaterialBadgeColor(props.row.availableStocks)"
          >
            {{ props.row.availableStocks }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-bread_groups="props">
        <q-td :props="props">
          <q-tooltip
            :offset="[0, 10]"
            :delay="600"
            class="bg-info text-dark text-subtitle1"
          >
            <div
              class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
            >
              Breads List
            </div>
            <q-separator class="q-mb-md" color="yellow" />
            <div v-for="bread in props.row.bread_groups" :key="bread">
              {{ bread }}
            </div>
          </q-tooltip>
          <q-chip square outline color="red-6" class="text-white">
            {{ props.row.bread_groups.length }} breads
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-ingredient_groups="props">
        <q-td :props="props">
          <q-tooltip
            :delay="600"
            class="bg-info text-dark text-subtitle1"
            style="width: 300px"
          >
            <div
              class="q-pb-sm text-center text-h6 text-weight-bold text-subtitle2"
            >
              Ingredients List
            </div>
            <q-separator class="q-mb-md" color="yellow" />
            <div
              class="row justify-between"
              v-for="ingredient in props.row.ingredient_groups"
              :key="ingredient.ingredient_name"
            >
              <div>
                {{ ingredient.ingredient_name }}
              </div>
              <div>{{ ingredient.quantity }} {{ ingredient.unit }}</div>
            </div>
          </q-tooltip>
          <q-chip square outline color="purple-6" class="text-white">
            {{ props.row.ingredient_groups.length }} ingredients
          </q-chip>
        </q-td>
      </template>
      <template v-slot:body-cell-target="props">
        <q-td auto-width class="cursor-pointer text-center">
          <span>{{ props.row.target ? props.row.target : "Set Target" }}</span>
          <q-popup-edit
            @update:model-value="(val) => updateRecipe(props.row, val)"
            v-model="props.row.target"
            auto-save
            v-slot="scope"
          >
            <q-input
              v-model="scope.value"
              dense
              autofocus
              counter
              mask="###"
              @keyup.enter="scope.set"
            />
          </q-popup-edit>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-x-md">
            <RecipeDelete :delete="props" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import RecipeEdit from "./RecipeEdit.vue";
import RecipeDelete from "./RecipeDelete.vue";
import { useRecipeStore } from "src/stores/recipe-store";
import { update_recipe_target } from "src/services/recipe-service";
import { api } from "src/boot/axios";

const recipeStore = useRecipeStore();
const filter = ref("");
const loading = ref(true);
const recipes = ref([]);
const showNoDataMessage = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const recipeRows = computed(() => recipeStore.recipes);

// Computed property for filtered rows
const filteredRows = computed(() => {
  if (!filter.value) {
    return recipeRows.value;
  }
  return recipeRows.value.filter((row) =>
    row.name.toLowerCase().includes(filter.value.toLowerCase())
  );
});

async function updateRecipe(data, val) {
  try {
    const response = await api.put("/update-target/" + data.id, {
      target: parseInt(val),
    });
    if (response.status == 200) {
      const i = recipes.value.findIndex((item) => item.id == data.id);
      recipes.value[i] = val;
    }
  } catch (error) {
    console.error("Error updating recipe target:", error);
  }
}

async function updateRecipeName(data, val) {
  try {
    const response = await api.put("/update-name/" + data.id, {
      name: val,
    });
    if (response.status == 200) {
      const i = recipes.value.findIndex((item) => item.id == data.id);
      recipes.value[i] = val;
    }
  } catch (error) {
    console.error("Error updating recipe name:", error);
  }
}

onMounted(async () => {
  await reloadTableData();
});

const reloadTableData = async () => {
  try {
    loading.value = true;
    recipeRows.value = await recipeStore.fetchRecipe();
    if (!recipeRows.value.length) {
      showNoDataMessage.value = true;
    }

    console.log("Recipe", recipeRows.value);
  } catch (error) {
    console.log("error fetching recipe: ", error);
    showNoDataMessage.value = true;
  } finally {
    loading.value = false;
  }
};

watch(filter, async (newFilter) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
  showNoDataMessage.value = filteredRows.value.length === 0;
});

const recipeColumns = [
  {
    name: "name",
    label: "Recipe Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "category",
    label: "Category",
    align: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "target",
    label: "Target Pcs",
    align: "center",
    field: "target",
    sortable: true,
  },
  {
    name: "bread_groups",
    label: "List of Bread",
    align: "center",
    field: "bread_groups",
    sortable: true,
  },
  {
    name: "ingredient_groups",
    label: "List of Ingredients",
    align: "center",
    field: "ingredient_groups",
    sortable: true,
  },
  {
    name: "action",
    label: "Action",
    align: "center",
    sortable: true,
  },
];

const getRawMaterialBadgeColor = (availableStocks) => {
  const stockValue = parseInt(availableStocks);
  if (stockValue <= 20) {
    return "bg-red";
  } else if (stockValue <= 50) {
    return "bg-warning";
  } else {
    return "bg-primary";
  }
};
const getBadgeCategoryColor = (category) => {
  switch (category) {
    case "Bread":
      return "brown";
    case "Filling":
      return "deep-orange";
    default:
      return "grey";
  }
};
</script>
<style scoped>
.elegant-container {
  background: #f7f8fc;
  padding: 1rem;
  border-radius: 8px;
}
.absolute-full {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spinner-wrapper {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.data-error {
  min-height: 40vh; /* Minimum height of 50% viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-container {
  max-height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.q-table-container {
  overflow: hidden !important; /* Target the container generated by q-table */
}
</style>

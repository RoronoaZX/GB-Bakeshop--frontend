<template>
  <q-btn
    class="text-dark q-pa-sm"
    outline
    dense
    elevated
    icon="add_circle"
    label="Add Recipe"
    @click="openAddRecipe"
    style="background-color: #ef4444"
  />
  <q-dialog v-model="dialog" persistent :loading="loading">
    <q-card class="my-card" style="width: 400px">
      <q-card-section
        class="row items-center text-white"
        style="background-color: #ef4444"
      >
        <div class="text-h6">Add Recipe</div>
        <q-space />
        <q-btn icon="close" flat dense round v-close-popup />
      </q-card-section>
      <q-card-section class="q-my-md q-mx-md q-gutter-y-md">
        <div>
          <div>Recipe Name</div>
          <q-input
            v-model="recipe.name"
            outlined
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Target Pcs</div>
          <q-input
            v-model="recipe.target"
            suffix=" / 1kg"
            outlined
            mask="###"
            dense
            :rules="[(val) => val && val.length > 0]"
          />
        </div>
        <div>
          <div>Breads</div>
          <q-select
            v-model="breadGroup"
            use-input
            use-chips
            chips-color="primary"
            multiple
            input-debounce="0"
            :options="filterBreadOptions"
            behavior="menu"
            hide-dropdown-icon
            outlined
            dense
            @new-value="createValue"
            @filter="filterFn"
          >
            <!-- @new-value="createValue"
            @filter="filterBread"
            @filter-abort="abortFilterFn" -->
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-gutter-y-sm">
          <div class="text-weight-thin">Ingredients List</div>
          <div>
            <q-list dense separator class="box">
              <q-item
                v-for="(ingredient, index) in ingredientGroup"
                :key="index"
              >
                <q-item-section>
                  <q-item-label>{{ ingredient.label }}</q-item-label>
                </q-item-section>
                <q-item-section
                  >{{ ingredient.quantity }}
                  {{ ingredient.unit }}</q-item-section
                >
                <q-item-section side>
                  <q-btn
                    @click="removeIngredient(index)"
                    color="grey-10"
                    icon="backspace"
                    dense
                    flat
                    round
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="q-mt-xl q-gutter-y-md">
          <div class="row justify-between">
            <div>
              <div>Ingredients</div>
              <q-select
                v-model="selectedIngredients.name"
                debounce="3000"
                outlined
                chips-color="primary"
                :options="filterIngredientsOptions"
                dense
                behavior="menu"
                use-input
                hide-dropdown-icon
                @filter="filterIngredients"
                style="width: 215px; max-width: 450px; min-width: 80px"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <div>Quantity</div>
              <q-input
                v-model="selectedIngredients.quantity"
                outlined
                mask="#####"
                dense
                :suffix="selectedIngredients.name.unit || ''"
                style="width: 100px"
              />
            </div>
          </div>
          <div class="q-mt-sm" align="right">
            <q-btn
              size="sm"
              outline
              dense
              icon="add"
              color="purple"
              @click="addIngredients"
            />
          </div>
        </div>
        <q-separator class="q-my-lg"></q-separator>
        <q-card-actions class="row q-ma-md" align="right">
          <q-btn class="glossy" color="grey-9" label="Dismiss" v-close-popup />
          <q-btn
            class="glossy"
            color="teal"
            label="Create"
            @click="saveRecipe"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useProductStore } from "src/stores/product-store";
import { ref, reactive, watch } from "vue";
import { useRawMaterialStore } from "src/stores/raw-materials-store";
import { useRecipeStore } from "src/stores/recipe-store";
import { Notify } from "quasar";

const breadProductStore = useProductStore();
const ingredientsStore = useRawMaterialStore();
const recipeStore = useRecipeStore();
const dialog = ref(false);
const openAddRecipe = () => {
  dialog.value = true;
};

const recipe = reactive({
  name: "",
  target: "",
});

const breadGroup = ref(null);
const breadOptions = ref([]);
const filterBreadOptions = ref(breadOptions.value);
const ingredientGroup = ref([]);
const ingredientOptions = ref([]);
const selectedIngredients = reactive({
  name: "",
  quantity: "",
});
const filterIngredientsOptions = ref(ingredientOptions.value);

const loading = ref(false);

const fetchBreadsData = async () => {
  const bread = await breadProductStore.fetchBread();
  loading.value = false;
  breadOptions.value = breadProductStore.breads.map((val) => {
    return {
      label: val.name,
      value: val.id,
    };
  });
};
fetchBreadsData();

const fetchIngredientsData = async () => {
  const ingredient = await ingredientsStore.fetchIngredients();
  loading.value = false;
  ingredientOptions.value = ingredientsStore.ingredients.map((val) => {
    return {
      label: val.name,
      value: val.id,
      unit: val.unit,
    };
  });
};
fetchIngredientsData();

const clearData = () => {
  (selectedIngredients.name = ""), (selectedIngredients.quantity = "");
};

const createValue = (val, done) => {
  if (val.length > 2) {
    if (!breadOptions.value.includes(val)) {
      done(val, "add-unique");
    }
  }
};

const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterBreadOptions.value = breadOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterBreadOptions.value = breadOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const createValueIngredient = (val, done) => {
  if (val.length > 2) {
    if (!ingredientOptions.value.includes(val)) {
      done(val, "add-unique");
    }
  }
};
const filterIngredients = (val, update) => {
  update(() => {
    if (val === "") {
      filterIngredientsOptions.value = ingredientOptions.value;
    } else {
      const needle = val.toLowerCase();
      filterIngredientsOptions.value = ingredientOptions.value.filter(
        (v) => v.label.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const saveRecipe = async () => {
  const newData = {
    name: recipe.name,
    target: recipe.target,
    breads: breadGroup.value.map((bread) => ({
      bread_id: bread.value,
    })),
    ingredients: ingredientGroup.value.map((ingredient) => ({
      ingredient_id: ingredient.ingredients_id,
      quantity: ingredient.quantity,
    })),
  };

  try {
    loading.value = true;
    await recipeStore.create(newData);
    loading.value = false;
    dialog.value = false;
    Notify.create({
      type: "positive",
      message: "Recipe created successfully",
    });
    clearRecipeData();
    await reloadTableData();
  } catch (error) {
    loading.value = false;
    // Notify.create({
    //   type: "negative",
    //   message: "Error creating recipe",
    // });
  }
};

const clearRecipeData = () => {
  recipe.name = "";
  recipe.target = "";
  breadGroup.value = null;
  ingredientGroup.value = [];
  selectedIngredients.name = "";
  selectedIngredients.quantity = "";

  dialog.value = false;
};

const addIngredients = () => {
  const data = ingredientGroup.value;

  function findObjectById(arr, id) {
    return arr.find((obj) => obj.ingredients_id == id);
  }
  const idToSearch = selectedIngredients.name.value;

  const foundObject = findObjectById(data, idToSearch);
  if (!foundObject) {
    ingredientGroup.value = [
      ...data,
      {
        ingredients_id: selectedIngredients.name.value,
        label: selectedIngredients.name.label,
        quantity: selectedIngredients.quantity,
        unit: selectedIngredients.name.unit,
      },
    ];
    clearData();
  } else {
    Notify.create({
      type: "negative",
      icon: "warning",
      message: "Ingredient already exist",
      timeout: 2000,
    });
    // alert("ingredient already exist!");
  }
};

const removeIngredient = (index) => {
  ingredientGroup.value.splice(index, 1);
};

watch(
  () => selectedIngredients.name,
  (newVal) => {
    if (newVal && newVal.unit) {
      selectedIngredients.unit = newVal.unit;
    } else {
      selectedIngredients.unit = "";
    }
  }
);
</script>
<style>
.q-chip {
  color: #000000;
}
.box {
  border: 1px dashed grey;
  border-radius: 10px;
}
</style>

<template>
  <div v-for="(dishGroup, index) in groupedDishes" :key="index">
    <Carousel
      v-bind="settings"
      :breakpoints="breakpoints"
      :autoplay="1000"
      :wrapAround="true"
      :transition="1000"
      :dir="index % 2 === 0 ? 'ltr' : 'rtl'"
      pauseAutoplayOnHover="true"
      :smooth="true"
    >
      <Slide v-for="(dish, index) in dishGroup" :key="dish.id">
        <div class="card-container">
          <div class="card position-relative">
            <img :src="dish.img" class="rounded-top" />
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  dishes: {
    type: Array,
    required: true,
  },
});

const settings = ref({
  itemsToShow: 1,
});

const groupedDishes = computed(() => {
  return Array.from({ length: Math.ceil(dishes.value.length / 7) }, (_, i) =>
    dishes.value.slice(i * 7, (i + 1) * 7)
  );
});

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: 2.6,
    snapAlign: "center",
  },
};

const dishes = ref([
  {
    id: 1,
    name: "Vegetables",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZomu3e7ZnixRkm3TzZ6pT2TmWJq_KWAhVmA&s",
    rating: 0,
  },
  {
    id: 2,
    name: "Corn Dog",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZomu3e7ZnixRkm3TzZ6pT2TmWJq_KWAhVmA&s",
    rating: 0,
  },
  {
    id: 3,
    name: "Meat",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZomu3e7ZnixRkm3TzZ6pT2TmWJq_KWAhVmA&s",
    rating: 0,
  },
  {
    id: 4,
    name: "Burger",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZomu3e7ZnixRkm3TzZ6pT2TmWJq_KWAhVmA&s",
    rating: 0,
  },
  {
    id: 5,
    name: "Dumbpling",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZomu3e7ZnixRkm3TzZ6pT2TmWJq_KWAhVmA&s",
    rating: 0,
  },
  {
    id: 6,
    name: "Chocolate",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://media.istockphoto.com/id/154933110/es/foto/la-cena-saludable.jpg?s=612x612&w=0&k=20&c=2V8anv0E-nHajvl7Hx2sp7whiYTGY77x-RFufS2fgKM=",
    rating: 0,
  },
  {
    id: 7,
    name: "Cheese Fingers",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://media.istockphoto.com/id/154933110/es/foto/la-cena-saludable.jpg?s=612x612&w=0&k=20&c=2V8anv0E-nHajvl7Hx2sp7whiYTGY77x-RFufS2fgKM=",
    rating: 0,
  },
  {
    id: 8,
    name: "Chicken Wings",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://media.istockphoto.com/id/154933110/es/foto/la-cena-saludable.jpg?s=612x612&w=0&k=20&c=2V8anv0E-nHajvl7Hx2sp7whiYTGY77x-RFufS2fgKM=",
    rating: 0,
  },
  {
    id: 9,
    name: "Pasta",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://media.istockphoto.com/id/154933110/es/foto/la-cena-saludable.jpg?s=612x612&w=0&k=20&c=2V8anv0E-nHajvl7Hx2sp7whiYTGY77x-RFufS2fgKM=",
    rating: 0,
  },
  {
    id: 10,
    name: "Pork",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70",
    rating: 0,
  },
  {
    id: 11,
    name: "Event 11",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
    rating: 0,
  },
  {
    id: 12,
    name: "Event 12",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
    rating: 0,
  },
  {
    id: 13,
    name: "Event 13",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg",
    rating: 0,
  },
  {
    id: 14,
    name: "Event 14",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format",
    rating: 0,
  },
  {
    id: 15,
    name: "Event 15",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://cdn-ilaijbf.nitrocdn.com/YzeYmKigJpOUmEDUPOsqjcZLGXECGjCN/assets/images/optimized/rev-fee2c83/www.foodfood.com/wp-content/uploads/2024/05/PunjabiSamosa.jpg",
    rating: 0,
  },
  {
    id: 16,
    name: "Event 16",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://ichef.bbci.co.uk/images/ic/832xn/p0h0ylf7.jpg",
    rating: 0,
  },
  {
    id: 17,
    name: "Event 17",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://hips.hearstapps.com/hmg-prod/images/delish-221219-burger-king-chicken-fries-0133-eb-1672788323.jpg?crop=0.683xw:1.00xh;0.248xw,0&resize=640:*",
    rating: 0,
  },
  {
    id: 18,
    name: "Event 18",
    description: "Food description",
    cost: "59.77$",
    categoryId: 2,
    img: "https://www.jollibeefoods.com/cdn/shop/files/29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg?v=1634843436&width=1080",
    rating: 0,
  },
  {
    id: 19,
    name: "Event 19",
    description: "Food description",
    cost: "59.77$",
    categoryId: 3,
    img: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
    rating: 0,
  },
  {
    id: 20,
    name: "Event 20",
    description: "Food description",
    cost: "59.77$",
    categoryId: 1,
    img: "https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70",
    rating: 0,
  },
]);
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-gap: 0; /* set grid-gap to 0 */
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 14px -2px #bebebe;
  transition: 0.6s ease-in-out;
}

.card:hover {
  transform: scale(1.1);
}

.card img {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

@media (max-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

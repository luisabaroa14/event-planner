<script setup>
import ProductList from "../components/ProductList.vue";
import { ref, computed } from 'vue';

  const events = ref([
      { id: 1, name: 'Event 1', date: '2022-01-01', location: 'Location 1', categoryId: 1, img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg' },
      { id: 2, name: 'Event 2', date: '2022-02-02', location: 'Location 2', categoryId: 1, img: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505' },
      { id: 3, name: 'Event 3', date: '2022-03-03', location: 'Location 3', categoryId: 2, img: 'https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg' },
      { id: 4, name: 'Event 4', date: '2022-04-04', location: 'Location 4', categoryId: 2, img: 'https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format' },
      { id: 5, name: 'Event 5', date: '2022-05-05', location: 'Location 5', categoryId: 3, img: 'https://cdn-ilaijbf.nitrocdn.com/YzeYmKigJpOUmEDUPOsqjcZLGXECGjCN/assets/images/optimized/rev-fee2c83/www.foodfood.com/wp-content/uploads/2024/05/PunjabiSamosa.jpg' },
      { id: 6, name: 'Event 6', date: '2022-06-06', location: 'Location 6', categoryId: 3, img: 'https://ichef.bbci.co.uk/images/ic/832xn/p0h0ylf7.jpg' },
      { id: 7, name: 'Event 7', date: '2022-07-07', location: 'Location 7', categoryId: 1, img: 'https://hips.hearstapps.com/hmg-prod/images/delish-221219-burger-king-chicken-fries-0133-eb-1672788323.jpg?crop=0.683xw:1.00xh;0.248xw,0&resize=640:*' },
      { id: 8, name: 'Event 8', date: '2022-08-08', location: 'Location 8', categoryId: 2, img: 'https://www.jollibeefoods.com/cdn/shop/files/29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg?v=1634843436&width=1080' },
      { id: 9, name: 'Event 9', date: '2022-09-09', location: 'Location 9', categoryId: 3, img: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574' },
      { id: 10, name: 'Event 10', date: '2022-10-10', location: 'Location 10', categoryId: 1, img: 'https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70' },
      { id: 11, name: 'Event 11', date: '2022-01-01', location: 'Location 1', categoryId: 1, img: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg' },
      { id: 12, name: 'Event 12', date: '2022-02-02', location: 'Location 2', categoryId: 1, img: 'https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505' },
      { id: 13, name: 'Event 13', date: '2022-03-03', location: 'Location 3', categoryId: 2, img: 'https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg' },
      { id: 14, name: 'Event 14', date: '2022-04-04', location: 'Location 4', categoryId: 2, img: 'https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format' },
      { id: 15, name: 'Event 15', date: '2022-05-05', location: 'Location 5', categoryId: 3, img: 'https://cdn-ilaijbf.nitrocdn.com/YzeYmKigJpOUmEDUPOsqjcZLGXECGjCN/assets/images/optimized/rev-fee2c83/www.foodfood.com/wp-content/uploads/2024/05/PunjabiSamosa.jpg' },
      { id: 16, name: 'Event 16', date: '2022-06-06', location: 'Location 6', categoryId: 3, img: 'https://ichef.bbci.co.uk/images/ic/832xn/p0h0ylf7.jpg' },
      { id: 17, name: 'Event 17', date: '2022-07-07', location: 'Location 7', categoryId: 1, img: 'https://hips.hearstapps.com/hmg-prod/images/delish-221219-burger-king-chicken-fries-0133-eb-1672788323.jpg?crop=0.683xw:1.00xh;0.248xw,0&resize=640:*' },
      { id: 18, name: 'Event 18', date: '2022-08-08', location: 'Location 8', categoryId: 2, img: 'https://www.jollibeefoods.com/cdn/shop/files/29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg?v=1634843436&width=1080' },
      { id: 19, name: 'Event 19', date: '2022-09-09', location: 'Location 9', categoryId: 3, img: 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574' },
      { id: 20, name: 'Event 20', date: '2022-10-10', location: 'Location 10', categoryId: 1, img: 'https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70' },
    ]);

  const categories = ref([
      { id: 1, name: 'Desayuno' },
      { id: 2, name: 'Comida' },
      { id: 3, name: 'Cena' },
  ]);

  const activeCategoryId = ref(1);

  const filteredEvents = computed(() => {
    return events.value.filter(event => event.categoryId === activeCategoryId.value);
  });

</script>

<template>
  <div class="h-100 d-flex flex-column p-3">
    <div class="mt-5 mx-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>Products</h1>
        <div class="d-flex">
          <input type="search" class="form-control" placeholder="Search products" />
          <div class="dropdown ms-2">
            <button class="btn btn-secondary dropdown-toggle bg-white" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Type of food
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="category in categories" :key="category.id">
                <a class="dropdown-item" href="#" @click.prevent="activeCategoryId = category.id">{{ category.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p>Welcome to the products page</p>
        <ProductList :events="filteredEvents" :categories="categories" :active-category-id="activeCategoryId" />
      </div>
    </div>
  </div>
</template>
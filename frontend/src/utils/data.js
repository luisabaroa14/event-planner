export function getEvents(currentDate = new Date()) {
  const events = [
    {
      id: 1,
      name: "Event 1",
      img: "https://cdn.pixabay.com/photo/2015/12/26/11/08/finger-food-1108565_1280.jpg",
      date: new Date().toISOString().split("T")[0],
      location: "Location 1",
      collaboratorId: 1,
    },
    {
      id: 2,
      name: "Event 2",
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 2",
      collaboratorId: 1,
    },
    {
      id: 3,
      name: "Event 3",
      img: "https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 3",
      collaboratorId: 1,
    },
    {
      id: 4,
      name: "Event 4",
      img: "https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format",
      date: new Date(currentDate.setDate(currentDate.getDate()))
        .toISOString()
        .split("T")[0],
      location: "Location 4",
      collaboratorId: 2,
    },
    {
      id: 5,
      name: "Event 5",
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 5",
      collaboratorId: 2,
    },
    {
      id: 6,
      name: "Event 6",
      img: "https://ichef.bbci.co.uk/images/ic/832xn/p0h0ylf7.jpg",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 6",
      collaboratorId: 2,
    },
    {
      id: 7,
      name: "Event 7",
      img: "https://hips.hearstapps.com/hmg-prod/images/delish-221219-burger-king-chicken-fries-0133-eb-1672788323.jpg?crop=0.683xw:1.00xh;0.248xw,0&resize=640:*",
      date: new Date(currentDate.setDate(currentDate.getDate()))
        .toISOString()
        .split("T")[0],
      location: "Location 7",
      collaboratorId: 2,
    },
    {
      id: 8,
      name: "Event 8",
      img: "https://www.jollibeefoods.com/cdn/shop/files/29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg?v=1634843436&width=1080",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 8",
      collaboratorId: 3,
    },
    {
      id: 9,
      name: "Event 9",
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 9",
      collaboratorId: 3,
    },
    {
      id: 10,
      name: "Event 10",
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      date: new Date(currentDate.setDate(currentDate.getDate() + 1))
        .toISOString()
        .split("T")[0],
      location: "Location 10",
      collaboratorId: 3,
    },
  ];
  return events;
}

export function getDishes() {
  const dishes = [
    {
      id: 1,
      name: "Vegetables",
      description: "Food description",
      cost: "59.77$",
      categoryId: 1,
      img: "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
      rating: 0,
    },
    {
      id: 2,
      name: "Corn Dog",
      description: "Food description",
      cost: "59.77$",
      categoryId: 1,
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505",
      rating: 0,
    },
    {
      id: 3,
      name: "Meat",
      description: "Food description",
      cost: "59.77$",
      categoryId: 2,
      img: "https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg?w=1920&fm=webp&q=70",
      rating: 0,
    },
    {
      id: 4,
      name: "Burger",
      description: "Food description",
      cost: "59.77$",
      categoryId: 2,
      img: "https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg",
      rating: 0,
    },
    {
      id: 5,
      name: "Dumbpling",
      description: "Food description",
      cost: "59.77$",
      categoryId: 3,
      img: "https://fotografias.larazon.es/clipping/cmsimages01/2023/11/16/080445F5-DC20-409E-A8B9-498C90C12C90/dieta-mexicana-reduce-inflamacion-colesterol-malo-debido-sus-componentes_98.jpg?crop=1280,720,x0,y0&width=1900&height=1069&optimize=low&format=webply",
      rating: 0,
    },
    {
      id: 6,
      name: "Chocolate",
      description: "Food description",
      cost: "59.77$",
      categoryId: 3,
      img: "https://cdn.sanity.io/images/cctd4ker/production/9296da795070ca0b6d9147d9507ab54d9e2dba84-1440x960.jpg?w=3840&q=75&fit=clip&auto=format",
      rating: 0,
    },
    {
      id: 7,
      name: "Cheese Fingers",
      description: "Food description",
      cost: "59.77$",
      categoryId: 1,
      img: "https://okdiario.com/img/2021/03/10/recetas-chinas-655x368.jpg",
      rating: 0,
    },
    {
      id: 8,
      name: "Chicken Wings",
      description: "Food description",
      cost: "59.77$",
      categoryId: 2,
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      rating: 0,
    },
    {
      id: 9,
      name: "Pasta",
      description: "Food description",
      cost: "59.77$",
      categoryId: 3,
      img: "https://www.jollibeefoods.com/cdn/shop/files/29351737_2152446668377854_356570745477300982_o_2152446668377854.jpg?v=1634843436&width=1080",
      rating: 0,
    },
    {
      id: 10,
      name: "Pork",
      description: "Food description",
      cost: "59.77$",
      categoryId: 1,
      img: "https://hips.hearstapps.com/hmg-prod/images/delish-221219-burger-king-chicken-fries-0133-eb-1672788323.jpg?crop=0.683xw:1.00xh;0.248xw,0&resize=640:*",
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
  ];
  return dishes;
}

export function getChefs() {
  const chefs = [
    {
      id: 1,
      name: "John",
      description:
        "John is a master of modern fusion cuisine, blending classic techniques with contemporary flavors. His signature dishes showcase innovative combinations and exquisite presentation.",
      img: "https://static.cordonbleu.edu/Files/MediaFile/79298.jpg",
      cuisineTypes: ["Fusion", "Contemporary"],
    },
    {
      id: 2,
      name: "Larry",
      description:
        "Larry specializes in rustic Italian cuisine, focusing on traditional recipes passed down through generations. His dishes are known for their authenticity and rich, comforting flavors.",
      img: "https://static.cordonbleu.edu/Files/MediaFile/79299.jpg",
      cuisineTypes: ["Italian", "Rustic"],
    },
    {
      id: 3,
      name: "Moe",
      description:
        "Moe is renowned for his expertise in seafood, crafting dishes that highlight the freshness and natural flavors of the ocean. His culinary creations are both delicate and bold.",
      img: "https://static.cordonbleu.edu/Files/MediaFile/70795.jpg",
      cuisineTypes: ["Seafood", "Mediterranean"],
    },
    {
      id: 4,
      name: "Homer",
      description:
        "Homer excels in traditional French cuisine, with a focus on classic techniques and rich, buttery flavors. His dishes are elegant and embody the essence of French culinary artistry.",
      img: "https://www.escoffier.edu/wp-content/uploads/2022/03/Chef-in-uniform-posing-for-a-photo-in-a-kitchen-1400.jpg",
      cuisineTypes: ["French", "Classical"],
    },
    {
      id: 5,
      name: "Lenny",
      description:
        "Lenny brings a flair for modern American cuisine, infusing familiar dishes with creative twists and bold flavors. His approach combines comfort with innovation, making each meal a unique experience.",
      img: "https://static.cordonbleu.edu/Files/MediaFile/80212.jpg",
      cuisineTypes: ["American", "Modern"],
    },
  ];
  return chefs;
}

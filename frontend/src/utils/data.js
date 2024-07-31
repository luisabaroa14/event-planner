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

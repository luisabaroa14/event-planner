<script setup>
import EventsCalendar from "../components/EventsCalendar.vue";

var currentDate = new Date();
const events = [
  {
    id: 1,
    name: "Event 1",
    date: new Date().toISOString().split("T")[0],
    location: "Location 1",
    collaboratorId: 1,
  },
  {
    id: 2,
    name: "Event 2",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 2",
    collaboratorId: 1,
  },
  {
    id: 3,
    name: "Event 3",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 3",
    collaboratorId: 1,
  },
  {
    id: 4,
    name: "Event 4",
    date: new Date(currentDate.setDate(currentDate.getDate()))
      .toISOString()
      .split("T")[0],
    location: "Location 4",
    collaboratorId: 2,
  },
  {
    id: 5,
    name: "Event 5",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 5",
    collaboratorId: 2,
  },
  {
    id: 6,
    name: "Event 6",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 6",
    collaboratorId: 2,
  },
  {
    id: 7,
    name: "Event 7",
    date: new Date(currentDate.setDate(currentDate.getDate()))
      .toISOString()
      .split("T")[0],
    location: "Location 7",
    collaboratorId: 2,
  },
  {
    id: 8,
    name: "Event 8",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 8",
    collaboratorId: 3,
  },
  {
    id: 9,
    name: "Event 9",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 9",
    collaboratorId: 3,
  },
  {
    id: 10,
    name: "Event 10",
    date: new Date(currentDate.setDate(currentDate.getDate() + 1))
      .toISOString()
      .split("T")[0],
    location: "Location 10",
    collaboratorId: 3,
  },
];

console.log("Events: ", events);
</script>

<template>
  <div class="d-flex flex-column mx-3">
    <h1 class="mt-2">Events</h1>
    <p>Welcome to the events page</p>
    <EventsCalendar :events="events" :collaborator-id="null" />
  </div>
</template>

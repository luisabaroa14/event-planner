<template>
  <div class="d-flex flex-row container p-3">
    <i class="social-link1 fa-brands fa-instagram"></i>
    <i class="social-link2 fa-brands fa-spotify"></i>
    <i class="social-link3 fa-brands fa-facebook"></i>
    <i class="social-link4 fa-brands fa-whatsapp"></i>
  </div>
</template>

<style scoped>
.container {
  height: 100px;
}

.container .social-link1,
.container .social-link2,
.container .social-link3,
.container .social-link4 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  color: whitesmoke;
  font-size: 28px;
  text-decoration: none;
  transition: 0.25s;
  border-radius: 50px;
}

.container .social-link1:hover {
  background: #f09433;
  background: -moz-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  animation: bounce 0.4s linear;
}

.container .social-link2:hover {
  background-color: #1db954;
  animation: bounce 0.4s linear;
}

.container .social-link3:hover {
  background-color: #316ff6;
  animation: bounce 0.4s linear;
}

.container .social-link4:hover {
  background-color: #12a50b;
  animation: bounce 0.4s linear;
}
</style>

<template>
  <div class="main">
    <About></About>
    <Bussiness></Bussiness>
    <Use></Use> 
    <Contact></Contact>
  </div>
</template>

<script>
import Bussiness from "./centralPlate/business";
import Contact from "./centralPlate/contact";
import Use from "./centralPlate/use";
import About from "./centralPlate/about";
export default {
  components: { Bussiness, Contact, Use ,About},
};
</script>

<style lang="scss" scoped>
// .main{
//   width: 100%;
// }
</style>
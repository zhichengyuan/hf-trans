<template>
  <div class="home">
      <Menu></Menu>
     <Header></Header>
     <LogInfo/>
      <Main></Main>
      <Footer></Footer>
  </div>
</template>

<script>


import Main from './components/main'

import Menu from "./components/menu.vue";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import LogInfo from "../logQuery/index.vue";

export default {
  name: 'Home',
  components:{Main,Header,Footer,LogInfo,Menu},
  

}
</script>
<style lang="scss">
.home {
  min-height: 544px;
  min-width: 200px;
  position: relative;
  overflow: hidden;
}


</style>
<template>
  <div class="app-container">
    <panelGroup />
  </div>
</template>

<script>
  import panelGroup from './components/PanelGroup'
  import { getparent } from '@/api/user'
  export default {
    name: 'DashboardAdmin',
    components: {
     panelGroup
    },
    data() {
       return {
        };
    },
    created(){
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    background:rgb(240, 242, 245);
    padding-bottom: 40px;
    h4{
      padding: 0;
      padding-left: 30px;
      line-height: 40px;
      border-bottom: 1px solid #cccf;
    }
    .main-text{
      line-height: 30px;
      padding-left: 50px;
      .text{
        color: rgba(255, 102, 0, 0.904);
        font-size: 18px;
      }
    }
    
    
  }
  
  .el-form-item {
      margin-bottom: 30px;
  }
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
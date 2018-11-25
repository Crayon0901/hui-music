<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive> <!-- 包裹的内容会被添加到缓存里面，不会每次都重新加载一次 -->
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
import Player from 'components/player/player';
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'/*CSS loader 会把把非根路径的url解释为相对路径， 加~前缀才会解释成模块路径*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-theme;
  // margin-top: 60px;
}
</style>

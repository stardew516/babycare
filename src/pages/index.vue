<template>
  <section class="container" ref="layerout">
    <div class="left-side__bar">
      <div class="left-side__menu">
        <el-menu
          :default-active="activeIndex"
          class="left-menu__nav"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#65cea7"
          @select="handleSelect"
          :router="true"
          :unique-opened="true"
          >
          <el-submenu v-for="item in menu" :index="item.name" :key="item.name">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="it in item.submenu" :key="it.name">
              <el-menu-item :index="it.path">{{it.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main-content" >
      <div class="header-section">baby care</div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  data () {
    return {
      selectMenu: {},
      menu: [{
        name: '表格',
        icon: 'el-icon-menu',
        submenu: [{
          name: '食量',
          path: '/babycare/main'
        }]
      },
      {
        name: '图形',
        icon: 'el-icon-picture',
        submenu: [
          {
            name: '线形图',
            path: '/babycare/line'
          },
          {
            name: '柱状图',
            path: '/babycare/bar'
          },
          {
            name: '饼状图',
            path: '/babycare/pie'
          }
        ]
      },
      {
        name: '添加',
        icon: 'el-icon-edit-outline',
        submenu: [{
          name: '新增',
          path: '/babycare/add'
        },
        {
          name: '编辑',
          path: '/babycare/edit/id/',
          disabled: true
        }]
      }]
    }
  },
  computed: {
    activeIndex () {
      let path = ''
      this.menu.forEach((item) => {
        item.submenu.forEach((itm) => {
          if (this.$route.path.indexOf(itm.path) > -1) {
            path = itm.path
          }
        })
      })
      return path
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.pathToMenu(keyPath[1])
    },
    pathToMenu (path) {
      this.menu.forEach((item) => {
        item.submenu.forEach((itm) => {
          if (path.indexOf(itm.path) > -1) {
            this.selectMenu.mainMenu = item.name
          }
        })
      })
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.container .el-menu-item {
  height: 50px;
  line-height: 50px;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>
<style lang="scss">
  .container {
    .left-side__bar {
      position: fixed;
      height: 100%;
      z-index: 100;
      width: 250px;
      background-color: #545c64;
      overflow-x: hidden;
      overflow-y: inherit;
      .el-menu {
        border: 0 none;
      }
    }
    .header-section {
      font-size: 20px;
      line-height: 60px;
      text-align: center;
      font-weight: bold;
    }
    .main-content {
      margin-left: 250px;
    }
    .el-menu-item {
      margin: 0;
      height: 56px;
      line-height: 56px;
    }
  }
</style>

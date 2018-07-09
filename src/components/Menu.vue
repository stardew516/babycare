<template>
  <div class="container">
    
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
    <div class="table">
      <el-table
        :data="list"
        stripe
        align="center"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="yield"
          label="奶量">
          <!-- <template slot-scope="scope">
            <span class="link" :ref="scope.row.id">{{specialLink}}{{scope.row.id}}</span>
          </template> -->
        </el-table-column>
        <el-table-column
          :span-method="weekYield"
          label="一周">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getMilk()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    saveMilk () {
      this.$http.post('http://localhost:3003/milk', {
        'date': '今天',
        'yield': '123'
      }).then((data) => {
        console.log(data.body)
      }, () => {
        console.log('error')
      })
    },
    getMilk () {
      this.$http.get('http://localhost:3003/milk').then((data) => {
        console.log(data.body)
        this.list = data.body
      }, () => {
        console.log('error')
      })
    },
    weekYield ({ row, column, rowIndex, columnIndex }) {
      console.log(row, column, rowIndex, columnIndex)
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2]
      //   } else if (columnIndex === 1) {
      //     return [0, 0]
      //   }
      // }
    }
  }
}
</script>

<style scoped>

</style>

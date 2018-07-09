<template>
  <div class="container">
    <div class="title">{{date}}日食量表</div>
    <div class="table">
      <el-table
        :data="list"
        stripe
        align="center"
        header-align="center"
        show-summary
        style="width: 100%">
        <el-table-column
          prop="time"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="yield"
          label="食量">
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
      list: [],
      date: ''

    }
  },
  mounted () {
    this.getMilk()
  },
  methods: {
    getMilk () {
      this.$http.get('http://localhost:3003/milk').then((data) => {
        this.list = data.body[0].data
        this.date = data.body[0].date
      }, () => {
        console.log('error')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 60px;
  text-align: center;
  color: #666;
  border-bottom: 1px solid #ddd;
}
</style>

<template>
  <div class="container">
    <div class="title">{{date}}日食量图</div>
    <v-pie :data="chartData"></v-pie>
  </div>
</template>

<script>
import VPie from 'v-charts/lib/pie.common'
export default {
  name: 'Line',
  data () {
    return {
      chartData: {
        columns: ['time', 'yield'],
        rows: []
      },
      date: ''
    }
  },
  components: {
    VPie
  },
  mounted () {
    this.getMilk()
  },
  methods: {
    getMilk () {
      this.$http.get('http://localhost:3003/milk').then((data) => {
        this.chartData.rows = data.body[0].data
        this.date = data.body[0].date
        console.log(this.chartData)
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

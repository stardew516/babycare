<template>
  <div class="container">
    <div class="title">{{date}}日食量图</div>
    <v-line :data="chartData"></v-line>
  </div>
</template>

<script>
import VLine from 'v-charts/lib/line.common'
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
    VLine
  },
  mounted () {
    this.getMilk()
  },
  methods: {
    getMilk () {
      this.$http.get('http://localhost:3003/milk').then((data) => {
        this.chartData.rows = data.body[0].data
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

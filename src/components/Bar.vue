<template>
  <div class="container">
    <div class="title">{{date}}日食量图</div>
    <v-bar :data="chartData"></v-bar>
  </div>
</template>

<script>
import VBar from 'v-charts/lib/bar.common'
export default {
  name: 'Bar',
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
    VBar
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

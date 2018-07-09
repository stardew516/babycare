<template>
  <div class="container">
    <div class="add">
      <span class="column-title">添加类型: </span>
      <el-select class="column-type" v-model="add_type" @change="changeType()" placeholder="请选择">
        <el-option
          v-for="item in addType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker class="column-date"
        v-model="milk_date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div class="column-milk">
        <div class="milk-list" v-for="(item, index) in milk_arr" :key="index">
          <el-input class="column-time" v-model="item.milk_time" placeholder="请输入时间"></el-input>
          <el-input class="column-value" v-model="item.milk_yield" placeholder="请输入量"></el-input>
        </div>
        <el-button type="primary" @click="addMilk" :disabled="disabled">新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data () {
    return {
      disabled: false,
      add_type: 'milk',
      milk_date: '',
      milk_arr: [
        { milk_time: '', milk_yield: '' }, { milk_time: '', milk_yield: '' },
        { milk_time: '', milk_yield: '' }, { milk_time: '', milk_yield: '' },
        { milk_time: '', milk_yield: '' }, { milk_time: '', milk_yield: '' },
        { milk_time: '', milk_yield: '' }, { milk_time: '', milk_yield: '' },
        { milk_time: '', milk_yield: '' }, { milk_time: '', milk_yield: '' }
      ],
      list: [],
      addType: [
        {
          value: 'milk',
          label: 'milk'
        }
      ],
      milk: [
        {
          date: '',
          data: [
            {
              'time': '',
              'yield': ''
            }
          ]
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }]
      }
    }
  },
  mounted () {
    this.getMilk()
  },
  watch: {
    milk_arr: {
      handler: function (val) {
        // console.log('arr', val)
      },
      deep: true
    }
  },
  methods: {
    addMilk () {
      this.disabled = true
      let data = []
      for (let i = 0, len = this.milk_arr.length; i < len; i++) {
        if (this.milk_arr[i].milk_yield) {
          data.push(this.milk_arr[i])
        }
      }
      if (data.length > 0) {
        let params = {
          date: this.milk_date,
          data: data
        }
        this.$http.post('http://localhost:3003/milk', params).then((data) => {
          console.log(data.body)
          this.$message.success('新增成功~')
          this.$router.push({name: 'Edit', params: {id: data}})
        }, () => {
          console.log('error')
          this.$message.error('新增失败~')
        })
      }
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
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    changeType () {

    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  padding: 20px;
  .column-title {
    width: 120px;
  }
  .column-type {
    width: 150px;
    margin-right: 10px;
  }
  .column-date {
    width: 200px;
    margin-right: 10px;
  }
  .column-milk {
    flex: 1;
    display: flex;
    flex-direction: column;
    .milk-list {
      display: flex;
      margin-bottom: 10px;
      .column-time {
        flex: 1;
        margin-right: 10px;
      }
      .column-value {
        flex: 1;
      }
    }
  }
}
</style>

// pages/components/cardlist/cardlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Array,
      default: []
    }
  },

  onLoad(options){
    console.log(options)
    console.log(tis.dataList)
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    loading: false,
    scroll: -1, // 1：向下滚动， -1：向上滚动
    data: {record: []},
    reqvo: {pageNo: 1}
  },
  onLoad: function () {
    wx.getSystemInfo({
      complete: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    this.getData()
  },

  /**
   * 获取数据
   * @param {*} pageNo 页码
   */
  getData(pageNo){
    if (this.data.loading)
      return false
    this.setData({ 
      loading: true,
      'reqvo.pageNo': pageNo || this.data.reqvo.pageNo
    })
    let temp = []
    let now = new Date().getTime()
    for (let i = 0; i < 10; i++){
      let entity = {
        id: i+1,
        cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
        title: '我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我',
        createTime: '十天前',
        endTime: new Date().getTime()+Math.random()*1000000000,
        user: {
          avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
          nickname: '凯尔'
        }
      }
      entity.leftTime = this.calcLeftTime(entity.endTime - now)
      temp.push(entity)
    }
    this.setData({
      'data.record': temp
    })
    setTimeout(() => {this.setData({ loading: false })}, 1000)
  },

  /**
   * 计算投票还有多长时间结束
   * @param {*} time 
   */
  calcLeftTime(time){
    time /= 1000
    if (time > 86400){
      let res = parseInt(time / 86400)
      if (res <= 3){
        return res + '天'
      }
      return null
    } else if (time > 3600){
      return parseInt(time / 3600) + '小时'
    } else if (time > 60){
      return parseInt(time / 60) + '分'
    }
    return time + '秒'
  },

  /**
   * 投票详情
   */
  voteDetail(e){
    app.globalData.vote = this.getVoteById(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../voteDetail/voteDetail',
    })
  },

  getVoteById(id){
    for (let i = 0; i < this.data.data.record.length; i++){
      if (id == this.data.data.record[i].id)
        return this.data.data.record[i]
    }
  },

  /**
   * 监听上下滚动
   * @param {*} ev 
   */
  onPageScroll: function (ev) {
    if (ev.detail.deltaY > 0){ // 向上滚动
      if (this.data.scroll != -1)
        this.setData({ scroll: -1 })
    } else if (ev.detail.deltaY < 0){ // 向下滚动
      if (this.data.scroll != 1)
        this.setData({ scroll: 1 })
    }
  },

  /**
   * 加载更多
   */
  loadMore(e){
    this.getData(this.data.reqvo.pageNo + 1)
  }
})

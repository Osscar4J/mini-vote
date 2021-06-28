// pages/home/home.js
let col1H = 0;let col2H = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {                
        let ww = res.windowWidth;                
        let wh = res.windowHeight;                
        let imgWidth = ww * 0.48;                
        let scrollH = wh;                
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });                //加载首组图片
        this.loadImages();
      }
    })
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id === imageId) {
            imageObj = img;
            break;
        }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
        col1H += imgHeight;
        col1.push(imageObj);
    } else {
        col2H += imgHeight;
        col2.push(imageObj);
    }

    let data = {
        loadingCount: loadingCount,
        col1: col1,
        col2: col2
    };

    if (!loadingCount) {
        data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    let images = [
        { pic: "https://cdn6-banquan.ituchong.com/weili/l/920164728538267704.webp", height: 0 },
        { pic: "https://cdn3-banquan.ituchong.com/weili/l/915523217510629406.webp", height: 0 },
        { pic: "https://cdn6-banquan.ituchong.com/weili/l/902862504321744954.webp", height: 0 },
        { pic: "https://cdn3-banquan.ituchong.com/weili/l/1002265175989157900.webp", height: 0 }
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
        images[i].id = baseId + "-" + i;
    }

    this.setData({
        loadingCount: images.length,
        images: images
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
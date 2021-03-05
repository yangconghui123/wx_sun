// pages/businessCenter/businessCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    page:1,
    salesman_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getbusiness()
  },
  getbusiness:function(){
    var t = this;
    getApp().core.showLoading({
      title: "加载中"
  });
    getApp().request({
      url: getApp().api.user.salesman_index,
      data:{
        keyword:t.data.keyword,
        page:t.data.page,
        pageSize:10
      },
      success: function(e) {
        var list = t.data.salesman_list;
        if (e.code == 0) {
          if(e.data.list.length>0){
            t.setData({
              pagePag:true
            })
          }else{
            t.setData({
              pagePag:false
            })
            return;
          }
          t.setData({
            salesman_list:list.concat(e.data.list)
          })
        }
        getApp().core.hideLoading();
      }
  });
  },
  seeOrder(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/business_center/order_list?id='+e.currentTarget.id,
    })
  },
  inputkeyword(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  seachchange(){
    this.setData({
      salesman_list:[],
      page:1
    })
    this.getbusiness()
  },
  onReachBottom: function () {
    if(this.data.pagePag==true){
      this.data.page++;
      this.getbusiness()
    }
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
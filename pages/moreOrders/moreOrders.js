// pages/moreOrders/moreOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlogistics(options.id)
  },

  getlogistics(order_id){
    var  that = this;
    getApp().request({
      url: getApp().api.order.order_multi_express,
      data: {
        order_id: order_id
      },
      success: function (t) {
       console.log(t)
       if(t.code==0){
        that.setData({
          logistic:t.data
         })
       }else{
        getApp().core.showModal({
          title: "提示",
          content: t.msg,
          showCancel: !1,
          success: function(t) {
            
          }
      });
       }
    
      }
    })
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
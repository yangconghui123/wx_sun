// pages/modifyNickname/modifyNickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    getApp().request({
      url: getApp().api.user.get_nickname,
      data: {},
      method: "GET",
      success: function (res) {
        console.log(res)
        that.setData({
          userName:res.nickname
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inputuserName: function (e) {
    console.log(e)
    this.setData({
      userName: e.detail.value
    })
  },
  submitbt:function(){
    if(this.data.userName==""){
              wx.showModal({
          content: '请上传支付凭证',
          showCancel: false,
        })
        return;
    }
    var that = this;
    getApp().request({
      url: getApp().api.user.change_nickname,
      data: {
        nickname:this.data.userName
      },
      method: "GET",
      success: function (res) {
        wx.showModal({
          content: '修改成功 ',
          showCancel: false,
          success:function(){
            wx.navigateBack()
          }
        })
      }
    })
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
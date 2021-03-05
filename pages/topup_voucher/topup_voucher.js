// pages/topup_voucher/topup_voucher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_img: "",
    money: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 上传充值凭证
  business_license: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        getApp().core.uploadFile({
          url: getApp().api.default.upload_image,
          name: "image",
          formData: "",
          filePath: res.tempFilePaths[0],
          complete: function (t) {
            console.log(t)
            if (t.data) {
              var e = JSON.parse(t.data);
              that.setData({
                business_img: e.data.url
              });
            }
          }
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      }
    });
  },
  submitbt: function () {
    if (this.data.money == "") {
      wx.showModal({
        content: '请输入充值金额',
        showCancel: false,
      })
      return;
    }
    if(this.data.business_img==''){
      wx.showModal({
        content: '请上传充值凭证',
        showCancel: false,
      })
      return;
    }
    getApp().request({
      url: getApp().api.user.recharge_log_submit,
      data: {
        recharge: this.data.business_img,
        money: this.data.money
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.code == 0) {
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 500)
        }
        wx.showToast({
          icon: "none",
          title: res.msg,
        })
      }
    });
  },
  input: function (t) {
    console.log(t.detail.value)
    this.setData({
      money: t.detail.value
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
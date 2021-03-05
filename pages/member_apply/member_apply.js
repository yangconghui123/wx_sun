// pages/member_play/member_play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['线上支付', '线下支付'],
    pay_index: 0,
    offline_payment: false,
    paytype: "请选择",
    business_img: "",
    foodPermit_img: "",
    pay_img: "",
    userName: "",
    userPhone: "",
    submbtn:true,
    foodPermit_imgshow:"",
    business_imgshow:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      level: options.level
    })
    var memberinfo = wx.getStorageSync('memberInfo');
    console.log(memberinfo)
    if (memberinfo.name != undefined) {
      this.setData({
        userName: memberinfo.name,
        userPhone: memberinfo.phone,
        business_img: memberinfo.business_license,
        foodPermit_img: memberinfo.food_circulation_license,
        business_imgshow: memberinfo.business_license,
        foodPermit_imgshow: memberinfo.food_circulation_license,
        pay_index: memberinfo.pay_type,
        pay_img: memberinfo.voucher,
        paytype: this.data.array[memberinfo.pay_type]
      })
      if (memberinfo.pay_type == 1) {
        this.setData({
          offline_payment: true
        })
      }
    }
  },
  bindPickerChange: function (e) {
    console.log(e)
    var index = e.detail.value;
    this.setData({
      pay_index: e.detail.value,
      paytype: this.data.array[index]
    })
    if (e.detail.value == 1) {
      this.setData({
        offline_payment: true
      })
    } else {
      this.setData({
        offline_payment: false
      })
    }
  },
  inputuserName: function (e) {
    console.log(e)
    this.setData({
      userName: e.detail.value
    })
  },
  inputuserPhone: function (e) {
    console.log(e)
    this.setData({
      userPhone: e.detail.value
    })
  },
  // 营业执照上传
  business_license: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        wx.showLoading({
          title:'图片上传中....',
        })
        that.setData({
          business_imgshow:res.tempFilePaths[0]
        });
        getApp().core.uploadFile({
          url: getApp().api.default.upload_image,
          name: "image",
          formData: "",
          filePath: res.tempFilePaths[0],
          complete: function (t) {
            console.log(t)
            wx.hideLoading()
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
  // 食品许可证
  foodPermit: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        wx.showLoading({
          title:'图片上传中....',
        })
        that.setData({
          foodPermit_imgshow:res.tempFilePaths[0]
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        getApp().core.uploadFile({
          url: getApp().api.default.upload_image,
          name: "image",
          formData: "",
          filePath: res.tempFilePaths[0],
          complete: function (t) {
            wx.hideLoading()
            console.log(t)
            if (t.data) {
              var e = JSON.parse(t.data);
              that.setData({
                foodPermit_img: e.data.url
              });
            }
          }
        });
      }
    });
  },
  payVoucher: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        getApp().core.uploadFile({
          url: getApp().api.default.upload_image,
          name: "image",
          formData: "",
          filePath: res.tempFilePaths[0],
          complete: function (t) {
            console.log(t)
            if (t.data) {
              var e = JSON.parse(t.data);
              console.log(e)
              that.setData({
                pay_img: e.data.url
              });
            }
          }
        });
      }
    });
  },
  submitbt: function () {
    var that = this;
    if (this.data.userName == '') {
      wx.showToast({
        icon: "none",
        title: '请填写您的姓名',
      })
      return;
    } else if (this.data.userPhone == '') {
      wx.showToast({
        icon: "none",
        title: '请填写联系电话',
      })
      return;
      // else if (this.data.paytype == '请选择') {
      //   wx.showToast({
      //     icon: "none",
      //     title: '请选择支付类型',
      //   })
      //   return;
      // }
    } else if (this.data.business_img == '') {
      wx.showModal({
        content: '请上传营业执照',
        showCancel: false,
      })
      return;
    } else if (this.data.foodPermit_img == '') {
      wx.showModal({
        content: '请上传食品许可证',
        showCancel: false,
      })
      return;
      // else if (this.data.pay_index == 1 && this.data.pay_img == '') {
      //   wx.showModal({
      //     content: '请上传支付凭证',
      //     showCancel: false,
      //   })
      //   return;
      // }
    }  else {
      var memberInfo = {
        name: this.data.userName,
        phone: this.data.userPhone,
        business_license: this.data.business_img,
        food_circulation_license: this.data.foodPermit_img,
        pay_type:1,
        voucher: this.data.pay_img
      }
      wx.setStorageSync('memberInfo', memberInfo);
      getApp().request({
        url: getApp().api.user.apply_level,
        data: {
          apply_level: this.data.level,
          name: this.data.userName,
          phone: this.data.userPhone,
          business_license: this.data.business_img,
          food_circulation_license: this.data.foodPermit_img,
          pay_type:1,
          voucher: this.data.pay_img
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          if (res.code == 0) {
            // if (that.data.pay_index == 0) {
            //   if(that.data.submbtn==false){
            //     return
            //   }
            //   that.setData({
            //     submbtn:false
            //   })
            //   getApp().request({
            //     url: getApp().api.user.submit_member,
            //     data: {
            //       level_id: that.data.level,
            //       applylevel_id: res.apply_level_id,
            //       pay_type: "WECHAT_PAY"
            //     },
            //     method: "POST",
            //     success: function (resdata) {
            //       getApp().core.requestPayment({
            //         _res: resdata,
            //         timeStamp: resdata.data.timeStamp,
            //         nonceStr: resdata.data.nonceStr,
            //         package: resdata.data.package,
            //         signType: resdata.data.signType,
            //         paySign: resdata.data.paySign,
            //         success(res) {
            //           getApp().core.showModal({
            //             title: "提示",
            //             content: "已完成支付并提交会员申请，等待审核",
            //             showCancel: !1,
            //             confirmText: "确认",
            //             success: function (t) {
            //               getApp().core.navigateBack({
            //                 delta: 1
            //               });
            //             }
            //           })
            //         },
            //         fail(res) {
            //           that.setData({
            //             submbtn:true
            //           })
            //           getApp().core.showModal({
            //             title: "提示",
            //             content: "您未完成支付，申请会员失败",
            //             showCancel: !1,
            //             confirmText: "确认"
            //           });
            //         }
            //       });
            //     }
            //   })
            // } else {
            //   getApp().core.showModal({
            //     title: "提示",
            //     content: "已提交会员申请，等待审核",
            //     showCancel: !1,
            //     confirmText: "确认",
            //     success: function (t) {
            //       getApp().core.navigateBack({
            //         delta: 1
            //       });
            //     }
            //   });
            // }
            getApp().core.showModal({
              title: "提示",
              content: "已提交会员申请，等待审核",
              showCancel: !1,
              confirmText: "确认",
              success: function (t) {
                getApp().core.navigateBack({
                  delta: 1
                });
              }
            });
          }else{
            wx.showToast({
              icon:"none",
              title:res.msg,
            })
          }
        }
      });
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
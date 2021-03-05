var area_picker = require("./../../components/area-picker/area-picker.js");

Page({
  data: {
    name: "",
    mobile: "",
    detail: "",
    district: null,
    array: ['男', '女'],
    sex_index: 0,
    birthday: "",
    isdisabled: false
  },
  onLoad: function (e) {
    getApp().page.onLoad(this, e);
    var t = this;
    t.getDistrictData(function (e) {
      area_picker.init({
        page: t,
        data: e
      });
    }), t.setData({
      address_id: e.id
    }), e.id && (getApp().core.showLoading({
      title: "正在加载",
      mask: !0
    }), getApp().request({
      url: getApp().api.user.address_detail,
      data: {
        id: e.id
      },
      success: function (e) {
        getApp().core.hideLoading(), 0 == e.code && t.setData(e.data);
      }
    }));

  },
  onShow: function () {
    getApp().page.onShow(this);
    var that = this;
    getApp().request({
      url: getApp().api.user.memberInfo,
      method: "POST",
      success: function (t) {
        console.log(t)
        if (0 == t.code) {
          var user = t.data.user;
          var level = t.data.level;
          that.setData({
            is_level: user.is_level,
            name: user.realname,
            mobile: user.tel,
            detail: user.address,
            level_id: level.id
          })
          if (user.realname == null) {
            that.setData({
              name: "",
              isdisabled: true
            })
          } else {
            that.setData({
              name: user.realname,
              isdisabled: false
            })
          }
          if (user.area == null) {
            that.setData({
              district: null
            })
          } else {
            var arr = user.area.split(",");
            console.log(arr)
            that.setData({
              'district.province.name': arr[0],
              'district.city.name': arr[1],
              'district.district.name': arr[2]
            })
          }
          if (user.sex == 2) {
            that.setData({
              sex_index: 1,
              isdisabled: true
            })
          } else if (user.sex == 1) {
            that.setData({
              sex_index: 0,
              isdisabled: true
            })
          } else if (user.sex == null) {
            that.setData({
              sex_index: 0,
              isdisabled: false
            })
          }
          if (user.birthday == null) {
            that.setData({
              birthday: "",
              isdisabled: false
            })
          } else {
            that.setData({
              birthday: user.birthday,
              isdisabled: true
            })
          }
        }
      }
    });
  },
  getDistrictData: function (t) {
    var i = getApp().core.getStorageSync(getApp().const.DISTRICT);
    if (!i) return getApp().core.showLoading({
      title: "正在加载",
      mask: !0
    }), void getApp().request({
      url: getApp().api.default.district,
      success: function (e) {
        getApp().core.hideLoading(), 0 == e.code && (i = e.data, getApp().core.setStorageSync(getApp().const.DISTRICT, i),
          t(i));
      }
    });
    t(i);
  },
  // 性别选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sex_index: e.detail.value
    })
  },
  // 生日
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  onAreaPickerConfirm: function (e) {
    this.setData({
      district: {
        province: {
          id: e[0].id,
          name: e[0].name
        },
        city: {
          id: e[1].id,
          name: e[1].name
        },
        district: {
          id: e[2].id,
          name: e[2].name
        }
      }
    });
  },
  saveAddUserInfo: function () {
    var t = this;

    if (t.data.name == "" || t.data.name == undefined) {
      wx.showToast({
        icon: "none",
        title: '请输入会员姓名',
      })
    } else if (t.data.birthday == "" || t.data.birthday == undefined) {
      wx.showToast({
        icon: "none",
        title: '请选择您的生日',
      })
    } else if (t.data.mobile == "" || t.data.mobile == undefined) {
      wx.showToast({
        icon: "none",
        title: '请输入联系电话',
      })
    } else if (t.data.district == undefined || t.data.district == null) {
      wx.showToast({
        icon: "none",
        title: '请选择所在地区',
      })
    } else if (t.data.detail == undefined || t.data.detail == "") {
      wx.showToast({
        icon: "none",
        title: '请输入详细地址',
      })
    } else {
      var area = t.data.district.province.name + "," + t.data.district.city.name + "," + t.data.district.district.name;
      var sex;
      if (t.data.sex_index == 0) {
        sex = 1;
      } else {
        sex = 2
      }
      getApp().core.showLoading({
        title: "正在保存",
        mask: !0
      });
      var e = t.data.district;
      e || (e = {}), getApp().request({
        url: getApp().api.user.submit_member_info,
        method: "post",
        data: {
          realname: t.data.name,
          tel: t.data.mobile,
          birthday: t.data.birthday,
          area: area,
          sex: sex,
          address: t.data.detail
        },
        success: function (e) {
          console.log(e)
          if (e.code == 0) {
            t.setData({
              isdisabled: true
            })
          }
          getApp().request({
            url: getApp().api.user.submit_member,
            data: {
              level_id: t.data.level_id,
              pay_type: "WECHAT_PAY"
            },
            method: "POST",
            success: function (res) {
              if (0 == res.code) {
                getApp().core.requestPayment({
                  _res: res,
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success(res) {
                    getApp().core.showModal({
                      title: "提示",
                      content: "会员购买成功，您将收到一个会员大礼包，请在订单列表中查看。",
                      showCancel: !1,
                      confirmText: "确认",
                      success: function (t) {
                        getApp().core.navigateBack({
                          delta: 1
                        });
                      }
                    })
                  },
                  fail(res) {
                    getApp().core.showModal({
                      title: "提示",
                      content: "订单尚未支付",
                      showCancel: !1,
                      confirmText: "确认"
                    });
                  }
                });

              } else getApp().core.showModal({
                title: "提示",
                content: res.msg,
                showCancel: !1
              }), getApp().core.hideLoading();
              getApp().core.hideLoading();
            }
          });
        }
      });
    }

  },
  // inputBlur: function (e) {
  //   var t = '{"' + e.currentTarget.dataset.name + '":"' + e.detail.value + '"}';
  //   this.setData(JSON.parse(t));
  // },
  inputmobile: function (e) {
    var t = e.detail.value;
    this.setData({
      mobile: t
    });
  },
  inputdetail: function (e) {
    var t = e.detail.value;
    this.setData({
      detail: t
    });
  },
  inputVIPname: function (e) {
    console.log(e)
    var t = e.detail.value;
    this.setData({
      name: t
    });
  },
  getWechatAddress: function (e) {
    var i = this;
    getApp().core.chooseAddress({
      success: function (t) {
        "chooseAddress:ok" == t.errMsg && (getApp().core.showLoading(), getApp().request({
          url: getApp().api.user.wechat_district,
          data: {
            national_code: t.nationalCode,
            province_name: t.provinceName,
            city_name: t.cityName,
            county_name: t.countyName
          },
          success: function (e) {
            1 == e.code && getApp().core.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            }), i.setData({
              name: t.userName || "",
              mobile: t.telNumber || "",
              detail: t.detailInfo || "",
              district: e.data.district
            });
          },
          complete: function () {
            getApp().core.hideLoading();
          }
        }));
      }
    });
  },

});
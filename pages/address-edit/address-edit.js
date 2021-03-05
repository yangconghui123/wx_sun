var area_picker = require("./../../components/area-picker/area-picker.js");
var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js");
const par = require('../../utils/addressparse.js')
let qqMap = new QQMapWX({
   key: 'OXQBZ-SDJCI-W2BG3-5BOND-NB7NO-R6FPO'
});
Page({
  data: {
    name: "",
    mobile: "",
    detail: "",
    district: {
      province: {
        name: ""
      },
      city: {
        name: ""
      },
      district: {
        name: ""
      }
    },
    region: [],
    distinguish: ""
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
  distinguishinput: function (e) {
    //   this.setData({
    //     distinguish: e.detail.value
    //   })
    // },
    // changtext: function () {
    //   var that = this;
    //   var text = that.data.distinguish;
    //   var text = text.replace(/(^\s*)|(\s*$)/g, ""); //清除文本前后空格
    //   if (text == '') {
    //     that.setData({
    //       u_name: '',
    //       u_phone: '',
    //       u_address: ''
    //     })
    //     return;
    //   }
    //   //电话号码正则表达式
    //   var regx = /(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})/g;
    //   var phone_num = text.match(regx);
    //   if (phone_num != null) {
    //     var phone = text.indexOf(phone_num[0]);
    //   }else{
    //   wx.showToast({
    //     icon:"none",
    //     title: '手机号有误',
    //   })
    //   }
    //   var name = text.indexOf("姓名:");
    //   if (name >= 0) {
    //     var phone = text.indexOf("电话:"),
    //       address = text.indexOf("地址:");
    //     var u_name = text.substring(name + 3, phone),
    //       u_phone = text.substring(phone + 3, address),
    //       u_address = text.substring(address + 3, text.length);
    //     that.setData({
    //       u_name: u_name,
    //       u_phone: u_phone,
    //       u_address: u_address
    //     })
    //   } else if (phone >= 0) {
    //       var u_name = text.substring(0, phone),
    //       u_phone = text.substring(u_name, phone + 11);
    //       console.log(u_name.length)
    //       var str = text.substring(0,7).replace(/(^\s*)|(\s*$)/g, "");
    //       var reg=/\d/;
    //       var one_name = text.replace(/(^\s*)|(\s*$)/g, "");
    //       var u_name1 = one_name.trim().split(" ");
    //       var arr = [];
    //       for(var i=0;i<u_name1.length;i++){
    //         if(u_name1[i]==""){
    //           // u_name1.splice(i,i);
    //         }else{
    //           arr.push(u_name1[i])
    //         }
    //       }
    //       console.log(arr)
    //       var stext = text.substring(0,3).replace(/(^\s*)|(\s*$)/g, "");
    //     if(reg.test(stext)){
    //       console.log(phone)
    //       // var u_name = text.substring(0, phone);
    //       // u_phone = text.substring(phone, phone + 11),
    //       // console.log(phone)
    //       // u_address = text.substring(phone + 11, text.length);

    //       if(arr[1].length>5){
    //         //判断 手机号在前 地址第二个
    //         var u_name = arr[2];
    //         u_address = arr[1];
    //         u_phone = arr[0];
    //       }else{
    //         var u_name = arr[1];
    //         u_address = arr[2];
    //         u_phone = arr[0];
    //       }
    //     }else{
    //       var reg=/\d/;
    //       console.log(arr[0].length)
    //       if(arr[0].length>5){
    //         var phone2 = arr[0];
    //         var str = phone2.substring(0,4).replace(/(^\s*)|(\s*$)/g, "");
    //         if(reg.test(str)){
    //           if(arr[1].length>5){
    //             var u_name = arr[2];
    //             u_address = arr[1];
    //             u_phone = arr[0];
    //           }else {
    //             var u_name = arr[1];
    //             u_address = arr[2];
    //             u_phone = arr[0];
    //           }

    //         }else{
    //           var phone2 = arr[1];
    //           var str = phone2.substring(0,4).replace(/(^\s*)|(\s*$)/g, "");
    //           // 判断 地址在前，手机号 在第二
    //           if(arr[1].length>5&&arr[0].length<5){
    //             var u_name = arr[0];
    //             u_address = arr[2];
    //             u_phone = arr[1];
    //           }else if(arr[0].length>5 && reg.test(str)){
    //             var u_name = arr[2];
    //             u_address = arr[0];
    //             u_phone = arr[1];
    //             // 判断 地址在前，手机号 不在第二
    //           }else if(arr[0].length>5 && !reg.test(str)){
    //             var u_name = arr[1];
    //             u_address = arr[0];
    //             u_phone = arr[2];
    //           }else{
    //             var u_name = arr[2];
    //             u_address = arr[0];
    //             u_phone = arr[1];
    //           }
    //         }
    //         // var phonetext = arr[1].substring(0,4).replace(/(^\s*)|(\s*$)/g, "")
    //         // var phone2 = arr[2];
    //         // if(reg.test(phone2)){
    //         //   var str = phone2.substring(0,4).replace(/(^\s*)|(\s*$)/g, "");
    //         // }
    //         // if(reg.test(str)){
    //         //   var u_name = arr[1];
    //         //   u_address = arr[0];
    //         //   u_phone = arr[2];
    //         // }else if(reg.test(phonetext)){
    //         //   var u_name = arr[2];
    //         //   u_address = arr[0];
    //         //   u_phone = arr[1];
    //         // }else{
    //         //   var u_name = arr[1];
    //         //   u_address = text.substring(arr[0].length+1,phone);
    //         //   u_phone = text.substring(phone,text.length);
    //         // }
    //       }else{
    //         var reg=/\d/;
    //         var phonettext = arr[1];
    //         var strtext = phonettext.substring(0,4).replace(/(^\s*)|(\s*$)/g, "");
    //         if(arr[1].length>5&&reg.test(strtext)){
    //           var u_name = arr[0],
    //           u_address = arr[2];
    //           u_phone = arr[1];
    //         }else{
    //           var u_name = arr[0],
    //           u_address = arr[1];
    //           u_phone = arr[2];
    //         }

    //       }
    //     }

    //     that.setData({
    //       u_name: u_name,
    //       u_phone: u_phone,
    //       u_address: u_address
    //     })
    //   } else {
    //     that.setData({
    //       u_name: '',
    //       u_phone: '',
    //       u_address: ''
    //     })
    //     return;
    //   }
    //   that.setData({
    //     name: u_name, //收货人
    //     mobile: u_phone, //联系方式
    //   })
    //   console.log(u_address)
    //   const replaceStr2 = (str, index, char) => {
    //     return str.substring(0, index) + char + str.substring(index + 1);
    //     }
    //   qqMap.geocoder({
    //     address:u_address,
    //     complete: res => {
    //       console.log(res)
    //       if(res.status==0){
    //         var result = res.result.address_components;
    //         u_address = u_address.replace(/,$/gi, "");
    //         that.setData({
    //           district: {
    //             province: {
    //               name:result.province
    //             },
    //             city: {
    //               name:result.city
    //             },
    //             district: {
    //               name:result.district
    //             }
    //           },

    //           detail:u_address, //详细地址
    //         });
    //       }else{
    //         getApp().core.showModal({
    //           title: "提示",
    //           content:"该地址无法解析",
    //           showCancel: !1,
    //           success: function (e) {}
    //         })
    //         return
    //       }

    //         }
    //     });
    var that = this;
    let parse_list = par.parse(e.detail.value);
    console.log(parse_list)
    var u_addres = parse_list.province + parse_list.area + parse_list.city + parse_list.addr;
    that.setData({
      name: parse_list.name, //收货人
      mobile: parse_list.mobile, //联系方式
      detail: parse_list.addr, //详细地址
    });
    qqMap.geocoder({
      address: u_addres,
      complete: resdata => {
        console.log(resdata)
        if (resdata.status == 0) {
          var result = resdata.result.address_components;
          that.setData({
            district: {
              province: {
                name: result.province
              },
              city: {
                name: result.city
              },
              district: {
                name: result.district
              }
            },
          });
        } else {
          getApp().core.showModal({
            title: "提示",
            content: "该地址无法解析",
            showCancel: !1,
            success: function (e) {}
          })
          return
        }

      }
    });

    // wx.request({
    //   url: 'https://wangzc.wang/smAddress',
    //   data: {
    //     address: e.detail.value
    //   },
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res)
    //     var result = res.data;

    //   }
    // })
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    var list = getApp().core.getStorageSync(getApp().const.DISTRICT);
    console.log(list)
    // for (var i = 0; i < list.length; i++) {
    //   if (e.detail.value[0] == list[i].name) {
    //     this.setData({
    //       province_id: list[i].id
    //     })
    //   }
    //   for (var j = 0; j < list[i].list.length; j++) {
    //     if (list[i].list[j].name == e.detail.value[1]) {
    //       this.setData({
    //         city_id: list[i].list[j].id
    //       })
    //     }
    //     for (var z = 0; z < list[i].list[j].list.length; z++) {
    //       if (list[i].list[j].list[z].name == e.detail.value[2]) {
    //         this.setData({
    //           district_id: list[i].list[j].list[z].id
    //         })
    //       }
    //     }
    //   }
    // }
    var province = 'district.province.name';
    var city = 'district.city.name';
    var district = 'district.district.name';
    this.setData({
      [province]: e.detail.value[0],
      [city]: e.detail.value[1],
      [district]: e.detail.value[2]
    })
  },
  saveAddress: function () {
    var t = this;
    console.log(this.data.district.province.name)
    if (this.data.district.province.name == null || this.data.district.province.name == "") {
      wx.showToast({
        icon: "none",
        title: "请选择省市区"
      });
      return
    }
    getApp().core.showLoading({
      title: "正在保存",
      mask: !0
    });
    var e = t.data.district;
    e || (e = {
      province: {
        id: ""
      },
      city: {
        id: ""
      },
      district: {
        id: ""
      }
    }), getApp().request({
      url: getApp().api.user.address_save,
      method: "post",
      data: {
        address_id: t.data.address_id || "",
        name: t.data.name,
        mobile: t.data.mobile,
        province: t.data.district.province.name,
        city: t.data.district.city.name,
        district: t.data.district.district.name,
        detail: t.data.detail
      },
      success: function (e) {
        getApp().core.hideLoading(), 0 == e.code && getApp().core.showModal({
          title: "提示",
          content: e.msg,
          showCancel: !1,
          success: function (e) {
            e.confirm && getApp().core.navigateBack();
          }
        }), 1 == e.code && t.showToast({
          title: e.msg
        });
      }
    });
  },
  inputmobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputBlur: function (e) {
    // var t = '{"' + e.currentTarget.dataset.name + '":"' + e.detail.value + '"}';
    // this.setData(JSON.parse(t));
    this.setData({
      detail: e.detail.value
    })
    console.log(e.detail.value)
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
            console.log(e)
            1 == e.code && getApp().core.showModal({
              title: "提示",
              content: e.msg,
              showCancel: !1
            }), i.setData({
              name: t.userName || "",
              mobile: t.telNumber || "",
              detail: t.detailInfo || "",
              district: e.data.district,
              province_id: e.data.district.province.id,
              city_id: e.data.district.city.id,
              district_id: e.data.district.district.id,
            });
          },
          complete: function () {
            getApp().core.hideLoading();
          }
        }));
      }
    });
  },
  onShow: function () {
    getApp().page.onShow(this);
  }
});
var siteinfo = require("./../../siteinfo.js");

function setOnShowScene(t) {
    getApp().onShowData || (getApp().onShowData = {}), getApp().onShowData.scene = t;
}

Page({
    data: {
        list: "",
        VIP_img: "",
        index: 0,
        listdetail: {},
        listtab: [],
        status: 0,
        current_key: 0
    },
    onLoad: function (t) {
        getApp().page.onLoad(this, t);
        var e = this;
        console.log(siteinfo)
        this.setData({
            VIP_img: siteinfo.root + "/attachment/img/VIP_img@2x.png",
            user_center_bg: siteinfo.root + "attachment/img/background.png",
            index: t.status,
            current_key: 0
        })
    },
    onShow: function () {
        var that = this;
        that.setData({
            my: "undefined" != typeof my
        }), getApp().core.showLoading({
            title: "加载中"
        }), getApp().request({
            url: getApp().api.user.member,
            method: "POST",
            success: function (t) {
                console.log(t.data.user_info)
                getApp().core.hideLoading(), 0 == t.code && (that.setData(t.data), that.setData({
                    current_key: that.data.current_key
                }), t.data.list && that.setData({
                    buy_price: t.data.list[that.data.current_key].price,
                    listtab: t.data.list,
                    listdetail: t.data.list[that.data.current_key]
                }));
                var USER_INFO = getApp().core.getStorageSync("USER_INFO");
                USER_INFO.level = t.data.user_info.level;
                USER_INFO.level_endtime = t.data.user_info.level_endtime;
                getApp().core.setStorageSync("USER_INFO", USER_INFO)
            }
        });
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
                        memberuser: user,
                        memberlevel: level
                    })

                }
            }
        });
    },
    ModifyNickname:function(){
        wx.navigateTo({
          url: '/pages/modifyNickname/modifyNickname',
        })
    },
    activeSelect: function (e) {
        console.log(e)
        var status = e.currentTarget.dataset.status;
        this.setData({
            index: status,
            listdetail: this.data.list[status],
            status: status
        })
    },
    showDialogBtn: function () {
        this.setData({
            showModal: !0
        });
    },
    preventTouchMove: function () {},
    hideModal: function () {
        this.setData({
            showModal: !1
        });
    },
    onCancel: function () {
        this.hideModal();
    },
    pay: function (t) {
        var e = t.currentTarget.dataset.key,
            a = this.data.list[e].id,
            n = t.currentTarget.dataset.payment;
        this.hideModal(), getApp().request({
            url: getApp().api.user.submit_member,
            data: {
                level_id: a,
                pay_type: n
            },
            method: "POST",
            success: function (t) {
                if (0 == t.code) {
                    if (setTimeout(function () {
                            getApp().core.hideLoading();
                        }, 1e3), "WECHAT_PAY" == n) return setOnShowScene("pay"), void getApp().core.requestPayment({
                        _res: t,
                        timeStamp: t.data.timeStamp,
                        nonceStr: t.data.nonceStr,
                        package: t.data.package,
                        signType: t.data.signType,
                        paySign: t.data.paySign,
                        complete: function (t) {
                            "requestPayment:fail" != t.errMsg && "requestPayment:fail cancel" != t.errMsg ? "requestPayment:ok" == t.errMsg && getApp().core.showModal({
                                title: "提示",
                                content: "充值成功",
                                showCancel: !1,
                                confirmText: "确认",
                                success: function (t) {
                                    getApp().core.navigateBack({
                                        delta: 1
                                    });
                                }
                            }) : getApp().core.showModal({
                                title: "提示",
                                content: "订单尚未支付",
                                showCancel: !1,
                                confirmText: "确认"
                            });
                        }
                    });
                    "BALANCE_PAY" == n && getApp().core.showModal({
                        title: "提示",
                        content: "充值成功",
                        showCancel: !1,
                        confirmText: "确认",
                        success: function (t) {
                            getApp().core.navigateBack({
                                delta: 1
                            });
                        }
                    });
                } else getApp().core.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1
                }), getApp().core.hideLoading();
            }
        });
    },
    member_info: function (t) {
        for (var i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].is_apply == 1 && this.data.list[i].is_examine == 0) {
                getApp().core.showModal({
                    title: "提示",
                    content: "您当前有待审核的会员申请，请耐心等待，勿重复申请",
                    showCancel: !1,
                    confirmText: "确认",
                });
                return;
            }
        }
        wx.navigateTo({
            url: '/pages/member_apply/member_apply?level=' + this.data.list[this.data.current_key].id,
        })
    },
    changeTabs: function (t) {
        console.log(t)
        if ("undefined" == typeof my) var e = t.detail.currentItemId;
        else e = this.data.list[t.detail.current].id;
        for (var a = t.detail.current, n = parseFloat(this.data.list[0].price), i = this.data.list, o = 0; o < a; o++) n += parseFloat(i[o + 1].price);
        this.setData({
            current_id: e,
            current_key: a,
            buy_price: this.data.list[t.detail.current].price
        });
    },
    det: function (t) {
        var e = t.currentTarget.dataset.index,
            a = t.currentTarget.dataset.idxs;
        if (e != this.data.ids) {
            var n = t.currentTarget.dataset.content;
            this.setData({
                ids: e,
                cons: !0,
                idx: a,
                content: n
            });
        } else this.setData({
            ids: -1,
            cons: !1,
            idx: a
        });
    }
});
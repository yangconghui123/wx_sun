var app = getApp(), api = getApp().api;

Page({
    data: {
        isPageShow: !1,
        order: null,
        showarr:[],
        pop_up:false,
        refundnum:"",
        disabled:true,
        minusStatus:'disable',
        getGoodsTotalPrice: function() {
            return this.data.order.total_price;
        }
    },
    // 
    onLoad: function(e) {
        getApp().page.onLoad(this, e);
        var t = this;
        getApp().core.showLoading({
            title: "正在加载"
        });
        var o = getCurrentPages(), a = o[o.length - 2];
        getApp().request({
            url: getApp().api.order.detail,
            data: {
                order_id: e.id,
                route: a.route
            },
            success: function(e) {
                0 == e.code && t.setData({
                    order: e.data,
                    isPageShow: !0
                });
                var arr = []
                for(var i=0;i<e.data.goods_list.length;i++){
                    if(e.data.goods_list[i].is_refund_status==0){
                        console.log(e.data.goods_list[i])
                        arr.push(e.data.goods_list[i])
                    }
                }
                t.setData({
                    showarr:arr
                });
            },
            complete: function() {
                getApp().core.hideLoading();
            }
        });
    },
    copyText: function(e) {
        var t = e.currentTarget.dataset.text;
        getApp().core.setClipboardData({
            data: t,
            success: function() {
                getApp().core.showToast({
                    title: "已复制"
                });
            }
        });
    },
    //部分退款
    portionRevoke:function(e){
        console.log(e)
        var id = e.currentTarget.dataset.item.order_detail_id;
        var item = e.currentTarget.dataset.item;
        var order_id = this.data.order.order_id;
        // if(this.data.order.is_youhui_status==1){
        //     getApp().core.showModal({
        //         title: "提示",
        //         content:"使用优惠券无法申请部分退款",
        //         showCancel: !1,
        //         success: function(e) {
                
        //         }
        //     });
        //     return;
        // }
        var minusStatus = item.num == 1 ? 'disable' : 'normal';
        var disabled = item.num==1?'true':'false';
        this.setData({
            refundnum:item.num,
            goods_num:item.num,
            pop_up:true,
            refundid:id,
            refundorder_id:order_id,
            minusStatus: minusStatus,
            disabled:disabled
        })
    },
    refund_bt:function(e){
        console.log(e)
        // 1取消 2确定
        var index = e.currentTarget.dataset.index;
        if(index==2){
            var o = this;
            getApp().core.showModal({
                title: "提示",
                content: "是否退款该订单？",
                cancelText: "否",
                confirmText: "是",
                success: function(e) {
                    if (e.cancel) return !0;
                    e.confirm && (getApp().core.showLoading({
                        title: "操作中"
                    }), getApp().request({
                        url: getApp().api.order.part__revoke,
                        data: {
                            order_id:o.data.refundorder_id,
                            orderdetail_id:o.data.refundid,
                            num:o.data.refundnum
                        },
                        method:"GET",
                        success: function(e) {
                            getApp().core.hideLoading(), getApp().core.showModal({
                                title: "提示",
                                content: e.msg,
                                showCancel: !1,
                                success: function(e) {
                                    e.confirm && o.onLoad({
                                        id: o.data.order.order_id
                                    });
                                }
                            });
                        }
                    }));
                }
            });
        }
        this.setData({
            pop_up:false
        })
    },
      /*点击加号*/
  bindPlus: function() {
    var num = this.data.refundnum;
    if(num<this.data.goods_num){
        num++;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
       refundnum:num,
      minusStatus: minusStatus
    })
  },
   /*点击减号*/
   bindMinus: function() {
    var num = this.data.refundnum;
    if (num>1) {
      num--;
    }
    var minusStatus = num>1 ? 'normal':'disable';
    this.setData({
     refundnum:num,
      minusStatus:minusStatus
    })
  },
   /*输入框事件*/
   bindManual: function(e) {
    var num = e.detail.value;
    if(num<=this.data.goods_num){
        num = e.detail.value;
    }else{
       num = this.data.goods_num;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
     refundnum:num,
      minusStatus: minusStatus
    })
  },
  bindblurManual:function(e){
    var num = e.detail.value;
    if(num==''){
     num = this.data.goods_num;
    }
    this.setData({
        refundnum:num
       })
  },
    location: function() {
        var e = this.data.order.shop;
        getApp().core.openLocation({
            latitude: parseFloat(e.latitude),
            longitude: parseFloat(e.longitude),
            address: e.address,
            name: e.name
        });
    },
    orderRevoke: function(t) {
        var o = this;
        getApp().core.showModal({
            title: "提示",
            content: "是否退款该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(e) {
                if (e.cancel) return !0;
                e.confirm && (getApp().core.showLoading({
                    title: "操作中"
                }), getApp().request({
                    url: getApp().api.order.revoke,
                    data: {
                        order_id: t.currentTarget.dataset.id
                    },
                    success: function(e) {
                        getApp().core.hideLoading(), getApp().core.showModal({
                            title: "提示",
                            content: e.msg,
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && o.onLoad({
                                    id: o.data.order.order_id
                                });
                            }
                        });
                    }
                }));
            }
        });
    }
});
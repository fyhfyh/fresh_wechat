const app = getApp();
import { phoneRegisterReset, registerVerify } from '../../api/api.js';
import { editpwd } from '../../api/user.js';
import { CACHE_USERINFO, CACHE_TOKEN, CACHE_EXPIRES_TIME } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '修改密码',
      'color': true,
      'class': '0'
    },
    disabled: false,
    active: false,
    timetext: '获取验证码',
    userInfo: {},
    phone: '',
  },

  inputgetName(e) {
    this.setData({
      password: e.detail.value
    })
  },

  inputgetNames(e) {
    this.setData({
      qr_password: e.detail.value
    })
  },

  onLoadFun: function (e) {
    let userInfo = JSON.parse(wx.getStorageSync(CACHE_USERINFO));
    let account = userInfo.account;
    this.setData({ userInfo: e.detail, account: account });
  },
  /**
   * H5登录 修改密码
   * 
  */
  editPwd: function () {
    let that = this;
    let password = that.data.password;
    let qr_password = that.data.qr_password;
    let userinfo = JSON.parse(wx.getStorageSync(CACHE_USERINFO)) ; 
    let uid = userinfo.uid;
    if(!password){
      wx.showToast({
        title: '请输入新密码!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if(password !=qr_password){
      wx.showToast({
        title: '两次密码不一致!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    editpwd({ uid: uid, password: password }).then(res => {
     app.Tips({ title: res.msg, icon: 'success' });
      wx.redirectTo({
        url: '/pages/user_login/index',
      })
    }).catch((err) => {
      return app.Tips({ title: err, icon: 'none' });

    });
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})
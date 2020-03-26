// pages/userlogin/index.js
const app = getApp();
import { CACHE_USERINFO, CACHE_TOKEN, CACHE_EXPIRES_TIME } from '../../config.js';
import { account_login } from '../../api/user.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    account:'',
    password:'',
    errorSum: 0,
    errorNum: 3
  },

/**
 * 获取账号
 */
  get_account(event){
    this.setData({
      account: event.detail.value
    })
  },
  /**
 * 获取密码
 */
  get_pwd(event) {
    this.setData({
      password: event.detail.value
    })
  },

  /**
   * 会员登录
   */
  userlogin(){
      let account = this.data.account;
      let password = this.data.password;
      if(account == ''){
        wx.showToast({
          icon: 'none',
          title: '账号不能为空',
        })
      }
    if (password == ''){
        wx.showToast({
          icon: 'none',
          title: '密码不能为空',
        })
      }
    let that = this;
    wx.showLoading({ title: '正在登录中' });
    account_login({account:account,password:password}).then(res=>{
      
      app.globalData.token = res.data.token;
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.isLog = true;
      app.globalData.expiresTime = res.data.expires_time;
      
      wx.setStorageSync(CACHE_TOKEN, res.data.token);
      wx.setStorageSync(CACHE_EXPIRES_TIME, res.data.expires_time);
      wx.setStorageSync(CACHE_USERINFO, JSON.stringify(res.data.userinfo));
      wx.hideLoading();
  
      app.Tips({ title: res.msg, icon: 'success' }, { tab: 1, url: '/pages/index/index' });

     
    }).catch((err) => { 
    
      wx.hideLoading();
      return app.Tips({ title: err, icon: 'none' });
     
    });
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onShow:function(){
    // let newTime = Math.round(new Date() / 1000); 
    // if (wx.getStorageSync(CACHE_USERINFO) && wx.getStorageSync(CACHE_EXPIRES_TIME) > newTime) {
    //   wx.switchTab({
    //     url: '/pages/index/index',
    //   })
    // } 
  }
})
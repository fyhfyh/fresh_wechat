const app = getApp();

import { getMenuList, getUserInfo} from '../../api/user.js';
import { switchH5Login } from '../../api/api.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '个人中心',
      'color': true,
      'class': '0'
    },
    userInfo:{},
    MyMenus:[],
    isGoIndex:false,
    iShidden:true,
    isAuto:false,
    switchActive:false,
    loginType: app.globalData.loginType,
    orderStatusNum:{},
  },

  close:function(){
    this.setData({ switchActive:false});
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    this.getUserInfo();
    this.getMyMenus();
  },
  Setting: function () {
    wx.openSetting({
      success: function (res) {
        console.log(res.authSetting)
      }
    });
  }, 
  /**
   * 
   * 获取个人中心图标
  */
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res=>{
      if (res.data.code == '410000' || res.data.code == '410001' || res.data.code == '410002') {
        wx.redirectTo({
          url: '/pages/user_login/index',
        }) 
    }
      that.setData({ MyMenus: res.data.routine_my_menus });
    });
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      if (res.data.code == '410000' || res.data.code == '410001' || res.data.code == '410002'){
        wx.redirectTo({
          url: '/pages/user_login/index',
        })
      }
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum});
    });
  },
  /**
   * 页面跳转
  */
  goPages:function(e){
    if(app.globalData.isLog){
      console.log(app.globalData.isLog);
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/index' && this.data.userInfo.statu==1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({ title: '您还没有推广权限！！' });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({ switchActive:true});
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else{
      this.setData({ iShidden:false});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ MyMenus:app.globalData.MyMenus});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  onShow:function(){
    
    app.checkLogin_status();
    let that = this;
    this.getUserInfo();
    this.getMyMenus();
    
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
})
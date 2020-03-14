import util from './util.js';
import { logout } from './../api/api.js';
import { HTTP_REQUEST_URL, CACHE_USERINFO, CACHE_TOKEN, CACHE_EXPIRES_TIME } from '../config.js';
import { account_login } from './../api/user.js';
export default function authLogin(login_type){
  return new Promise((reslove, reject) => {
    let userInfo = wx.getStorageSync(CACHE_USERINFO);
    
    account_login(userInfo).then(res => {
      console.log(res)
        getApp().globalData.token = res.data.token;
        getApp().globalData.userInfo = res.data.userInfo;
        getApp().globalData.isLog = true;
        getApp().globalData.expiresTime = res.data.expires_time;
       // if (res.data.cache_key) wx.setStorage({ key: 'cache_key', data: res.data.cache_key });
        reslove();
      }).catch(err=>{
        reject();
      });
   
  })
}
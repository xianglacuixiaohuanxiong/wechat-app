/**
 * 大转盘抽奖
 */

var util = require("../../utils/util.js");
var app = getApp();

Page({

  //奖品配置
  awardsConfig: {
    chance: true,
    awards: [
      { 'index': 0, 'name': '1元红包', url: './1.png' },
      { 'index': 1, 'name': '5元话费', url: './2.png' },
      { 'index': 2, 'name': '6元红包', url: './3.png' },
      { 'index': 3, 'name': '8元红包', url: './4.png' },
      { 'index': 4, 'name': '10元话费', url: './5.png' },
      { 'index': 5, 'name': '10元红包', url: './6.png' },
      { 'index': 6, 'name': '20元话费', url: './7.png' }
    ]
  },

  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
  },

  onReady: function (e) {
    this.drawAwardRoundel();

    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  //画抽奖圆盘
  drawAwardRoundel: function () {
    let awards = this.awardsConfig.awards;  //  获取奖项列表
    let awardsList = [];
    let turnNum = 1 / awards.length;  // 文字旋转 turn 值

    // 奖项列表
    for (let i = 0; i < awards.length; i++) {
      awardsList.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awards[i].name });
    }

    this.setData({
      btnDisabled: this.awardsConfig.chance ? '' : 'disabled',
      awardsList: awardsList
    });
  },

  //发起抽奖
  playReward: function () {
    //中奖index
    let awardIndex = Math.floor(Math.random() * 6);
    // var awardIndex = 6;
    var runNum = 8;//旋转8周
    var duration = 4000;//时长

    // 旋转角度
    this.runDeg = this.runDeg || 0;
    this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / this.awardsConfig.awards.length))
    //创建动画
    var animationRun = wx.createAnimation({
      duration: duration,
      timingFunction: 'ease'
    })
    animationRun.rotate(this.runDeg).step();
    this.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    });

    // 中奖提示
    var awardsConfig = this.awardsConfig;
    setTimeout(function () {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      });
      this.setData({
        btnDisabled: ''
      });
    }.bind(this), duration);

  },

  onShareAppMessage: function () {
    var that = this;
    // return util.doShare("大转盘抽奖", "pages/zp/zp",that);
  }

})
import { showLoading, showModal } from '../../utils/auth'
Component({
  data: {
    objList: [
      { name: '奖品一', prob: 1 },
      { name: '奖品二', prob: 2 },
      { name: '奖品三', prob: 3 },
      { name: '奖品四', prob: 4 },
      { name: '奖品五', prob: 5 },
      { name: '奖品六', prob: 6 },
      { name: '谢谢惠顾', prob: 7 },
    ],
  },
  methods: {
    //  随机抽奖
    randomLottery () {
      showLoading('正在启动转盘');
      const that = this;
      wx.hideLoading();
      // let resData = res.data.data;
      let awardIndex = Math.floor(Math.random() * 7); //  奖品索引
      let shopLength = that.data.objList.length; //  奖品数量
      let runNum = 8; //  旋转圈数
      let duration = 4000;  //  旋转时长
      that.runDeg = that.runDeg || 0; //  声明全局变量
      that.runDeg = that.runDeg + (360 - that.runDeg % 360) + (360 * runNum - (awardIndex * (360 / shopLength) - 360 / shopLength / 2));
      //  创建动画
      let animationRun = wx.createAnimation({
        duration,
        timingFunction: 'ease'
      });
      animationRun.rotate(that.runDeg).step();
      that.setData({
        animationData: animationRun.export(),
        btnDisabled: 'disabled'
      });
      setTimeout(function () {
        //  prize
        let prize = that.pizeInfo(that.data.objList, awardIndex)
        showModal('中奖了', `恭喜获得${prize.name}`);
      }.bind(that), duration);
    },
    pizeInfo (arr, index) {
      for (let i of arr) {
        if (i.prob === index) {
          return i
        }
      }
    }
  }
})
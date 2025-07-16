Page({
  data: {
    showButtons: false
  },

  onLoad() {

    setTimeout(() => {
      this.setData({ showButtons: true });
    }, 100);
  },

  goToPage2() {
    wx.navigateTo({ url: '/pages/page2/page2' });
  },

  goToPage4() {
    wx.navigateTo({ url: '/pages/page4/page4' });
  }
});

Page({
  data: {
    showButtons: false
  },
  onLoad() {
    setTimeout(() => {
      this.setData({ showButtons: true });
    }, 100);
  },
//When the page loads, wait 100 milliseconds before showing the button
  goToPage2() {
    wx.navigateTo({ url: '/pages/page2/page2' });
  },

  goToPage4() {
    wx.navigateTo({ url: '/pages/page4/page4' });
  }
});
// This page sets a custom navigation bar
// See page.json for configuration


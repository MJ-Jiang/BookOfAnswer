// app.js
App({
  onLaunch() {
    wx.loadFontFace({
      family: 'UranusPixel', // 自定义字体名
      source: 'url("https://ycybook.oss-cn-shanghai.aliyuncs.com/public/fonts/Uranus_Pixel_11Px.ttf")',
      global: true,
      success(res) {
        console.log('字体加载成功：', res.status);
      },
      fail(res) {
        console.error('字体加载失败：', res.status);
      }
    });
  }
});

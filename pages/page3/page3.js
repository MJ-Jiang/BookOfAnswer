// 引入数据模块（必须是 .js 文件）
const data = require('../../assets/dialogue-data.js');

Page({
  data: {
    content: '',
    source: '',
    audioId: '',
    showAudio: false,
    showButtons: false,
    previousIndex: -1
  },

  onLoad() {
    this.pickRandomDialogue();

    // 延迟显示按钮，增强视觉节奏
    setTimeout(() => {
      this.setData({ showButtons: true });
    }, 300);
  },

  pickRandomDialogue() {
    const dialogues = data.dialogues;
    const total = dialogues.length;
    let index;

    do {
      index = Math.floor(Math.random() * total);
    } while (index === this.data.previousIndex);

    const item = dialogues[index];
    const hasAudio = Number(item.id) < 67 || Number(item.id) > 72;

    this.setData({
      content: item.content,
      source: item.source,
      audioId: item.id,
      showAudio: hasAudio,
      previousIndex: index
    });
  },

  refresh() {
    wx.navigateBack({
      url: '/pages/page2/page2'
    });
  },

  goHome() {
    wx.navigateTo({ url: '/pages/page1/page1' });
  }
});

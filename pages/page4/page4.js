
const data = require('../../assets/dialogue-data.js');

Page({
  data: {
    input: '',
    messages: [
      { from: 'system', text: '我在。' }
    ],
    scrollTo: ''
  },
  onLoad() {
    this.scrollToBottom();
  },

  onInput(e) {
    this.setData({ input: e.detail.value });
  },

  onSend() {
    const trimmed = this.data.input.trim();
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed };
    const index = Math.floor(Math.random() * data.dialogues.length);
    const dialogue = data.dialogues[index];

    const systemMsg = {
      from: 'system',
      text: dialogue.content,
      source: dialogue.source,
      audio: (Number(dialogue.id) >= 67 && Number(dialogue.id) <= 72) ? null : dialogue.id
    };

    const newMessages = [...this.data.messages, userMsg, systemMsg];

    this.setData({
      input: '',
      messages: newMessages,
      scrollTo: 'bottom-anchor'
    }, () => {
      
      setTimeout(() => this.scrollToBottom(), 50);
      setTimeout(() => this.scrollToBottom(), 500);
    });
  },

  scrollToBottom() {
    this.setData({ scrollTo: 'bottom-anchor' });
  },

  goBack() {
    wx.navigateBack();
  }
});

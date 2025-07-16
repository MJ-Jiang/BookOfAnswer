Component({
  properties: {
    src: {
      type: String,
      required: true
    }
  },
  data: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    currentFormatted: '0:00',
    durationFormatted: '0:00'
  },
  lifetimes: {
    attached() {
      this.audio = wx.createInnerAudioContext();
      this.audio.src = this.properties.src;
      this.audio.obeyMuteSwitch = false;

      this.audio.onCanplay(() => {
        setTimeout(() => {
          const dur = this.audio.duration;
          this.setData({
            duration: dur,
            durationFormatted: this.formatTime(dur)
          });
        }, 200);
      });

      this.audio.onTimeUpdate(() => {
        const cur = this.audio.currentTime;
        this.setData({
          currentTime: cur,
          currentFormatted: this.formatTime(cur)
        });
      });

      this.audio.onPlay(() => {
        this.setData({ isPlaying: true });
      });

      this.audio.onPause(() => {
        this.setData({ isPlaying: false });
      });

      this.audio.onEnded(() => {
        this.setData({
          isPlaying: false,
          currentTime: 0,
          currentFormatted: '0:00'
        });
      });
    },
    detached() {
      this.audio.destroy();
    }
  },
  methods: {
    togglePlay() {
      if (this.data.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },
    onSeek(e) {
      const value = e.detail.value;
      this.audio.seek(value);
      this.setData({
        currentTime: value,
        currentFormatted: this.formatTime(value)
      });
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s < 10 ? '0' + s : s}`;
    }
  }
});

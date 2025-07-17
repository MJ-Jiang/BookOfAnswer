Component({
  properties: {
    src: {
      type: String,
      required: true
    },
    estimatedDuration: {
      type: Number,
      value: 5 // ✅ 默认初始 duration，防止 slider 先中间跳
    }
  },
  data: {
    isPlaying: false,
    isSeeking: false,
    currentTime: 0,
    duration: 0,
    currentFormatted: '0:00',
    durationFormatted: '0:00'
  },
  lifetimes: {
    attached() {
      // ✅ 提前设置估算的 duration，防止 slider 显示在中间
      this.setData({
        currentTime: 0,
        currentFormatted: '0:00',
        duration: this.properties.estimatedDuration,
        durationFormatted: this.formatTime(this.properties.estimatedDuration)
      });

      const audio = wx.createInnerAudioContext();
      this.audio = audio;
      audio.src = this.properties.src;
      audio.obeyMuteSwitch = false;

      audio.onCanplay(() => {
        // ✅ 必须触发一次 play 才能拿到真实 duration
        audio.play();
        audio.pause();

        setTimeout(() => {
          const dur = audio.duration;
          if (dur && dur > 0) {
            this.setData({
              duration: dur,
              durationFormatted: this.formatTime(dur)
            });
          }
        }, 300);
      });

      audio.onTimeUpdate(() => {
        const cur = audio.currentTime;

        if (!this.data.isSeeking) {
          this.setData({
            currentTime: cur,
            currentFormatted: this.formatTime(cur)
          });
        }

        const dur = audio.duration;
        if (dur && dur > 0 && dur !== this.data.duration) {
          this.setData({
            duration: dur,
            durationFormatted: this.formatTime(dur)
          });
        }
      });

      audio.onPlay(() => this.setData({ isPlaying: true }));
      audio.onPause(() => this.setData({ isPlaying: false }));
      audio.onEnded(() => {
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
    onSliderChanging(e) {
      this.setData({
        isSeeking: true,
        currentTime: e.detail.value,
        currentFormatted: this.formatTime(e.detail.value)
      });
    },
    onSeek(e) {
      const value = e.detail.value;
      this.audio.seek(value);
      this.setData({
        isSeeking: false,
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

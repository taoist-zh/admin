Component({
  externalClasses: ['wr-class'],

  options: {
    multipleSlots: true,
  },

  properties: {

  },

  data: {

  },

  methods: {
    open() {
      this.triggerEvent('showFilterPopup', {
        show: true,
      });
    },
  },
});
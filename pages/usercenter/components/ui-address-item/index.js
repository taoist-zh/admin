Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },
  properties: {
    address: {
      type: Object,
      value: {},
    },
    customIcon: {
      type: String,
      value: 'edit-1',
    },
    isDrawLine: {
      type: Boolean,
      value: true,
    },
  },
  externalClasses: [
    'item-wrapper-class',
    'title-class',
    'default-tag-class',
    'normal-tag-class',
    'address-info-class',
    'delete-class',
  ],
  methods: {
    onDelete(e) {
      const {
        item
      } = e.currentTarget.dataset;
      this.triggerEvent('onDelete', item);
    },
    onEdit(e) {
      const {
        item
      } = e.currentTarget.dataset;
      this.triggerEvent('onEdit', item);
    },
  },
});
import riot from 'riot'
import config from '../config'

riot.mixin('rf-input-helpers', {
  init: function () {
    this.currentValue = this.opts.model.value
  },
  getID: function () {
    return this.opts.inputId ||
      config.makeID(this.opts.model.name, this.getFormName())
  },
  getName: function () {
    return this.opts.inputName ||
      config.makeName(this.opts.model.name, this.getFormName())
  },
  getLabel: function () {
    return this.opts.inputLabel ||
      config.formatLabel(this.opts.model.name, this.getFormName())
  },
  getPlaceholder: function () {
    return this.opts.inputPlaceholder ||
      config.formatPlaceholder(this.opts.model.name, this.getFormName())
  },
  formatErrors: function (errors) {
    return config.formatErrors(errors, this.opts.model.name, this.getFormName())
  },
  getLabelClassName: function () {
    return this.opts.labelClassName || config.labelClassName
  },
  getGroupClassName: function () {
    return this.opts.groupClassName || config.groupClassName
  },
  getErrorClassName: function () {
    return this.opts.errorClassName || config.errorClassName
  },
  getInputContainerClassName: function () {
    return this.opts.inputContainerClassName || config.inputContainerClassName
  },
  assignValue: function (value) {
    this.opts.model.setValue(value)
  },
  getFormName: function () {
    return this.opts.formName || this.opts.model.formName
  },
  valueIs: function (value) {
    return this.opts.model.value === value
  },
  handleChange: function (e) {
    this.assignValue(e.target.value)
  },
  initializeValue: function () {
    this.on('mount', () => {
      const input = this[this.getName()]
      if (input) {
        input.value = this.opts.model.value || ''
      }
      this.opts.model.on('change:update', () => {
        input.value = this.opts.model.value || ''
      })
    })
  }
})

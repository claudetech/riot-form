import assert       from 'assert'
import riot         from 'riot'
import assign       from 'object-assign'
import globalConfig from '../config'

export default class BaseInput {
  constructor(config = {}) {
    riot.observable(this)
    assert(config.name, 'An input must have a name')
    this.config = config
    this.setValue(config.value || this.defaultValue, {silent: true})
    if (config.formName) {
      this.formName = config.formName
    }
  }

  get name() {
    return this.config.name
  }

  get tag() {
    return this.config.tag || this.constructor.defaultTag
  }

  get rawValue() {
    return this._rawValue
  }

  set value(value) {
    this.setValue(value)
  }

  setValue(rawValue, options = {}) {
    const value = this.process(rawValue)
    if (value === this._value) {
      return
    }
    this._rawValue = rawValue
    this._value = value
    this.validate()
    if (!options.silent) {
      this.trigger('change', value)
    }
    if (options.update) {
      this.trigger('change:update', value)
    }
  }

  set formName(name) {
    assert(name, 'the form name cannot be empty')
    this._formName = name
  }

  get formName() {
    return this._formName
  }

  get value() {
    return this._value
  }

  get valid() {
    this.validate()
    return !this.errors
  }

  get type() {
    return this.config.type || this.constructor.type
  }

  get defaultValue() {
    return undefined
  }

  // TODO: pre pack some validators to avoid having to pass a callback
  validate() {
    if (this.config.validate) {
      this.errors = this.config.validate(this._value)
    }
  }

  get formattedErrors() {
    if (this.config.formatErrors) {
      return this.config.formatErrors(this.errors)
    }
    return this.defaultFormatErrors(this.errors)
  }

  // TODO: pre pack some processors to avoid having to pass a callback
  get process() {
    return this.config.process || this.defaultProcess
  }

  get defaultProcess() {
    return globalConfig.processValue
  }

  get defaultFormatErrors() {
    return globalConfig.formatErrors
  }
}

BaseInput.extend = function (props) {
  class Input extends BaseInput {}
  assign(Input.prototype, props)
  return Input
}

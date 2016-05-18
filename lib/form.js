import riot   from 'riot'
import assert from 'assert'
import assign from 'object-assign'

export default class Form {
  constructor(config = {}) {
    assert(config.name, 'A form must have a name')
    riot.observable(this)
    this._config = config
    this._inputs = config.inputs || {}
    this._forms = config.forms || {}
    this.model = config.model || {}
    this.name = config.name
    this._errors = {}
  }

  get name() {
    const nameList = this._name.split('.')
    return nameList[nameList.length - 1]
  }

  get fullName() {
    return this._name
  }

  get config() {
    return this._config
  }

  get model() {
    return this._model
  }

  get inputs() {
    return this._inputs
  }

  filterInputs(inputs, p) {
    const filtered = {}
    for (const name in inputs) {
      if (p(inputs[name])) {
        filtered[name] = inputs[name]
      }
    }
    return filtered
  }

  get visibleInputs() {
    return this.filterInputs(this.inputs, (input) => input.type !== 'hidden')
  }

  get hiddenInputs() {
    return this.filterInputs(this.inputs, (input) => input.type === 'hidden')
  }

  get forms() {
    return this._forms
  }

  get errors() {
    return this._errors
  }

  set model(model) {
    if (this.config.noClone) {
      this._model = model
    } else {
      this._model = assign({}, model)
    }
    this._setInputValues()
    this._setFormValues()
  }

  set name(name) {
    this._name = name
    for (name of Object.keys(this.inputs)) {
      const input = this.inputs[name]
      input.formName = this.fullName
    }
  }

  get valid() {
    let valid = true
    for (const name of Object.keys(this.inputs)) {
      const input = this.inputs[name]
      input.validate()
      this.errors[name] = input.errors
      if (input.errors) {
        valid = false
      }
    }
    return valid
  }

  get inputsCount() {
    return Object.keys(this.inputs).length
  }

  _setInputValues() {
    for (const name of Object.keys(this.inputs)) {
      const input = this.inputs[name]
      input.off('change')
      input.setValue(this.model[input.name], {update: true, silent: true})
      input.on('change', this._makeChangeHandler(input))
    }
  }

  _setFormValues() {
    for (const name of Object.keys(this.forms)) {
      const form = this.forms[name]
      form.off('change')
      form.model = this.model[form.name]
      form.on('change', this._makeFormChangeHandler(form))
    }
  }

  _makeChangeHandler(input) {
    return (value) => {
      this.model[input.name] = value
      this.errors[input.name] = input.errors
      this.trigger('change', input.name, value)
    }
  }

  _makeFormChangeHandler(form) {
    return (inputName, value) => {
      this.model[form.name] = form.model
      this.errors[form.name] = form.errors
      this.trigger('change', form.name + '.' + inputName, form.model)
    }
  }

  eachInput(f) {
    for (const name of Object.keys(this.inputs)) {
      f(this.inputs[name], name)
    }
  }
}

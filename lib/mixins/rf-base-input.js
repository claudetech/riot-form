import riot from 'riot'
import config from '../config'

riot.mixin('rf-base-input', {
  init: function () {
    let tag = null
    let currentValue = null

    const makeData = () => {
      return { model: this.opts.model, formName: this.opts.formName }
    }

    this.on('mount', () => {
      const input = this.root.querySelector('[rf-input-elem]')
      if (!input) {
        throw new Error('element with attribute rf-input-elem not found in rf-input html')
      }
      tag = riot.mount(input, this.opts.model.tag, makeData())[0]
    })

    this.on('update', () => {
      if (tag && this.opts.model.value !== currentValue) {
        currentValue = this.opts.model.value
        tag.update(makeData())
      }
    })
  }
})

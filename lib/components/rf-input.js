import riot from 'riot'

import html from './rf-input.html'

riot.tag('rf-input', html, function (opts) {
  this.mixin('rf-input-helpers', 'rf-base-input')
})

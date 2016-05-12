import {expect}       from 'chai'
import {inputFactory} from 'riot-form'

describe('inputs', () => {
  const inputTypes = [
    'text',
    'password',
    'email',
    'tel',
    'number',
    'url',
    'date',
    'textarea'
  ]

  it('should contain all inputs', () => {
    for (const inputType of inputTypes) {
      expect(() => inputFactory.create({name: 'hello', type: inputType})).not.to.throw(Error)
    }
  })
})

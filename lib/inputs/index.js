import BaseInput from './base'

class TextInput extends BaseInput {
}
TextInput.defaultTag = 'rf-text-input'
TextInput.type       = 'text'

class EmailInput extends BaseInput {
}
EmailInput.defaultTag = 'rf-text-input'
EmailInput.type       = 'email'

class PasswordInput extends BaseInput {
}
PasswordInput.defaultTag = 'rf-text-input'
PasswordInput.type       = 'password'

class NumberInput extends BaseInput {
}
NumberInput.defaultTag = 'rf-text-input'
NumberInput.type       = 'number'

class URLInput extends BaseInput {
}
URLInput.defaultTag = 'rf-text-input'
URLInput.type       = 'url'

class TelInput extends BaseInput {
}
TelInput.defaultTag = 'rf-text-input'
TelInput.type       = 'tel'


class DateInput extends BaseInput {
}
DateInput.defaultTag = 'rf-text-input'
DateInput.type       = 'date'

class TextareaInput extends BaseInput {
}
TextareaInput.defaultTag = 'rf-textarea-input'
TextareaInput.type       = 'textarea'


export default {
  TextInput     : TextInput,
  EmailInput    : EmailInput,
  PasswordInput : PasswordInput,
  NumberInput   : NumberInput,
  URLInput      : URLInput,
  TelInput      : TelInput,
  DateInput     : DateInput,
  TextareaInput : TextareaInput
}

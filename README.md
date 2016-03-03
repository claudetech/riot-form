# riot-form

Easy forms for [riotjs](http://riotjs.com/).

A set of classes and tags to generate and handle forms.

## Installation

You can either include the files in [dist](./dist) or require.

### With npm

```
npm install riot-form --save
```

### With bower

```
bower install riot-form --save
```

## Usage

### Example

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <title>simple.html</title>

  </head>
  <body>

    <app></app>

    <script type="riot/tag">
      <app>
        <rf-form model="{ form }" class-name="custom-class">
          <input type="submit" value="Save">
        </rf-form>

        <div class="output">
          Username: <span class="username">{ form.model.username }</span>
          Profile: <span class="profile">{ form.model.profile }</span>
        </div>

        this.form = new riotForm.Form.Builder()
                                .setName('simple')
                                .addInput({name: 'username', type: 'text'})
                                .addInput({name: 'profile', type: 'textarea'})
                                .setModel({username: 'Daniel', profile: 'My name is Daniel'})
                                .build();

        this.form.on('change', () => this.update())
      </app>
    </script>

    <script src="./components/riot/riot+compiler.js"></script>
    <script src="./js/riot-form.js"></script>

    <script>
      riot.mount('app')
    </script>
  </body>
</html>
```

the `form.model` property will always be synchronized with the content of the form.

## API

### `riotForm.Form`

#### `Form.prototype`

  * `name`: Returns the name of the form, included in the config
  * `inputs`: Returns all the inputs of the form
  * `model`: Returns the model of the form
  * `errors`: Returns an object with the errors of the form
  * `valid`: Returns a boolean with `true` if the form is valid and `false` otherwise
  * `getInput(name)`: Retrieves a form input by name

#### `Form.Builder`

  * `setName`: Set the name of the form. Must be called or an error will be thrown on build
  * `addInput`: Add an input to the form. It can be any object with a `name` and a `type` properties
                You can pass a `tag` as an option to change the tag that will be rendered for this input
  * `setModel`: Set the form model. form values will be populated with it
  * `build`: Construct the form and returns a `Form` instance.

By default, the model will be cloned when building the form, to avoid overriding existing values.
If you want the values model of the you pass to be changed, pass `{noClone: true}` to the `build`
method.


## How to

### Registering new inputs

You will probably want to create new inputs to fit your needs.

You can easily do so by creating a subclass of `riotForm.BaseInput` and registering it as follow.

With ES5

```javascript
var riotForm = require('riot-form')

// ES5
var MyInput = riotForm.BaseInput.extend({
  myFunc: function () {
    return 'whatever you want'
  }
})

MyInput.type       = 'my-type'
MyInput.defaultTag = 'my-tag'

riotForm.inputFactory.register(MyInput)
```

or with ES5

```javascript
// ES6
import {BaseInput, inputFactory} from 'riot-form'
class MyInput extends BaseInput {
  myFunc() {
    return 'whatever you want'
  }
}

MyInput.type       = 'my-type'
MyInput.defaultTag = 'my-tag'

inputFactory.register(MyInput)
```

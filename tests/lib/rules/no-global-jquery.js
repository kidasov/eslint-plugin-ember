'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-global-jquery');
const RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module',
};
const MESSAGE = rule.meta.message;

ruleTester.run('no-global-jquery', rule, {
  valid: [
    {
      code: `
        import $ from 'jquery';

        export default Ember.Component.extend({
          init() {
            this.el = $('.test');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import $ from 'jquery';

        const foo = $;

        export default Ember.Component.extend({
          init() {
            this.el = foo('.gangnam-style');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';
        import Foo from 'bar';

        export default Ember.Component.extend({
          init() {
            this.el = Ember.$('.lololol');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $, Component } = Ember;
        const { eq } = Ember.computed;

        export default Component.extend({
          init() {
            this.el = $('.baba-booey');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';
        import Foo from 'bar';

        const { $ } = Ember;
        const { foo } = Foo;

        export default Ember.Component.extend({
          init() {
            this.el = $('.to-foo-or-not-to-foo');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';
        import Foo from 'bar';

        const { $ } = Ember;
        const { baz } = Foo.bar;

        export default Ember.Component.extend({
          init() {
            this.el = $('.homie-dont-play-that');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;
        const wut = 'lolerskates';

        export default Ember.Controller.extend({
          init() {
            this.el = $('.whyowhyowhy');
          }
        });
      `,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        let something;

        export default Ember.Component({
          actions: {
            valid() {
              something = Ember.$('.invalid1');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const Em = Ember;

        export default Ember.Component({
          actions: {
            valid() {
              this.inv1 = Em.$('.invalid1');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          valid1() {
            this.v1 = Ember.$('.v1');
          },
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          valid2() {
            this.v2 = this.$();
          },
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid3() {
              this.v3 = Ember.$('v3');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            valid4() {
              this.v4 = this.$('v4');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;

        export default Ember.Component({
          init() {
            this.el = $('.test');
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $ } = Ember;

        export default Ember.Component({
          actions: {
            valid() {
              this.inv1 = $('.invalid1');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $: foo } = Ember;

        export default Ember.Component({
          init() {
            this.el = foo('.test');
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const { $: foo } = Ember;

        export default Ember.Component({
          actions: {
            valid() {
              this.inv1 = foo('.invalid1');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const $ = Ember.$;

        export default Ember.Component({
          actions: {
            valid() {
              this.valid = $('.valid');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import Ember from 'ember';

        const foo = Ember.$;

        export default Ember.Component({
          actions: {
            valid() {
              this.valid = foo('.valid');
            }
          }
        });`,
      parserOptions
    },
    {
      code: `
        import $ from 'jquery';
        import Ember from 'ember';

        export default Ember.Component({
          actions: {
            valid() {
              this.valid = $('.valid');
            }
          }
        });`,
      parserOptions
    },
  ],
  invalid: [
    {
      code: `
        export default Ember.Component({
          init() {
            this.el = $('.test');
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            invalid1() {
              this.inv1 = $('.invalid1');
            }
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          init() {
            this.el = jQuery('.test');
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        export default Ember.Component({
          actions: {
            invalid1() {
              this.inv1 = jQuery('.invalid1');
            }
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const foo = Ember.$;

        export default Ember.Component({
          actions: {
            invalid1() {
              this.inv1 = $('.invalid1');
            }
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    },
    {
      code: `
        import Ember from 'ember';

        const foo = Ember.$;

        export default Ember.Component({
          actions: {
            invalid1() {
              this.inv1 = jQuery('.invalid1');
            }
          }
        });`,
      parserOptions,
      output: null,
      errors: [{
        message: MESSAGE
      }]
    }
  ]
});

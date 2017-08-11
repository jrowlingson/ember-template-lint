'use strict';

const generateRuleTests = require('../../helpers/rule-test-harness');

generateRuleTests({
  name: 'event-handler-casing',

  config: true,

  good: [
    '{{my-component onClick=(action fooAction)}}',
    '{{my-component onKeyDown=(action fooAction)}}',
    {
      config: 'lowercase',
      template: '{{my-component onclick=(action fooAction)}}',
    }
  ],

  bad: [
    {
      template: '{{my-component onclick=(action fooAction)}}',
      result: {
        rule: 'event-handler-casing',
        message: 'Event handlers must be camelCased',
        moduleId: 'layout.hbs',
        source: '{{my-component onclick=(action fooAction)}}',
        line: 1,
        column: 15
      }
    },
    {
      template: '{{my-component onkeydown=(action fooAction)}}',
      result: {
        rule: 'event-handler-casing',
        message: 'Event handlers must be camelCased',
        moduleId: 'layout.hbs',
        source: '{{my-component onkeydown=(action fooAction)}}',
        line: 1,
        column: 15
      }
    },
    {
      config: 'lowercase',
      template: '{{my-component onClick=(action fooAction)}}',
      result: {
        rule: 'event-handler-casing',
        message: 'Event handlers must be lowercased',
        moduleId: 'layout.hbs',
        source: '{{my-component onClick=(action fooAction)}}',
        line: 1,
        column: 15
      }
    }
  ]
});

'use strict';

const Rule = require('./base');

/**
 Require camelCased event handler names within components.

 Good:

 ```
 '{{my-component onClick=(action fooAction)}}',
 ```

 Bad:

 ```
 '{{my-component onclick=(action fooAction)}}',
 ```
 */

const DEFAULT_CONFIG = {
  regexp: /^on[a-z]/,
  message:  'Event handlers must be camelCased'
};

const LOWERCASE_CONFIG = {
  regexp: /^on[A-Z]/,
  message:  'Event handlers must be lowercased'
};

module.exports = class EventHandlerCasing extends Rule {
  parseConfig(config) {
    const configType = typeof config;
    const errorMessage = 'The event-handler-casing rule accepts one of the following values.\n ' +
      '  * boolean - `true` to enable / `false` to disable\n' +
      '  * string -- `lowercase` to require lowercase event handler keys\n' +
      '\nYou specified `' + JSON.stringify(config) + '`';

    switch(configType) {
    case 'boolean':
      return config ? DEFAULT_CONFIG : false;
    case 'string':
      if (config === 'lowercase') {
        return LOWERCASE_CONFIG;
      } else {
        throw new Error(errorMessage);
      }
    case 'undefined':
      return false;
    default:
      throw new Error(errorMessage);
    }
  }

  visitor() {
    return {
      MustacheStatement: function (node) {
        const attributes = (node.hash || {}).pairs || [];
        attributes.forEach(attribute => {
          if (this.config.regexp.test(attribute.key)) {
            this.log({
              message: this.config.message,
              line: attribute.loc && attribute.loc.start.line,
              column: attribute.loc && attribute.loc.start.column,
              source: this.sourceForNode(node)
            });
          }
        });
      }
    };
  }
};

// Defines the AMD module “hello_amd”
// Dependency: jQuery
define(['jquery'], function ($) {
  'use strict';

  var HelloAMD = {
    sayHello: function () {
      // Use jQuery
      $('#output').html('Hello from <code>HelloAMD</code>!');
    }
  };

  return HelloAMD;
});
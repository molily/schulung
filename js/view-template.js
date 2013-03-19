// Configure Underscore’s template() function
// to use curly braces as delimiters.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/* Model class */

var Car = Backbone.Model.extend();

/* View class */

var CarView = Backbone.View.extend({

  template: _.template('Name: {{name}}'),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
  }

});

/* Set up instances */

var car = new Car({
  name: 'DeLorean DMC-12',
  manufactured: 1982
});

var carView = new CarView({
  model: car,
  el: $('#car')
});

/* Initial rendering */

carView.render();

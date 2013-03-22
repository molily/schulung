// Configure Underscore’s template() function
// to use curly braces as delimiters.
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

/* Model class */

var Car = Backbone.Model.extend();

/* View Classes */

var CarView = Backbone.View.extend({

  template: _.template(
    '<p>Name: {{name}}</p><p>Manufactured: {{manufactured}}</p>'
  ),

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
  }

});

/* Set up instances */

var car = new Car({
  name: 'Delorean DMC-12',
  manufactured: 1981
});

var carView = new CarView({
  model: car,
  el: $('#car')
});

/* Initial rendering */

carView.render();

/* Set up event handling */

$('#textfield').on('input', function () {
  var value = $(this).val();
  car.set({ name: value });
});

// Configure Underscore’s template() function
// to use curly braces as delimiters.
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

/*
 * Model and Collection Classes
 * ----------------------------
 */

var Car = Backbone.Model.extend();

var Cars = Backbone.Collection.extend({
  model: Car
});

/*
 * View Classes
 * -------------
 */

var CarsView = Backbone.View.extend({

  template: _.template(
    '<li>{{name}}</li>'
  ),

  initialize: function () {
    this.collection.on('add remove reset', this.render, this);
  },

  render: function () {
    var html = '';
    for (var i = 0, l = this.collection.length; i < l; i++) {
      var attributes = this.collection.at(i).attributes;
      html += this.template(attributes);
    }
    this.$el.html(html);
  }

});

/*
 * Set up instances
 * ----------------
 */

var cars = new Cars([
  { name: 'DeLorean DMC-12', manufactured: 1981 },
  { name: 'Chevrolet Corvette', manufactured: 1953 },
  { name: 'VW Scirocco', manufactured: 1974 }
]);

var carsView = new CarsView({
  collection: cars,
  el: $('#cars')
});
carsView.render();

/*
 * Set up event handling
 * ---------------------
 */

$('#add-car').on('click', function () {
  var name = $("#car-name").val();
  cars.push({ name: name });
});


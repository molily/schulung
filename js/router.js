(function () {
'use strict';

// Configure Underscore’s template() function
// to use curly braces as delimiters.
_.templateSettings = {
  escape: /\{\{(.+?)\}\}/g
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
 * ------------
 */

var CarsView = Backbone.View.extend({

  template: _.template(
    '<li><a href="#cars/{{id}}">{{name}}</a></li>'
  ),

  render: function () {
    var html = '<h1>All Cars</h1><ul>';
    for (var i = 0, l = this.collection.length; i < l; i++) {
      var attributes = this.collection.at(i).attributes;
      html += this.template(attributes);
    }
    html += '</ul>';
    this.$el.html(html);
  }

});

var CarView = Backbone.View.extend({

  template: _.template(
    '<h1>Edit Car</h1>' +
    '<p><label>Name: <input class="name" value="{{name}}"></label>' +
    '<p><label>Manufactured: <input class="manufactured" value="{{manufactured}}"></label>' +
    '<p><a href="#">Back to overview</a></li>'
  ),

  events: {
    'input .name': 'updateModel',
    'input .manufactured': 'updateModel'
  },

  updateModel: function () {
    var name = this.$('.name').val();
    var manufactured = this.$('.manufactured').val();
    this.model.set({
      name: name,
      manufactured: manufactured
    });
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
  }

});

/*
 * Collection instance with example data
 * -------------------------------------
 */

var cars = new Cars([
  { id: 0, name: 'DeLorean DMC-12', manufactured: 1981 },
  { id: 1, name: 'Chevrolet Corvette', manufactured: 1953 },
  { id: 2, name: 'VW Scirocco', manufactured: 1974 },
  { id: 3, name: 'Porsche Panamera', manufactured: 2009 },
  { id: 4, name: 'Maserati GranTurismo', manufactured: 2007 },
  { id: 5, name: 'Aston Martin Virage', manufactured: 1989 }
]);

/*
 * Router class
 * ------------
 */

var CarRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "cars/:id": "show"
  },

  index: function () {
    var carsView = new CarsView({
      collection: cars
    });
    carsView.render();
    $('#content').html(carsView.el);
  },

  show: function (id) {
    var car = cars.get(id);
    var carView = new CarView({
      model: car
    });
    carView.render();
    $('#content').html(carView.el);
  }

});

/*
 * Start Routing
 * -------------
 */

var carRouter = new CarRouter();
Backbone.history.start();

})();
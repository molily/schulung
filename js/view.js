/* Model class */

var Car = Backbone.Model.extend();

/* View class */

var CarView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
   this.$el.html(
     '<p>Name: ' + this.model.get('name') + '</p>' +
     '<p>Hergestellt: ' + this.model.get('manufactured') + '</p>'
     );
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
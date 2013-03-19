// Configure Underscore’s template() function
// to use curly braces as delimiters.
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

/*
 * Model and Collection Classes
 * ----------------------------
 */

var Photos = Backbone.Collection.extend({

  url: 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',

  parse: function (response) {
    return response.items;
  },

  search: function (tags) {
    return this.fetch({
      dataType: 'jsonp',
      data: {
        tags: tags,
        format: 'json'
      }
    });
  }

});

/*
 * View Classes
 * ------------
 */

var PhotosView = Backbone.View.extend({

  template: _.template('<img src="{{media.m}}" alt="">'),

  initialize: function () {
    this.listenTo(this.collection, 'reset', this.render);
  },

  render: function () {
    var html = '';
    for (var i = 0, l = this.collection.length; i < l; i++) {
      var model = this.collection.at(i);
      html += this.template(model.attributes);
    }
    this.$el.html(html);
  }

});

var SearchView = Backbone.View.extend({

  events: {
    'click .submit': 'startSearch'
  },

  startSearch: function () {
    var value = $('.searchterm').val()
    this.collection.search(value);
  }

});

/*
 * Set up instances
 * ----------------
 */

var photos = new Photos();

var searchView = new SearchView({
  collection: photos,
  el: $('#search')
});

var photosView = new PhotosView({
  collection: photos,
  el: $('#results')
});

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

var SearchView = Backbone.View.extend({

  template: _.template(
    '<p id="search">' +
    '<label>Suche: <input type="search" class="searchterm" value="flower"></label>' +
    '<input type="button" class="submit" value="Suchen">' +
    '</p>'
  ),

  events: {
    'click .submit': 'startSearch'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.searchSuccess);
  },

  render: function () {
    // Do not pass the collection
    this.$el.html(this.template());
  },

  startSearch: function () {
    this.$('.submit').prop('disabled', true).val('Suche läuft…');
    var searchTerm = this.$('.searchterm').val();
    this.collection.search(searchTerm);
  },

  searchSuccess: function () {
    this.$('.submit').prop('disabled', false).val('Suchen');
  }

});

// Collection View

var PhotosView = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var $el = this.$el.empty();
    this.collection.each(function (model) {
      var view = new PhotoItemView({ model: model });
      view.render();
      $el.append(view.el);
    });
  }

});

// Item view

var PhotoItemView = Backbone.View.extend({

  tagName: 'li',

  template: _.template(
    '<a href=""><img src="{{media.m}}" alt=""></a>'
  ),

  events: {
    'click': 'showFullPhoto'
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
  },

  showFullPhoto: function (event) {
    event.preventDefault();
    var fullPhotoView = new FullPhotoView({
      model: this.model,
      el: $('#fullPhoto')
    });
    fullPhotoView.render();
  }

});

var FullPhotoView = Backbone.View.extend({

  template: _.template(
    '<h2>{{title}}</h2>' +
    '<p class="photo"><img src="{{media.m}}" alt=""></p>' +
    '<p class="tags">Tags: {{tags}}</p>' +
    '<p class="link"><a href="{{link}}" target="_blank">{{link}}</a></p>'
  ),

  render: function () {
    this.$el.html(this.template(this.model.attributes));
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
searchView.render();

var photosView = new PhotosView({
  collection: photos,
  el: $('#results')
});

})();
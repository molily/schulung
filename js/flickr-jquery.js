jQuery(document).ready(function ($) {

  // Configuration
  var flickrUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

  // The store for the last results
  var searchResults;

  // Setup event handling
  var initialize = function () {
    $('#search-form').submit(search);
    $('#results').on('click', 'img', showFullView);
  };

  // Start the search
  var search = function (event) {
    event.preventDefault();

    var searchField = $('#search-field');
    if (searchField.prop('disabled')) {
      return;
    }

    var term = searchField.val();

    var request = $.ajax({
      url: flickrUrl,
      dataType: 'json',
      data: {
        tags: term,
        tagmode: 'all',
        format: 'json'
      }
    });
    request.then(showResults);

    $('#search-submit')
      .prop('disabled', true)
      .val('Suche läuft…');
  };

  var showResults = function (data) {
    searchResults = data.items;

    $('#search-submit')
      .prop('disabled', false)
      .val('Suchen');

    var results = $('#results');
    var images = [];
    for (var i = 0; i < searchResults.length; i++) {
      var photo = searchResults[i];
      var src = photo.media.m;
      var img = $('<img>')
        .attr('src', src)
        .data('photo', photo);
      images.push(img);
    }
    results.empty().append(images);
  };

  var showFullView = function (event) {
    var photo = $(event.target).data('photo');

    var fullViewHtml = '';

    fullViewHtml += '<h2>' + photo.title + '</h2>' +
      '<p class="photo"><img src="' + photo.media.m + '" alt=""></p>';

    if (photo.tags.length > 0) {
      fullViewHtml += '<p class="tags">Tags: ' + photo.tags + '</p>';
    }

    fullViewHtml += '<p class="link">' +
      '<a href="' + photo.link + '" target="_blank">' +
      photo.link +
      '</a></p>';

    $('#fullview').html(fullViewHtml);
  };

  // Start the engine
  initialize();

});
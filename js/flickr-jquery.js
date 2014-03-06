jQuery(document).ready(function ($) {
  'use strict';

  // Configuration
  var flickrUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

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

    var searchTerm = searchField.val();

    $.ajax({
      url: flickrUrl,
      dataType: 'json',
      data: {
        tags: searchTerm,
        tagmode: 'all',
        format: 'json'
      }
    }).then(showResults);

    $('#search-submit')
      .prop('disabled', true)
      .val('Suche läuft…');
  };

  var showResults = function (data) {
    var searchResults = data.items;

    $('#search-submit')
      .prop('disabled', false)
      .val('Suchen');

    var results = $('#results');
    var elements = [];
    for (var i = 0, l = searchResults.length; i < l; i++) {
      var photo = searchResults[i];
      var src = photo.media.m;
      var li = $('<li>');
      var img = $('<img>')
        .attr('src', src)
        .data('photo', photo);
      li.append(img);
      elements.push(li);
    }
    results.html(elements);
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
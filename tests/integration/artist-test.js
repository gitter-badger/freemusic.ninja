import Ember from 'ember';
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module("Artist recommendation tests", {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, App.destroy);
    Ember.$.mockjax.clear();
  }
});

test("no similar artists", function() {
  expect(1);
  $.mockjax({
    url: 'http://api/artists/',
    contentType: 'application/json',
    responseText: [],
  });
  visit('/artists?name=Unknown').then(function() {
    equal(find('.panel').text().trim(), 'No artist found.', "Empty artist results text not found.");
  });
});

test("similar artists via URL", function() {
  expect(1);
  $.mockjax({
    url: 'http://api/artists/',
    contentType: 'application/json',
    responseText: [{
      id: 1,
      name: "Jonathan Coulton",
      links: [],
    }],
    onAfterComplete: function () {
      equal(find('.panel').text().trim(), 'Jonathan Coulton', "Artist results not found.");
    },
  });
  visit('/artists?name=Weird+Al+Yankovic');
});

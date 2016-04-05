angular.module('app.home', ['ngNewRouter'])
  .controller('HomeController', ['$routeParams', HomeController]);

function HomeController ($routeParams) {
  this.id = $routeParams.id;
}
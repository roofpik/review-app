app.controller('registerCtrl', function($scope, $http){


$scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight ; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  
  function expand() {
    $scope.autoExpand('TextArea');
  }


$scope.signUp = function(){
	$http.post("http://139.162.3.205/api/addUser", userData);
}

});
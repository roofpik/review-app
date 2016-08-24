app.controller('projectCtrl', function($scope, $timeout, $ionicLoading) {
    $ionicLoading.show();
    $scope.list = [];
    var loc = {};
    var snapshot;
    db.ref('/locality/-KPmH9oIem1N1_s4qpCv/').once('value', function(snapshot) {

        for (var key in snapshot.val()) {

            loc = {};
            loc.name = snapshot.val()[key].locationName;
            loc.id = snapshot.val()[key].locationId;
            loc.type = 'location';
            $scope.list.push(loc);
        };

    }).then(function() {

        $timeout(function() {
            db.ref('/projects/-KPmH9oIem1N1_s4qpCv/residential/').once('value', function(projects) {
                for (var key in projects.val()) {

                    loc = {};
                    loc.name = projects.val()[key].projectName;
                    loc.id = projects.val()[key].projectId;
                    loc.type = 'residential';
                    $scope.list.push(loc);
                    $timeout(function() {
                        $scope.newList = angular.copy($scope.list);
                        $ionicLoading.hide();
                    }, 500);
                };

            });


        }, 500);


    });

    $scope.gotoSignup = function(item) {
        if (item.type == 'residential') {
            window.localStorage['selectedProject'] = JSON.stringify(item);
        } else {
            window.localStorage['selectedLocality'] = JSON.stringify(item);
        }
    }

});

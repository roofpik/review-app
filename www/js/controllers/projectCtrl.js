app.controller('projectCtrl', function($scope, $timeout, $ionicLoading, $ionicHistory, $state) {

    $ionicLoading.show();
    $scope.list = [];
    var loc = {};
    var snapshot;
    $ionicHistory.clearHistory();

    db.ref('/locality/-KPmH9oIem1N1_s4qpCv/').once('value', function(snapshot) {

        for (var key in snapshot.val()) {

            loc = {};
            loc.name = snapshot.val()[key].locationName;
            loc.id = snapshot.val()[key].locationId;
            loc.type = 'Locality';
            $scope.list.push(loc);
        };

    }).then(function() {

        $timeout(function() {
            db.ref('/projects/-KPmH9oIem1N1_s4qpCv/residential/').once('value', function(projects) {
                for (var key in projects.val()) {

                    loc = {};
                    //console.log(projects.val());
                    loc.name = projects.val()[key].projectName;
                    loc.id = projects.val()[key].projectId;
                    loc.type = projects.val()[key].projectType;
                    $scope.list.push(loc);
                    $timeout(function() {
                        $scope.newList = angular.copy($scope.list);
                        
                    }, 500);

                     $timeout(function() {
                        $ionicLoading.hide();
                        
                    }, 8000);

                    
                };

            });


        }, 500);


    });

    $scope.goToReview = function(item) {
        //console.log(item);
        if (item.type == 'Locality') {
            window.localStorage['selectedLocality'] = JSON.stringify(item);
            $state.go('locality-review', { localityName: item.name, id: item.id });
            window.localStorage['selectedLocality'] = JSON.stringify(item);
        } else {
            window.localStorage['selectedProject'] = JSON.stringify(item);
            if (item.type = "Ready To Move") {
                $state.go('residential-review', { projectName: item.name, id: item.id });
            } else if (item.type = "Under Construction") {
                $state.go('under-construction-review', { projectName: item.name, id: item.id });
            }
        }
    }

});

 app.controller('checkMobileCtrl', function($scope, $state, $ionicLoading, $ionicPopup) {

     $scope.user = {};
     $scope.user.mobno = null;

     $scope.checkMobile = function() {

         db.ref('verifyMobile/' + $scope.user.mobno).once('value', function(snapshot) {
             $scope.user.mobno = null;
             if (snapshot.val() != null) {
                 if (snapshot.val().verifyFlag == true && snapshot.val().reviews) {
                     $ionicLoading.hide();
                     
                     $ionicPopup.alert({
                         title: 'Mobile Number Exists',
                         template: 'Mobile number you have entered is already registered with us and a review is already written.'
                     });
                 } else if (snapshot.val().verifyFlag == true) {
                     $ionicLoading.hide();
                     $ionicPopup.alert({
                         title: 'Registered and Verified',
                         template: 'Mobile number you have entered is already registered and is already verified!'
                     }).then(function() {
                         $state.go('start');
                     });
                 } else if (snapshot.val().verifyFlag == false) {
                     $ionicLoading.hide();
                     $ionicPopup.alert({
                         title: 'Not Verified',
                         template: 'Mobile number you have entered is already registered with us but not verified, please verify your mobile number'
                     }).then(function() {
                        $state.go('start');
                     });
                 }

             } else {
                 $ionicPopup.alert({
                     title: 'Not Registered',
                     template: 'Mobile number you have entered is not registered'
                 }).then(function() {
                     $state.go('start');
                 });

             }

         });
     };

    $scope.cancel = function(){
        $state.go('start');
     }


    



 });

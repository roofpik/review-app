app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.lists', {
        url: '/lists',
        views: {
            'menuContent': {
                templateUrl: 'templates/lists.html',
                controller: 'ListsCtrl'
            }
        }
    })

    .state('app.ink', {
        url: '/ink',
        views: {
            'menuContent': {
                templateUrl: 'templates/ink.html',
                controller: 'InkCtrl'
            }
        }
    })

    .state('app.motion', {
        url: '/motion',
        views: {
            'menuContent': {
                templateUrl: 'templates/motion.html',
                controller: 'MotionCtrl'
            }
        }
    })

    .state('app.components', {
        url: '/components',
        views: {
            'menuContent': {
                templateUrl: 'templates/components.html',
                controller: 'ComponentsCtrl'
            }
        }
    })

    .state('app.extensions', {
        url: '/extensions',
        views: {
            'menuContent': {
                templateUrl: 'templates/extensions.html',
                controller: 'ExtensionsCtrl'
            }
        }
    })


 

    // .state('app.register', {
    //     url: '/register',
    //     views: {
    //         'menuContent': {
    //             templateUrl: 'templates/register.html',
    //             controller: 'registerCtrl'
    //         }
    //     }
    // })

    .state('register', {
        url: '/register',
        abstract: false,
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    })

    .state('test', {
        url: '/test',
        abstract: false,
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
    });

    // State For Reviews

    $stateProvider.state("residential-review", {
        url: '/residential-review/:projectName/:id',
        templateUrl: 'templates/reviews/residential-review.html',
        controller: 'residentialReviewCtrl'
    })

    $stateProvider.state("under-construction-review", {
        url: '/under-construction-review/:projectName/:id',
        templateUrl: 'templates/reviews/under-construction-review.html',
        controller: 'underConstructionReviewCtrl'
    })

    $stateProvider.state("locality-review", {
        url: '/locality-review/:localityName/:id',
        templateUrl: 'templates/reviews/locality-review.html',
        controller: 'localityReviewCtrl'
    })

    $stateProvider.state('selfie', {
        url: '/selfie/:from/:reviewId/:itemId',
        templateUrl: 'templates/reviews/selfie.html',
        controller: 'SelfieCtrl'
    })

    $stateProvider.state('network', {
        url: '/network',
        templateUrl: 'templates/network.html',
        controller: 'networkCtrl'
    });



    $stateProvider.state('start', {
        url: '/start',
        templateUrl: 'templates/start.html',
        controller: 'appStartCtrl'
    });


    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'templates/projects.html',
        controller: 'projectCtrl'


    })

      $stateProvider.state('checkMobile', {
        url: '/checkMobile',
        templateUrl: 'templates/checkMobile.html',
        controller: 'checkMobileCtrl'


    })


     $stateProvider.state('verifyMobile', {
        url: '/verifyMobile/:verifyId/:mobno',
        templateUrl: 'templates/verifyMobile.html',
        controller: 'verifyMobileCtrl'
    })

     $stateProvider.state('summary', {
        url: '/summary',
        templateUrl: 'templates/summary.html',
        controller: 'summaryCtrl'
     })

     $stateProvider.state('syncNfetch', {
        url: '/syncNfetch',
        templateUrl: 'templates/syncNfetch.html',
        controller: 'syncNfetchCtrl'
     })



    // if none of the above states are matched, use this as the fallback

    $urlRouterProvider.otherwise('/start');

});

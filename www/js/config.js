
app.config(function ($stateProvider, $urlRouterProvider) {
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


    .state('app.start', {
        url: '/start',
        views: {
            'menuContent': {
                templateUrl: 'templates/start.html',
                controller: 'appStartCtrl'
            }
        }
    })

    .state('app.projects', {
        url: '/projects',
        views: {
            'menuContent': {
                templateUrl: 'templates/projects.html',
                controller: 'projectCtrl'
            }
        }
    })

    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'registerCtrl'
            }
        }
    })
    ;

   // State For Reviews

    $stateProvider.state("residential-review", {
        url:'/residential-review/:projectName/:id',
        templateUrl: 'templates/reviews/residential-review.html',
        controller: 'residentialReviewCtrl'
    })

    $stateProvider.state("under-construction-review", {
        url:'/under-construction-review/:projectName/:id',
        templateUrl: 'templates/reviews/under-construction-review.html',
        controller: 'underConstructionReviewCtrl'
    })

    $stateProvider.state("locality-review", {
        url:'/locality-review/:localityName/:id',
        templateUrl: 'templates/reviews/locality-review.html',
        controller: 'localityReviewCtrl'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/start');
});

(function()
{
    var adobeApp = angular.module('adobeApp',['ngMaterial','ui.router','ngSanitize']);
    adobeApp.config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('yellow', {
          'default': '500'
        })
      .dark();
    }).config(function(
    		$stateProvider, 
    		$urlRouterProvider, 
    		$controllerProvider, 
    		$compileProvider, 
    		$filterProvider, 
    		$provide
    		)
    {
    	
    	adobeApp.controllerProvider = $controllerProvider;
    	adobeApp.compileProvider    = $compileProvider;
    	adobeApp.filterProvider     = $filterProvider;
    	adobeApp.provide            = $provide;
         $urlRouterProvider.otherwise("/master");
         $stateProvider.state('master', {
             url: "/master",
             templateUrl: 'html/master.html',
		        controller: 'masterController',
		        resolve:{
		       	      dep1:function($q, $rootScope,$location)
		       	    	  {
		       	    	      var deferred = $q.defer();
		       	    	      var dependencies =
		       	    	      [
                                  'js/controllers/master.js', 
		       	    	      ];
		       	    	      $script(dependencies, function()
		       	    	      {
                                if(localStorage.getItem("data") == null){
                                   $.get('https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/', function(json){ 
                                    localStorage.setItem("data", JSON.stringify(json));
                                    $rootScope.finalData = json;
                                        $rootScope.$apply(function()
                                       {
                                          deferred.resolve();
                                       });
                                    }); 
                                }
                                else{
                                    $rootScope.finalData = JSON.parse(localStorage.getItem("data"));
                                        $rootScope.$apply(function()
                                       {
                                          deferred.resolve();
                                       }); 
                                }
		       	    	      });
		       	    	      return deferred.promise;
		       	    	  }
		       	}
           }).state('reports', {
             url: "/master/:nav",
             templateUrl: 'html/reports.html',
		        controller: 'reportsController',
		        resolve:{
		       	      dep1:function($q, $rootScope)
		       	    	  {
		       	    	      var deferred = $q.defer();
		       	    	      var dependencies =
		       	    	      [
		       	    	         'js/controllers/reports.js',
		       	    	      ];
		       	    	      $script(dependencies, function()
		       	    	      {
                                  $rootScope.finalData = JSON.parse(localStorage.getItem("data"));
		       	    	          $rootScope.$apply(function()
		       	    	          {
		       	    	              deferred.resolve();
		       	    	          });
		       	    	      });
		       	    	      return deferred.promise;
		       	    	  }
		       	}
           })
    });
      
})();

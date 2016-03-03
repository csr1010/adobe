angular.module('adobeApp').controllerProvider.register('reportsController',function($rootScope, $stateParams,$scope,$stateParams,$sce) {
    $scope.getdetailedInformation = function(){
        var posts = $rootScope.finalData.posts;
        for(var i in posts){
            if(posts[i].ID == $stateParams.nav){
                $scope.detailedInformation = posts[i];
                
                 $scope.attachments = Object.keys($scope.detailedInformation.attachments ).map(function(k) { return $scope.detailedInformation.attachments[k] }); 
                
                $scope.categories = Object.keys($scope.detailedInformation.categories ).map(function(k) { return $scope.detailedInformation.categories[k] }); 
                
                
                $scope.tags = Object.keys($scope.detailedInformation.tags ).map(function(k) { return $scope.detailedInformation.tags[k] });
                break;
            }
        }
    };
    $scope.parseHtmltoview = function(html){
        return $sce.trustAsHtml(html);
    };
    (function(){
        $scope.getdetailedInformation();
    })();
});
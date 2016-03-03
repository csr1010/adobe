angular.module('adobeApp').controllerProvider.register('masterController',function($rootScope, $scope,$location,$sce) {
    $scope.userInformation = [];
    $scope.parseHtmltoview = function(html){
        return $sce.trustAsHtml(html);
    };
    $scope.defaultRowCount = 8;
    $scope.addRows=function(){
        $scope.userInformation =  $scope.userInformation.concat($rootScope.finalData.posts.splice(0,$scope.defaultRowCount));
    };
    $scope.fullStory=function(id){
        $location.path("/master/"+id);
    };
    (function(){
         $scope.addRows();
    })();
});
myModule.factory('studentListService',['$http', function($http){
    
    var studentListService = {};
    
    
    
    studentListService.getStudentList = function(){

        return $http.get("students.json");

    };
    
    return studentListService;
    
}]);


myModule.factory('quesionListService',['$http', function($http){
    
    var questionListService = {};
    
    
    
   questionListService.getStudentList = function(){

        return $http.get("questions.json");

    };
    
    return questionListService;
    
}]);



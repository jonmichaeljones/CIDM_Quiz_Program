var myModule = angular.module('QuizProgram', []);

myModule.controller('QuizProgramController',['$scope', 'studentListService', 'questionListService', 'LocalStorageService', function($scope, studentListService, questionListService, LocalStorageService){
    
    var qpc = this;

   
    
    
    //qpc.students = [];
    qpc.students_completed = [];
    
    //qpc.questions = [];
    qpc.questions_completed = [];
    
    qpc.nextQuestion = function(){
        
        if(qpc.questions.length > 0)
        {
            var randomQuestion = Math.floor(Math.random() * qpc.questions.length);
            
            qpc.selected_questions = qpc.questions[randomQuestion];
            
            qpc.questions_completed.push(qpc.selected_questions);
            
            qpc.questions.splice(randomQuestion,1);
            
        }
        else
        {
            qpc.questions = qpc.questions_completed;
            qpc.questions_completed = [];
        }
    }
    
    qpc.nextStudent = function(){
        if(qpc.students.length > 0)
        {
            var randomStudent = Math.floor(Math.random() * qpc.students.length);
            
            qpc.selected_student = qpc.students[randomStudent];
            
            qpc.students_completed.push(qpc.selected_student);
            
            qpc.students.splice(randomStudent, 1);
        }
        else
        {
            qpc.students = qpc.students_completed;
            qpc.students_completed = [];
        }
    }
    
    qpc.getNext = function(){
        qpc.nextQuestion();
        qpc.nextStudent();
        
        
    }
     
    qpc.doCorrect = function(){
        qpc.selected_student.correct++;
        qpc.getNext();
    } 
    
    qpc.doIncorrect = function(){
        qpc.selected_student.incorrect++;
        qpc.getNext();
    }
    
     qpc.getStudents = function(){
        
        studentListService.getStudentList()
        .then(
            function(response){
                qpc.students = response.data;
                qpc.getNext();
            },
            function(response){
                qpc.students = [];
            }
        );
    }
    
    qpc.getStudents();
    
    qpc.getQuestions = function(){
        questionListService.getQuestionList()
        .then(
            function(response){
                qpc.questions = response.data;
                qpc.getNext();
            },
            function(response){
                qpc.questions = [];
            }
            
            
        );
    }
    
    qpc.getQuestions();
        
    }]);
    
    qpc.getData = function(){
        localStorage.getItem();
    }
    
    qpc.setData = function(){
        localStorage.setItem();
    }
    
    myModule.factory('studentListService',['$http', function($http){
    
    var studentListService = {};
    
    
    
    studentListService.getStudentList = function(){

        return $http.get("students.json");

    };
    
    return studentListService;
    
}]);


myModule.factory('questionListService',['$http', function($http){
    
    var questionListService = {};
    
    
    
   questionListService.getQuestionList = function(){

        return $http.get("questions.json");

    };
    
    return questionListService;
    
}]);


myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});
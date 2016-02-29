var myModule = angular.module('QuizProgram', []);

myModule.controller('QuizProgramController',['$scope', function($scope){
    
    var qpc = this;

    
    qpc.students =
    [
        {
            name: "Jon Michael Jones",
            correct: 0,
            incorrect: 0
        },
        {
            name: "Jim Smith",
            correct: 0,
            incorrect: 0
        },
        {
            name: "Mandy Smith",
            correct: 0,
            incorrect: 0
        },
        {
            name: "Jeff Tweedy",
            correct: 0,
            incorrect: 0
        }
   
    ];

    qpc.students_completed = [];
    
    qpc.questions = 
    [
        {
            question: "What angular directive goes in the html tag?",
            answer: "ng-app"
        },
        
        {
            question: "What angular directive goes in the div tag in the body?",
            answer: "ng-controller"
        },
        
        {
            question: "What angular directive goes in the drop dowb list?",
            answer: "ng-model"
        }
    ];

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
    
    qpc.getNext();
        
    }]);
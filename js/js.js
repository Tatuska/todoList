/**
 * Created by siryog on 2017-03-25.
 */
(function () {
    'use strict';

    angular.module('toDoApp', [])
        .controller('toDoController', toDoController);
    toDoController.$inject = ['$scope'];
    function toDoController($scope) {


        $scope.result = localStorage.getItem('taskList');
        if (localStorage.getItem('taskList') !== null)
            $scope.taskList = JSON.parse($scope.result);
        else
            $scope.taskList = [{taskName: "Learn Coding", status: false, editing: false, popoverIsVisible: false}];

        $scope.addTask = function () {

            $scope.taskList.push({taskName: $scope.inputTaskName, status: false});


            $scope.inputTaskName = "";


            localStorage.setItem('taskList', JSON.stringify($scope.taskList));
        };
//    removing task after it is checked


        $scope.remove = function (item) {

//asigning the list to new variable. emptying the tasklist

            if (item.status) {
                var list = $scope.taskList;

                var index = $scope.taskList.indexOf(item);

                $scope.taskList.splice(index, 1);

                localStorage.setItem('taskList', JSON.stringify($scope.taskList));
            }

        };


//edit on doubleclick

        $scope.editItem = function (item) {
            item.editing = true;
        };
        $scope.doneEditing = function (item) {

            item.editing = false;
            var index = $scope.taskList.indexOf(item);
            $scope.taskList[index].taskName = item.taskName;

        };


//function for appearing deleting button after checking

        $scope.isChecked = function (item) {
            var index = $scope.taskList.indexOf(item);
            $scope.taskList[index].status = true;
        };


        //empty the storage
        $scope.emptyStorage = function () {
            $scope.taskList = [];
            localStorage.removeItem("taskList");
        };
    }
})();
a. HTML elements are the building blocks of HTML documents. They define the structure and content of a webpage. HTML elements consist of a start tag, content, and an end tag (if applicable).

b. Tags and CSS properties to make a table in HTML:

HTML Tags:
html
Copy code
<table> - Defines a table
<tr> - Defines a row in a table
<td> - Defines a cell in a table
<th> - Defines a header cell in a table
CSS Properties:
css
Copy code
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
th {
    background-color: #f2f2f2;
}




code:
<!DOCTYPE html>
<html lang="en" ng-app="courseRegistrationApp">
<head>
    <meta charset="UTF-8">
    <title>Course Registration System</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div ng-controller="CourseController as courseCtrl">
        <h2>Available Courses</h2>
        <table>
            <tr>
                <th>Course Name</th>
                <th>Seats Available</th>
                <th>Action</th>
            </tr>
            <tr ng-repeat="course in courseCtrl.availableCourses">
                <td>{{ course.name }}</td>
                <td>{{ course.seatsAvailable }}</td>
                <td>
                    <button ng-click="courseCtrl.register(course)" ng-disabled="course.seatsAvailable === 0">Register</button>
                </td>
            </tr>
        </table>

        <h2>Registered Courses</h2>
        <table>
            <tr>
                <th>Course Name</th>
            </tr>
            <tr ng-repeat="course in courseCtrl.registeredCourses">
                <td>{{ course.name }}</td>
            </tr>
        </table>
    </div>

    <script>
        angular.module('courseRegistrationApp', [])
            .controller('CourseController', function() {
                var vm = this;
                vm.availableCourses = [
                    { name: 'Mathematics', seatsAvailable: 20 },
                    { name: 'Science', seatsAvailable: 15 },
                    { name: 'History', seatsAvailable: 10 }
                ];
                vm.registeredCourses = [];

                vm.register = function(course) {
                    if (course.seatsAvailable > 0) {
                        course.seatsAvailable--;
                        vm.registeredCourses.push(course);
                    } else {
                        alert('Sorry, the course is already filled.');
                    }
                };
            });
    </script>
</body>
</html>
angular.module('app')
    .controller('calculatorController', function ($scope, calculatorResource) {
        $scope.displayResult = '0';
        $scope.isFEActive = true;
        var leftOperand = '';
        var rightOperand = '';
        var currentOperation = '';

        $scope.addNumber = function (number) {
            // if we already set an operation - fill second operand
            if (currentOperation) {
                rightOperand += number.toString();
                $scope.displayResult = leftOperand + currentOperation + rightOperand;
            } else { // othrwise fill left operand
                leftOperand += number.toString();
                $scope.displayResult = leftOperand;
            }
        };

        // set one of four operations '+' '-' '*' '/' (can be extended)
        $scope.setOperation = function (operation) {
            if (leftOperand) { // act only if we have left operand
                currentOperation = operation;
                $scope.displayResult = leftOperand + currentOperation + rightOperand;
            }
        }

        var prepareResult = function (result) {
            // clear all variables
            $scope.clear();
            // fill displayResult with calculated value
            $scope.displayResult = result;
            // set left operant as a current value so we can proceed with operations
            leftOperand = result;
        }

        $scope.calculate = function () {
            if ($scope.isFEActive) { // calculate on the front-end side
                var result = 0;
                switch (currentOperation) {
                    case '+':
                        result = parseFloat(leftOperand) + parseFloat(rightOperand);
                        break;
                    case '-':
                        result = parseFloat(leftOperand) - parseFloat(rightOperand);
                        break;
                    case '*':
                        result = parseFloat(leftOperand) * parseFloat(rightOperand);
                        break;
                    case '/':
                        result = parseFloat(leftOperand) / parseFloat(rightOperand);
                        break;
                }
                prepareResult(result);

            } else {
                var operation = '';
                switch (currentOperation) {
                    case '+':
                        operation = "Add";
                        break;
                    case '-':
                        operation = "Substract";
                        break;
                    case '*':
                        operation = "Multiply";
                        break;
                    case '/':
                        operation = "Devide";
                        break;
                }

                // calculate on the backend side
                calculatorResource.get(
                    operation,
                     parseFloat(leftOperand),
                    parseFloat(rightOperand)
                ).success(function (data) {
                    prepareResult(data);
                });
            }
        };

        // clear all variables for a new calculation
        $scope.clear = function () {
            leftOperand = '';
            rightOperand = '';
            $scope.displayResult = '0';
            currentOperation = '';
        }
    });
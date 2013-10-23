angular.module('NotasApp', ['ui.bootstrap']);
function NotasAppCrl($scope) {
  $scope.oneAtATime = true;

  $scope.materias = [
    {
      title: "Programação II",
    },
    {
      title: "Banco de Dados I",
    },
    {
      title: "Design Gráfico II",
    },
    {
      title: "Design de Interação",
    },
    {
      title: "Engenharia de Software I",
    },
    {
      title: "Formação Sociocultural e Ética",
    },
    {
      title: "Multimídia para a Internet",
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };
}
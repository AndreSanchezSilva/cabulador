angular.module('NotasApp', ['ui.bootstrap']);
function NotasAppCrl($scope) {
  $scope.oneAtATime = true;

  $scope.materias2 = [
    {
      config: {
        nome: "Programação II",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Banco de Dados I",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Design de Interação",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Engenharia de Software I",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Formação Sociocultural e Ética",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Design de Interação",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Multimídia para a Internet",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    }
  ];
  $scope.calcularMedia = function ( materia ) {

    var nota1 = materia.notasBim[0]!=''?parseFloat(materia.notasBim[0]):0;
    var nota2 = materia.notasBim[1]!=''?parseFloat(materia.notasBim[1]):0;
    var nota3 = materia.notasBim[2]!=''?parseFloat(materia.notasBim[2]):0;
    var nota4 = materia.notasBim[3]!=''?parseFloat(materia.notasBim[3]):0;

    var media =  (nota1+nota2+nota3+nota4)-240 ;

    return media;
  }
  $scope.classMedia = function ( materia ) {
    switch (true) {
      case (this.calcularMedia(materia)>0):
          return 'badge-success'
        break;
      default:
          return 'badge-important'
        break;
    }
  }
}
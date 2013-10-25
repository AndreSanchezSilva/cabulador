angular.module('NotasApp', ['ui.bootstrap']);
function NotasAppCrl($scope) {
  $scope.oneAtATime = true;

  $scope.materias = [
    {
      config: {
        nome: "Programação II",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [10,10,9.4,null],
      notasSub: ['',''],
      faltas: 34
    },
    {
      config: {
        nome: "Banco de Dados I",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [7.5,8.3,9.1,null],
      notasSub: ['',''],
      faltas: 34
    },
    {
      config: {
        nome: "Design de Interação",
        faltasPermitidas: 20,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [4,8.3,8,null],
      notasSub: [6,''],
      faltas: 16
    },
    {
      config: {
        nome: "Design de Gráfico II",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [7.7,6,6.5,null],
      notasSub: ['',''],
      faltas: 32
    },
    {
      config: {
        nome: "Engenharia de Software I",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [7.4,6.8,7.2,null],
      notasSub: ['',''],
      faltas: 22
    },
    {
      config: {
        nome: "Sociocultural e Ética",
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [5.3,9,null,null],
      notasSub: ['',''],
      faltas: 0
    },
    {
      config: {
        nome: "Multimídia para a Internet",
        faltasPermitidas: 20,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: [8.5,8.6,10,null],
      notasSub: ['',''],
      faltas: 12
    }
  ];

  $scope.calcularMedia = function ( materia ) {

    var nota1 = materia.notasBim[0]!=null?parseFloat(materia.notasBim[0]):0;
    var nota2 = materia.notasBim[1]!=null?parseFloat(materia.notasBim[1]):0;
    var nota3 = materia.notasBim[2]!=null?parseFloat(materia.notasBim[2]):0;
    var nota4 = materia.notasBim[3]!=null?parseFloat(materia.notasBim[3]):0;

    var media =  (nota1+nota2+nota3+nota4)-24;
    media = media.toFixed(1);

    if (media>0)
    	media = '+' + media;

    return media;
  }

  $scope.classMedia = function ( materia ) {
    switch (true) {
      case (this.calcularMedia(materia)>=0):
          return 'badge-success'
        break;
      default:
          return 'badge-important'
        break;
    }
    
  }

  $scope.recuperaIndice = function ( materia ) {
  	return this.materias.indexOf(materia);
  }

  $scope.somarFalta = function ( materia ) {
  	index = this.recuperaIndice(materia);
  	if(this.materias[index].faltas!='')
  		this.materias[index].faltas = parseFloat(this.materias[index].faltas) + 2;
  	else
  		this.materias[index].faltas = 2;
  }

  $scope.excluirMateria = function ( materia ) {
  	index = this.recuperaIndice(materia);
  	this.materias.splice(index,1);
  }
}
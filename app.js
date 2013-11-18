angular.module('NotasApp', ['ui.bootstrap','LocalStorageModule']);
function NotasAppCrl($scope, localStorageService) {
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
        nome: "Formação Sociocultural e Ética",
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
      faltas: 2
    }
  ];

  $scope.getLocal = function () {
    this.materias = localStorageService.get('materias');
  }

  $scope.setLocal = function (input) {
    console.log(input);
    this.materias[this.recuperaIndice(input)] = input;
    console.log(this.materias[this.recuperaIndice(input)]);
    localStorageService.clearAll();
    localStorageService.add('materias',this.materias);

    console.log(localStorageService.get('materias'));
  }
  
  $scope.converterNota = function ( nota ) {
    newNota  = [];
    for (var i = nota.length - 1; i >= 0; i--) {
      nota[i] = ((nota[i]==null)||(nota[i]==''))?0:parseFloat(nota[i]);
      newNota.push(nota[i]);
    };
    return newNota;
  }

  $scope.converterNota2 = function ( nota ) {
    newNota  = [];
    for (var i = 0; i < nota.length ; i++) {
      nota[i] = ((nota[i]==null)||(nota[i]==''))?0:parseFloat(nota[i]);
      newNota.push(nota[i]);
    };
    return newNota;
  }

  $scope.calcularQtoFalta = function ( materia ) {
    var nota = this.converterNota(materia.notasBim);
    var notaSub = this.converterNota(materia.notasSub);
    var media = 0;
    var s = 1;
    for (var i = nota.length - 1; i >= 0; i--) {
      if(nota[i]<notaSub[s])
        nota[i] = notaSub[s];
      if (i==2) {
        s--;
      };
    };
    for (var i = nota.length - 1; i >= 0; i--) {
      media += nota[i];
    };
    media -=  24;
    //media = media.toFixed(1);
    return media;
  }

  $scope.corFaltas = function ( materia ) {
    var valor = (100*materia.faltas)/materia.config.faltasPermitidas;
    var cor;
    if (valor < 33) {
      classe = 'text-success';
    } else if (valor < 66) {
      classe = 'text-warning';
    } else {
      classe = 'text-error';
    }

    return classe;
  }

  $scope.corNotas = function ( nota ) {
    var valor = (100*nota)/10;
    var cor;
    if (nota == '') {
      classe = 'muted';      
    } else if (valor < 33) {
      classe = 'text-error';
    } else if (valor < 66) {
      classe = 'text-warning';
    } else {
      classe = 'text-success';
    }

    return classe;
  }

  $scope.calcularMedia = function ( materia ) {
    var nota = this.converterNota(materia.notasBim);
    var notaSub = this.converterNota(materia.notasSub);
    var soma = 0;
    var s = 1;
    var count = 0;
    for (var i = nota.length - 1; i >= 0; i--) {
      if(nota[i]!='') {
        count++;
      }
      if(nota[i]<notaSub[s])
        nota[i] = notaSub[s];
      if (i==2) {
        s--;
      };      
    };
    for (var i = nota.length - 1; i >= 0; i--) {
      soma += nota[i];
    };
    //media = media.toFixed(1);
    return (soma/count);
  }

  $scope.caclularMediaSemestral = function (materia, semestre) {
    var notas =  this.converterNota2(materia.notasBim);
    var subs = this.converterNota2(materia.notasSub);
    var soma = 0;
    var count = 0;
    if (semestre==1) {
      var ini = 0;
      var max = 2;
      var sub = 0;
    } else {
      var ini = 2;
      var max = 4;
      var sub = 1;
    };
    for (var ini = ini; ini < max; ini++) {
      if(notas[ini]<subs[sub]){
        notas[ini] = subs[sub];
      }
      soma += notas[ini];
      if (notas[ini]!='') {
        count++;
      };
    };
    return soma / count;
  }
  $scope.classMedia = function ( materia ) {
    switch (true) {
      case (this.calcularMedia(materia)>=0):
          return 'badge-success';
        break;
      default:
          return 'badge-important';
        break;
    }    
  }

  $scope.calcularFaltas = function ( materia ) {
    return (materia.config.faltasPermitidas-materia.faltas);
  }

  $scope.progressoFalta = function ( materia ) {
    var valor = (100*materia.faltas)/materia.config.faltasPermitidas;
    var type;
    if (valor < 33) {
      type = 'success';
    } else if (valor < 66) {
      type = 'warning';
    } else {
      type = 'danger';
    }
    var progresso = {
      value: valor,
      type: type
    };
    return progresso;
  }

  $scope.cadastrarMateria = function ( nome ) {
    var novaMateria =    {
      config: {
        nome: nome,
        faltasPermitidas: 40,
        notaMinima: 240,
        bimestral: true
      },
      notasBim: ['','','',''],
      notasSub: ['',''],
      faltas: 0
    };
    if (!this.materias) {this.materias = []};
    this.materias.push(novaMateria);
    localStorageService.add('materias',this.materias);
  };
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
    localStorageService.add('materias',this.materias);
  }
}
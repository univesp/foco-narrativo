$(document).ready(function() {

  //////////////////////////////////////////////////////////////////
  // HEADER DINÂMICO
  // Mostra header somente no início da página.
  // Descomentar caso utilizada a classe .header-dinamico. Caso contrário, deletar.

  $(window).scroll(function() {
    var nav = $(".header-dinamico .container");
    var scroll = $(window).scrollTop();
    if (scroll == 0) {
      nav.fadeIn();
    } else {
      nav.fadeOut();
    }
  });

  //////////////////////////////////////////////////////////////////

  // Seu código abaixo

  let variavel = 1;

  $(function() {
    $(".btn-toggle").click(function(e) {
      e.preventDefault();
      el = $(this).data('element');
      if($(el).hasClass('mobileoff')){
        if(celular()){
          let mob = $(this).data('elementmobile');
          $(mob).addClass('revelada');
        }else{
          $(el).addClass( "revelada" );
        }
      }else{
        $(el).addClass( "revelada" );
      };
      this.classList.add('botaoDesligado');
      if(this.parentElement.parentElement.getElementsByClassName('aviso')[0]){
        this.parentElement.parentElement.getElementsByClassName('aviso')[0].classList.add('botaoDesligado');
      } else if (this.parentElement.parentElement.getElementsByClassName('aviso2')[0]) {
        this.parentElement.parentElement.getElementsByClassName('aviso2')[0].classList.add('botaoDesligado');
      }
      $(this).off('click');
      setTimeout(function(){
        document.querySelectorAll(el)[0].scrollIntoView({
          behavior: 'smooth'
        })
      }, 250);
    });
  });

function celular(){
  if ($(window).width() < 768){
    return true;
  }else{
    return false;
  }
}


  $(function() {
    $(".shownext").click(function(e) {
      e.preventDefault();
      el = $(this).data('element');
      $(el).removeClass( "escondido" );;
    });
    
  });


  $(".ponto_vista").click(clique);
  // $(".j").click(clique);

  

  function clique() {
    el = $(this).data('element');
    $(el).toggle();
  }

  $(".botaodropdown").click(cliquemobile);

  function cliquemobile() {
    el = $(this).data('element');

    if(variavel){
      $(el).show();
      this.style.borderRadius = "20px 20px 0px 0px";
      variavel = 0;
    } else {
      $(el).hide();
      this.style.borderRadius = "20px 20px 20px 20px";
      variavel = 1;
    }
  }

  
  let carousel = document.getElementById('carousel1');
  let btnBolinha = document.querySelectorAll('.bolinha');
  let btnBolinha2 = document.querySelectorAll('.bolinha2');

  let prev = document.getElementById('prevquest');
  let next = document.getElementById('nextquest');
  let carousel2 = document.getElementById('carouselquest');

  let botaoconfirmar = document.getElementById('botaoconfirmar');

  let arrayQuest = [];

  let botoesconfirmar = document.querySelectorAll('.confirmar');

  let quadrados = document.querySelectorAll('.texto>div');

  for (var i = 0; i < quadrados.length; i++){

    quadrados[i].addEventListener('click', function(){
      this.parentElement.parentElement.getElementsByClassName('bolinha')[0].click();

    })
  }

  for (var i = 0; i < botoesconfirmar.length; i++){
    botoesconfirmar[i].addEventListener('click', function(){

      let questao = this.parentElement.dataset.questao;

      if (!arrayQuest[questao].vazio()){
        let incorreta = this.parentElement.parentElement.getElementsByClassName('altincorreta')[0];
        let correta = this.parentElement.parentElement.getElementsByClassName('altcorreta')[0];
        let proximo = this.parentElement.getElementsByClassName('proximo')[0];
        let bolinha = this.parentElement.parentElement.getElementsByClassName('vez')[0];

        let teste = this.parentElement.parentElement.getAttribute('alternativa');


        //console.log(arrayQuest[questao].gabarito)

        let certa = this.parentElement.parentElement.querySelectorAll('.bolinha2[data-alternativa="' + arrayQuest[questao].gabarito + '"]')[0].parentElement;

        // let questaoCerta = document.querySelectorAll('')

        if (arrayQuest[questao].verifica() == true){
          correta.style.display = "block";
          bolinha.parentElement.style.background = "#009E4A";
          bolinha.parentElement.style.color = "white";
          bolinha.style.border = "2px solid #FFFFFF";
        } else {
          incorreta.style.display = "block";
          bolinha.parentElement.style.background = "#ED1C24";
          bolinha.parentElement.style.color ="white";
          bolinha.style.border = "2px solid #FFFFFF";
          certa.style.backgroundColor = 'green';
          certa.style.color = 'white';
        }
        //  this.style.display = "none";

        if(proximo){
        proximo.style.display = "block";
        }

        arrayQuest[questao].respondido = true;

        // Desliga Botão
        this.classList.add("escondeConfirmar");

      }
    })
  }


  prev.addEventListener('click', function(){
    $('#carouselquest').carousel('prev');
    //console.log(carousel2);
  });

  next.addEventListener('click', function(){
    $('#carouselquest').carousel('next');
    //console.log('teste');
  });

  for (var i = 0; i < btnBolinha.length; i++) {
    btnBolinha[i].addEventListener('click', fnBolinha);
  }

  function fnBolinha(){
    let texto = this.parentElement.parentElement.querySelectorAll('.texto > div')[0];

    let todosOsTextos = document.querySelectorAll('.texto > div');

    for (var i = 0; i < todosOsTextos.length; i++) {
      todosOsTextos[i].classList.remove('ativo');
    }

    texto.classList.add('ativo');


    $(carousel).carousel(parseInt(this.dataset.bolinha));
    //Remove todas as classes 'vez'
    for (var i = 0; i < btnBolinha.length; i++) {
      btnBolinha[i].classList.remove('vez');
    }
    //Adiciona a classe vez na atual.
    this.classList.add('vez');
    //console.log('entrei aqui')
  }

  for (var i = 0; i < btnBolinha2.length; i++) {
    btnBolinha2[i].addEventListener('click', fnBolinha2);
  }

  function fnBolinha2(){
    let alternativa = this.dataset.alternativa;
    let questao = this.parentElement.parentElement.dataset.questao;
    if(!arrayQuest[questao].respondido){
      //Remove todas as classes 'vez'
      for (var i = 0; i < btnBolinha2.length; i++) {
        btnBolinha2[i].classList.remove('vez');
      }
      //Adiciona a classe vez na atual.
      this.classList.add('vez');
      //console.log('questao: ', this.parentElement.parentElement.dataset.questao, ' Alternativa: ' ,this.dataset.alternativa);
      arrayQuest[questao].preenchido = alternativa;
    }
  }



  function Questao (gabarito){
    this.respondido = false;
    this.gabarito = gabarito;
    this.preenchido = '';
    this.verifica = function(){
      if (this.gabarito == this.preenchido) {
        return true;
        }
      else return false;
    }
    this.vazio = function(){
      if(this.preenchido == ''){
        return true;
      } else {
        return false;
      }
    }
  }



  arrayQuest.push(new Questao('g'));
  arrayQuest.push(new Questao('b'));
  arrayQuest.push(new Questao('a'));
  arrayQuest.push(new Questao('d'));
  arrayQuest.push(new Questao('c'));
  arrayQuest.push(new Questao('f'));
  arrayQuest.push(new Questao('h'));
  arrayQuest.push(new Questao('e'));

  //console.log(arrayQuest);

})

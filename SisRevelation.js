var somInicializacao = new Audio('SisRevelation-inicializacao.mp3');
var somMusica = new Audio('SisRevelation-musica.mp3');

var somEstouro = new Audio('SisRevelation-estouro.mp3');
var somErro = new Audio('SisRevelation-erro.mp3');

var somRevelacao = new Audio('SisRevelation-revelacao.mp3');

var somPlim = new Audio('SisRevelation-plim.mp3');
var somQuack = new Audio('SisRevelation-quack.mp3');

var somCashier = new Audio('SisRevelation-cashier.mp3');
var somClapping = new Audio('SisRevelation-clapping.mp3');


var NUM_MIN_JOGADAS = 9;
var NUM_MAX_JOGADAS = 9;



var nomes = [
/*  3 */	"ANA", "LIS", "SOL", 
/*  4 */	"HUGO", "JOSÉ", "NETO", "ROSA", "DIVA", "LARA", "JOÃO", "FLOR", "DAVI", "YSIS", "ENZO", "THOR", "THEO", 'IEDA', 'ELIS', 'INÊS', 
/*  5 */	"FÁBIO", "BRUNO", "CÉLIA", "DIEGO", "EDINA", "IRENE", "LÍDIA", "LUIZA", "MARIA", "NORMA", "NÚBIA", "ROQUE", "ALLAN", "LUANA", "ALANA", "ALINE", "JÔNIO", "LÍLIA", "LUÍSA", "PAULA", "RAVEL", "JULIA", "ALICE", "PEDRO", "YANKA", "YANNA", "MAYSA", 'ILMAR', 'TIAGO', 'BRENA', 
/*  6 */	"VICTOR", "ANDREA", "ANILDE", "FLÁVIA", "FÁTIMA", "LAYSSA", "LOÍDES", "MARYAN", "MAYANA", "NILSON", "RÂNIDE", "RÔMULO", "TALYTA", "TERESA", "CARLOS", "ARTHUR", "LUIMAR", "ÂNGELO", "CARLOS", "DENYSE", "LILIAN", "MIGUEL", "NONATO", "RAFAEL", "REGINA", "SUZANA", "HELENA", "CELINA", "YASMIN", "VIVIAN", "MATEUS", "ALEXIA", "ELISON", "ALÍCIA", "FELIPE", "HEITOR", 'DAIANA', 'DAYANE', 'EMILLY', 'MARCOS', 'DANIEL', 
/*  7 */	"RODRIGO", "ALISSON", "ADRIANO", "CELIANE", "CÍNTHIA", "EDUARDO", "EUGÊNIO", "GABRIEL", "GLÁUCIA", "LARISSA", "LUCIANA", "LUCÉLIA", "RICARDO", "TATIANA", "VALESKA", "VIVIANE", "ZAYANNA", "ZAYLSON", "ALBERTO", "IRACEMA", "NICOLAS", "EMERSON", "ALBERTO", "LEANDRO", "MARLENE", "SOCORRO", "GUSTAVO", "MARIANA", "CECÍLIA", "BENÍCIO", "MELINDA", "ISADORA", "NATÁLIA", "MARCELO", "BEATRIZ", 'ROBERTA', 'HAROLDO', 'MARCELA', 
/*  8 */	"MARCELLE", "CLARISSA", "CLEONICE", "LEILIANE", "LEONARDO", "NATHALIA", "PATRÍCIA", "THALISSA", "THALISSE", "EDMILSON", "NAZARENO", "ANTONIEL", "CAROLINA", "CRISTINA", "FRANKLIN", "HENRIQUE", "MAURÍCIO", "RAIMUNDO", "REINALDO", "VERÔNICA", "TARCÍSIO", "BENJAMIN", "FERNANDA", 
/*  9 */	"ALEXANDRE", "CLEMILTON", "CLEVERSON", "JEFFERSON", "VALENTINA", "GUILHERME", "DONATELLA", "CAROLLINE", 
/* 10 */	"ALESSANDRO", "CHRISTIANE", 'ABDSANDRYK'
];

var interrogacao = [		
			"?","?","?","?",
		"?","?","?","?","?","?",
	"?","?","?","?","?","?","?","?",
	"?","?","?","?","?","?","?","?",
	"?","?","?","?","?","?","?","?",
			"?","?","?","?","?","?",
				"?","?","?","?",
				"?","?","?",
				"?","?",
				"?","?",
				"?","?",
				"?","?"
];


var contador = -1;

var rodadas = 0;

var nome = "";

var pontuacaoAzul = 0;
var pontuacaoRosa = 0;

var revelado = false;

var ganhador = "";

var ovoDePascoa = "";


var Controle = function() {
	this.momentoPartida = "sorteio";
	this.equipeVez = "azul";
	this.jogadasRestantes = 0;
}

Controle.prototype.iniciar = function() {
	this.momentoPartida = "sorteio";
	this.equipeVez = "azul";
	this.jogadasRestantes = 0;

	atualizarVez();
}

Controle.prototype.alternar = function() {
	this.momentoPartida = "sorteio";

	if(this.equipeVez == "azul")
		this.equipeVez = "rosa";
	else if(this.equipeVez == "rosa")
		this.equipeVez = "azul";

	velarNumeros();

	atualizarVez();
}

Controle.prototype.avancar = function() {
	if(this.momentoPartida == "sorteio") {
		this.jogadasRestantes = Math.floor(NUM_MIN_JOGADAS + (Math.random() * (1 + (NUM_MAX_JOGADAS - NUM_MIN_JOGADAS))));
		
		baloesRestantes = ((interrogacao.length - 1) - contador)
		if(this.jogadasRestantes > baloesRestantes)
			this.jogadasRestantes = baloesRestantes;

		if (this.jogadasRestantes == 0)
			this.alternar();
		else
			this.momentoPartida = "revelacao";
	} else {
		this.jogadasRestantes--;
		
		if(this.jogadasRestantes < 1) {
			this.jogadasRestantes = 0;

			this.alternar();
		}
	}
}

var controle = new Controle();
controle.iniciar();



function comutarDesktopMobile() {
//	var necessario = ($("#tabuleiro").width() + $("#painel").width());

//	if(/*window.innerWidth < necessario || */window.innerHeight > window.innerWidth) {
	if(window.innerHeight > window.innerWidth) {
		$(document.body).addClass("mobile");
	}else {
		$(document.body).removeClass("mobile");
	}
	
/*
alert($("body").css("transform"));
	
alert(window.width + " " + window.innerWidth + " " + window.outerWidth + " " + $("#tela").css("width") + " " + $("#tela").width() + " " + $("#tela").innerWidth() + " " + $("#tela").outerWidth());
*/
	
	var escala = 0.975 * window.innerWidth / $("#tela").outerWidth();
	
//alert(escala);
	
	$("body").css("transform", "scale(" + escala + ")");
}


function equipeContraria(cor) {
	if(cor == "azul")
		return "rosa";
	else if(cor == "rosa")
		return "azul";
}


function monetizar(clicado) {
	if(clicado)
		somCashier.play();

	setTimeout(function() {
//		textoParaVoz("Com as novas regras da ANAC sobre bagagens, 💼 fica meio desvantajoso transportar volumes de São Luís para Brasília, ✈️ mesmo os tradicionais pacotes de fraldas! 🎁 Assim, optamos por receber presentes em dinheiro 💵 e criamos esta VAKINHA 🐄 como alternativa para quem prefere usar cartão de crédito. 💳 Fiquem à vontade em participar ou não e para escolher o valor, certo? 👍");
		textoParaVoz("Querido convidado, querida convidada: Com as novas regras da ANAC sobre bagagens, fica meio desvantajoso transportar volumes de São Luís para Brasília, mesmo os tradicionais pacotes de fraldas!!!!! Assim, optamos por receber presentes em dinheiro e criamos esta VAKINHA como alternativa para quem prefere usar cartão de crédito. Fiquem à vontade em participar, ou não; e para escolher o valor.   Ok?????");
	}, 3000);
}

function gamificar() {
	alert(ovoDePascoa);
}


function musica() {
	if(somMusica.paused == true) {
		somMusica.play();
	} else {
		somMusica.pause();
	}

	$("#musica").toggleClass("pausada");
}


function estourar(balao, valor) {
	somEstouro.play();

	$(balao).toggleClass("estouro");

	setTimeout(function() {
		$(balao).toggleClass("estouro");

		$(balao).append(valor);
	}, 1000);

	$(balao).addClass("estourado");
}


function textoParaVoz(texto) {
	var voz = new SpeechSynthesisUtterance(texto);

	voz.voice = window.speechSynthesis.getVoices()[0];
	voz.voiceURI = 'native';
	voz.volume = 1;	// 0 to 1
	voz.rate = 1;	// 0.1 to 10
	voz.pitch = 1;	//0 to 2
	voz.lang = 'pt-BR';

	window.speechSynthesis.speak(voz);
}


function atualizarPontuacao(vez, pontuacao) {
	if(vez == "rosa") {
		pontuacaoRosa += pontuacao;

		$("#pontuacao_rosa span").text(pontuacaoRosa == 0 ? "00" : ((pontuacaoRosa > 0 ? "+" : "") + pontuacaoRosa));
	} else {
		pontuacaoAzul += pontuacao;

		$("#pontuacao_azul span").text(pontuacaoAzul == 0 ? "00" : ((pontuacaoAzul > 0 ? "+" : "") + pontuacaoAzul));
	}
}

function atualizarRodadas() {
	$("#rodadas span").text(++rodadas);
}

function atualizarChances() {
	$("#chances span").text(controle.jogadasRestantes);
}

function atualizarVez() {
	if(controle.equipeVez == "azul")
		$("#vez").removeClass("vez_rosa").addClass("vez_azul");
	else if(controle.equipeVez == "rosa")
		$("#vez").removeClass("vez_azul").addClass("vez_rosa");
}


function realcarNumeros(balao) {
	$(balao).addClass("realce_fonte");
}

function velarNumeros() {
	$(".realce_fonte").removeClass("realce_fonte").addClass("realce_fundo retira_negrito");
}

function realcarLetras(balao, vez) {
	if(vez == "azul")
		$(balao).addClass("realce_fundo_azul realce_fonte_azul");
	else
		$(balao).addClass("realce_fundo_rosa realce_fonte_rosa");
}

function revelarLetras() {
	$("#tabuleiro .realce_fundo_".concat(ganhador)).removeClass("realce_fonte_".concat(ganhador).concat(" ").concat("realce_fonte_").concat(equipeContraria(ganhador))).addClass("revelado");
}


function ajustarPainel() {
	var perdedor = equipeContraria(ganhador);

	$("#pontuacao_".concat(ganhador).concat(" span")).addClass("coloca_negrito");
	$("#pontuacao_".concat(perdedor).concat(" span")).addClass("coloca_tachado");

	$(".realce_fundo_".concat(perdedor)).addClass("realce_fundo_".concat(ganhador)).removeClass("realce_fundo_".concat(perdedor));

	$("#vez span").removeClass("vez_".concat(perdedor)).addClass("vez_".concat(ganhador));
}


function declararGanhador() {
			somRevelacao.play();

			velarNumeros();
			
			setTimeout(function() {
				if(pontuacaoAzul > pontuacaoRosa) {
					ganhador = "azul";
				} else if(pontuacaoRosa > pontuacaoAzul) {
					ganhador = "rosa";
				} else {
					if(confirm("\nE-M-P-A-T-E  ! ! !   \n\nR-E-I-N-I-C-I-A-R  ? ? ?\n\n\n"))
						return reinicializar();
				}

				ajustarPainel();

				revelarLetras();
			}, 6000);
}


function apagarLetreiro(tocar) {
	if(tocar)
		somQuack.play();

	$("#letreiro .letra span").html("_");

	$("#tabuleiro .revelado").removeClass("realce_fonte preenchido").addClass("realce_fundo_".concat(ganhador));
}

function preencherLetreiro(balao) {	
	for (var i = 0; i < $("#letreiro .letra").children().length; i++) {
		if($("#letreiro .letra").children().eq(i).text() == "_") {
			var letra =  $(balao).text();

			if(letra == nome[i]) {
				$("#letreiro .letra").children().eq(i).text(letra);

				$(balao).addClass("realce_fonte preenchido").removeClass("realce_fundo_".concat(ganhador));

				somPlim.play();

				if((i + 1) == nome.length) {
					setTimeout(function() {
						finalizar();
					}, 2500);
				}

				return true;
			} else {
				return false;
			}
		}
	}
}


function finalizar() {
	textoParaVoz(nome);

	somClapping.play();
	
	setTimeout(function() {
		window.open("https://www.vakinha.com.br/vaquinha/cha-de-revelacao-marcelle-alisson-e", '_blank');
		monetizar(false);
	}, 5000);
}


function checar(balao, corSituacao) {
	return $(balao).hasClass(corSituacao);
}

function valor(balao) {
	return $(balao).attr('value');
}

function jogar(balao) {
	if(!revelado) {
		if(checar(balao, "estourado")) {
			somErro.play();

			return;
		}

		if(controle.momentoPartida == "sorteio" && checar(balao, controle.equipeVez)) {
			controle.avancar();
			
			estourar(balao, controle.jogadasRestantes);

			realcarNumeros(balao);

			atualizarRodadas();

		} else if(controle.momentoPartida == "revelacao" && (valor(balao) != 'XX')) {
			contador++;

			var ordem = parseInt(valor(balao)) - 1;

			estourar(balao, interrogacao[ordem]);
			
			var pontuacao = 0;

			if(interrogacao[ordem] == "?") {
				pontuacao = -1;

				$(balao).addClass("retira_negrito");
			} else {
				pontuacao = +10;

				realcarLetras(balao, controle.equipeVez);
			}

			atualizarPontuacao(controle.equipeVez, pontuacao);

			controle.avancar();
		} else {
			somErro.play();
		}
		
		atualizarChances();

		if(contador >= (interrogacao.length - 1)) {
			revelado = true;

			declararGanhador();
		}
	} else {
		if(checar(balao, "revelado") && !checar(balao, "preenchido")) {
			if(!preencherLetreiro(balao))
				apagarLetreiro(true);
		} else {
			somErro.play();
		}
	}

	$("#tabuleiro tr td").css('width','57px');
}


function limparTela() {
	for (var linha = 0; linha < 14; linha++)
		for (var coluna = 0; coluna < 16; coluna++)
			$("#tabuleiro tbody").children().eq(linha).children().eq(coluna).text("");

	for(j = 0; j < interrogacao.length; j++)
		interrogacao[j] = "?";


	$("#tabuleiro tr td").removeClass("estourado  realce_fonte realce_fonte_azul realce_fonte_rosa  realce_fundo realce_fundo_azul realce_fundo_rosa  retira_negrito  revelado preenchido");

	$("#placar div span").removeClass("coloca_negrito coloca_tachado");

	$("#musica").removeClass("pausada").addClass("tocando");


	atualizarPontuacao("azul", 0);
	atualizarPontuacao("rosa", 0);

	atualizarVez();

	atualizarChances();

	atualizarRodadas();

	apagarLetreiro(false);

	somMusica.load();
}

function reinicializar() {
	contador = -1;
	rodadas = -1;

	nome = "";

	pontuacaoAzul = 0;
	pontuacaoRosa = 0;

	revelado = false;

	ganhador = "";

	ovoDePascoa = "";


	controle.iniciar();


	limparTela();


	principal();
}


function principal() {
	nome = nomes[Math.floor(Math.random() * nomes.length)];
//nome = "ALISSON";

	for(i = 0; i < nome.length; i++) {
		while(true) {
			var k = Math.floor(Math.random() * 55);

			if(interrogacao[k] != "?")
				continue;

			interrogacao[k] = nome[i];

			ovoDePascoa = ovoDePascoa.concat(nome[i]).concat(" | ").concat(k + 1).concat("   ");

			break;
		}
	}


	somInicializacao.play();
	somInicializacao.volume = 0.25;

	somMusica.play();
	somMusica.loop = true;
	somMusica.volume = 0.05;
//somMusica.pause();

	somEstouro.volume = 0.50;
	somErro.volume = 0.50;

	somRevelacao.volume = 1.00;

	somCashier.volume = 0.75;

	somPlim.volume = 1.00;
	somQuack.volume = 1.00;

	somClapping.volume = 0.75;

	setTimeout(function() {
		comutarDesktopMobile();
	}, 000);
}




principal();
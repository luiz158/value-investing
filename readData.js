var setResultadoEmCampo,
    expandirValor,
    validaVolumeMedioDiario21d,
    validaValorDeMercado,
    validaROE,
    validaNivelGovernanca,
    validaLiquidezCorrente,
    validaDividaBrutaPatrimonioLiquido,
    validaPrecoValorPatrimonial;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "dados_disponiveis") {
        setResultadoEmCampo("#volumeMedioDiario21d", validaVolumeMedioDiario21d(request.dados.volumeDiarioMedio21d));
        setResultadoEmCampo("#valorDeMercado", validaValorDeMercado(request.dados.valoresDeMercado));
        setResultadoEmCampo("#roe", validaROE(request.dados));
        setResultadoEmCampo("#nivelDeGovernanca", validaNivelGovernanca(request.dados.nivelGovernanca));
        setResultadoEmCampo("#liquidezCorrente", validaLiquidezCorrente(request.dados.liquidezCorrente));
        setResultadoEmCampo("#dividaBrutaPatrimonioLiquido", validaDividaBrutaPatrimonioLiquido(request.dados.dividaBrutaSobrePatrimonioLiquido));
        setResultadoEmCampo("#precoValorPatrimonial", validaPrecoValorPatrimonial(request.dados.precoSobreValorPatrimonial));
        setResultadoEmCampo("#precoLucro", validaPrecoLucro(request.dados.precoSobreLucro));
    }
  }
);

$(document).ready(function(){

    $("#btnAnalisar").click(function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "processar_dados"});
        });
    });
});

validaVolumeMedioDiario21d = function(volumeDiarioMedio21d) {
    var valor = expandirValor(volumeDiarioMedio21d);
    return [valor > 1000000, volumeDiarioMedio21d];
}

validaValorDeMercado = function(valoresDeMercado) {
    var valor = expandirValor(valoresDeMercado);
    return [valor > 500000000, valoresDeMercado];
}

validaROE = function(dados) {
    var lucroLiquido = expandirValor(dados.lucroLiquido);
    var patrimonioLiquido = expandirValor(dados.patrimonioLiquido);
    var valorFinal = (lucroLiquido / patrimonioLiquido) * 100;
    return [valorFinal > 20, valorFinal + "%"];
}

validaNivelGovernanca = function(nivelGovernanca) {
    var valor = true;
    if(!nivelGovernanca || nivelGovernanca.trim() === "") {
        valor = false;
    }
    return [valor, valor ? nivelGovernanca : "Não"];
}

validaLiquidezCorrente = function(liquidezCorrente) {
    var valor = expandirValor(liquidezCorrente);
    return [valor > 1.5, liquidezCorrente];
}

validaDividaBrutaPatrimonioLiquido = function(dividaBrPatrLiq) {
    var valor = expandirValor(dividaBrPatrLiq);
    return [valor < 50, dividaBrPatrLiq];
}

validaPrecoValorPatrimonial = function(precoValorPatrimonial) {
    var valor = expandirValor(precoValorPatrimonial);
    return [valor < 2, precoValorPatrimonial];
}

validaPrecoLucro = function(precoLucro) {
    var valor = expandirValor(precoLucro);
    return [valor < 15, precoLucro];
}

setResultadoEmCampo = function(campo, resultado) {
    $(campo).addClass(resultado[0] ? "positivo" : "negativo");
    $(campo).html(resultado[1]);
}

expandirValor = function(valorNaoNumerico) {
    var valor = valorNaoNumerico.match(/\d[\d\,]*/)[0].replace(",", ".") * 1;
    if(valorNaoNumerico.endsWith("M")) {
      valor *= 1000000;
    } else if(valorNaoNumerico.endsWith("B")) {
      valor *= 1000000000;
    }
    return valor;
}
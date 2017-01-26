//Funções
var executaChecklist,
    buscarVolumeDiario21D,
    buscarValorDeMercado,
    buscarNivelGovernanca,
    buscarLiquidezCorrente,
    buscarROE,
    buscarDividaBrutaSobrePatrimonioLiquido,
    buscarPrecoSobreValorPatrimonial,
    buscarPrecoSobreLucro,
    buscarLucroLiquido,
    buscarPatrimonioLiquido;

//Modelo de domínio
var dados = {
    volumeDiarioMedio21d: null,
    valoresDeMercado: null,
    nivelGovernanca: null,
    liquidezCorrente: null,
    retornoSobrePatrimonioLiquido: null,
    dividaBrutaSobrePatrimonioLiquido: null,
    precoSobreValorPatrimonial: null,
    precoSobreLucro: null,
    lucroLiquido: null,
    patrimonioLiquido: null,
    lucroAcao: null,
    valorAcao: null
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.message === "processar_dados") {
      console.log("indo..." + request.message)
      executaChecklist();

      chrome.runtime.sendMessage({"message": "dados_disponiveis", "dados": dados});
    }
  }
);

executaChecklist = function() {
    dados.volumeDiarioMedio21d = buscarVolumeDiario21D();
    dados.valoresDeMercado = buscarValorDeMercado();
    dados.nivelGovernanca = buscarNivelGovernanca();
    dados.liquidezCorrente = buscarLiquidezCorrente();
    dados.retornoSobrePatrimonioLiquido = buscarROE();
    dados.dividaBrutaSobrePatrimonioLiquido = buscarDividaBrutaSobrePatrimonioLiquido();
    dados.precoSobreValorPatrimonial = buscarPrecoSobreValorPatrimonial();
    dados.precoSobreLucro = buscarPrecoSobreLucro();
    dados.lucroLiquido = buscarLucroLiquido();
    dados.patrimonioLiquido = buscarPatrimonioLiquido();
    dados.lucroAcao = buscarLucroAcao();
    dados.valorAcao = buscarValorAcao();
}

buscarVolumeDiario21D = function() {
    return $("#lbVolumeMedio").html();
}

buscarValorDeMercado = function() {
    return $("#lbValorMercadoAtual").html();
}

buscarNivelGovernanca = function() {
    return $("#lbGovernanca").html();
}

buscarLiquidezCorrente = function() {
    return $("#lbLiquidezCorrente3").html();
}

buscarROE = function() {
    return "<<a implementar>>";
}

buscarDividaBrutaSobrePatrimonioLiquido = function() {
    return $("#lbDividaTotalBrutaSobrePatrimonioLiquido3").html();
}

buscarPrecoSobreValorPatrimonial = function() {
    return $("#lbPrecoValorPatrimonialAtual").html();
}

buscarPrecoSobreLucro = function() {
    return $("#lbPrecoLucroAtual").html();
}

buscarLucroLiquido = function() {
    return $("#lbLucroPrejuizoPeriodo3").html();
}

buscarPatrimonioLiquido = function() {
    return $("#lbPatrimonioLiquido3").html();
}

buscarLucroAcao = function() {
    return $("#lbLucroAcao3").html();
}

buscarValorAcao = function() {
    return $("#lbValorPatrimonialAcao3").html();
}
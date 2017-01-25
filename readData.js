chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "dados_disponiveis") {
      $("#volumeMedioDiario21d").html(request.dados.volumeDiarioMedio21d);
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

    $("#volumeMedioDiario21d").html("uhuuu")
});
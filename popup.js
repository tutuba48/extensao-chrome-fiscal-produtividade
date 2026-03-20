// Lógica para BLOQUEAR
document.getElementById('btn-bloquear').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let url = new URL(tab.url);
    let dominio = url.hostname;

    chrome.storage.local.get(['sitesBloqueados'], function(resultado) {
        let sites = resultado.sitesBloqueados || [];
        
        if (!sites.includes(dominio)) {
            sites.push(dominio);
            chrome.storage.local.set({ sitesBloqueados: sites }, function() {
                alert("Bloqueado: " + dominio);
                window.close();
            });
        } else {
            alert("Este site já está na lista!");
        }
    });
});

// Lógica para DESBLOQUEAR
document.getElementById('btn-desbloquear').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let url = new URL(tab.url);
    let dominio = url.hostname;

    chrome.storage.local.get(['sitesBloqueados'], function(resultado) {
        let sites = resultado.sitesBloqueados || [];
        
        if (sites.includes(dominio)) {
            // Filtra a lista, removendo o domínio atual
            sites = sites.filter(site => site !== dominio);
            chrome.storage.local.set({ sitesBloqueados: sites }, function() {
                alert("Desbloqueado: " + dominio);
                window.close();
            });
        } else {
            alert("Este site não está bloqueado!");
        }
    });
});
// Consulta a lista salva antes de agir
chrome.storage.local.get(['sitesBloqueados'], function(resultado) {
    let sites = resultado.sitesBloqueados || [];
    let siteAtual = window.location.hostname;

    // Verifica se o site que você abriu bate com algum da lista
    let deveBloquear = sites.some(site => siteAtual.includes(site));

    if (deveBloquear) {
        ativarBarreira();
    }
});

function ativarBarreira() {
    const telaDeAviso = document.createElement("div");
    
    telaDeAviso.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 15, 15, 0.95); color: white; z-index: 9999999; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: sans-serif; backdrop-filter: blur(10px);">
            <h1 style="font-size: 60px; color: #ff4757; margin-bottom: 20px; text-align: center;">🚨 ALERTA DE PROCRASTINAÇÃO!</h1>
            <p style="font-size: 24px; margin-bottom: 40px; color: #ced6e0;">Você realmente deveria estar neste site agora?</p>
            <button id="btn-foco" style="padding: 15px 40px; font-size: 22px; cursor: pointer; background: #2ed573; color: white; border: none; border-radius: 8px; font-weight: bold;">
                Voltar ao Trabalho
            </button>
        </div>
    `;
    
    document.body.appendChild(telaDeAviso);

    document.getElementById("btn-foco").addEventListener("click", () => {
        window.location.href = "https://www.google.com"; 
    });
}
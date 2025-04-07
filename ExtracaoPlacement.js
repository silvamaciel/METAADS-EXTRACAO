function importarFacebookAdsPlacement() {
  const token = "token aqui ";
  const adAccountId = 'ID DA SUA CONTA';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FACEADS_PLACEMENT") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("FACEADS_PLACEMENT");
  

  const headers = ["Data", "Ad ID", "Ad Set ID","Amount spent", "Messaging Conversations Started", "Plataforma", "Posição", "Dispositivo"];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  // 🔧 Configuração da escolha de data
  const usarDataManual = false; // 👉 true para usar data fixa / false para usar próxima após a última da planilha
  const dataManual = new Date("2024-01-01"); // 👈 edite essa data se usarDataManual = true

  let dataAtual;

  if (usarDataManual) {
    dataAtual = new Date(dataManual);
  } else {
    const dataColuna = sheet.getRange(2, 1, sheet.getLastRow() - 1 || 1).getValues().flat().filter(v => v);
    const ultimaData = dataColuna.length ? new Date(dataColuna[dataColuna.length - 1]) : new Date("2024-01-01");
    dataAtual = new Date(ultimaData);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  const hoje = new Date();
  hoje.setDate(hoje.getDate() - 1); // até ontem

  while (dataAtual <= hoje) {
    const since = dataAtual.toISOString().split("T")[0];
    const until = since;

    console.log(`🔎 Buscando dados para: ${since}`);

    const url = `https://graph.facebook.com/v18.0/act_${accountId}/insights?fields=ad_id,adset_id,spend,actions&breakdowns=publisher_platform,platform_position,impression_device&level=ad&limit=1000&time_range=${encodeURIComponent(`{"since":"${since}","until":"${until}"}`)}&access_token=${token}`;

    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      const dados = json.data || [];

      if (dados.length === 0) {
        console.log(`⚠️ Nenhum dado no dia ${since}. Pulando.`);
      }

      const linhas = [];

      dados.forEach(item => {
        const conversas = (item.actions || []).find(a => a.action_type === "onsite_conversion.messaging_conversation_started_7d");

        linhas.push([
          item.date_start || since,
          item.ad_id || "",
          item.adset_id || "",
          parseFloat(item.spend) || "0",          
          conversas ? conversas.value : "0",
          item.publisher_platform || "",
          item.platform_position || "",
          item.impression_device || ""
        ]);
      });

      if (linhas.length > 0) {
        sheet.getRange(sheet.getLastRow() + 1, 1, linhas.length, headers.length).setValues(linhas);
      }
    } catch (erro) {
      console.error(`❌ Erro ao buscar dados de ${since}: ${erro}`);
    }

    dataAtual.setDate(dataAtual.getDate() + 1); // próximo dia
  }

  console.log("✅ Consulta finalizada.");
}

function importarFacebookAdsInsights() {
  const token = "token aqui ";
  const adAccountId = 'act_ID DASUA CONTA';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ADS_MAIN") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("ADS_MAIN");

  const headers = [
    "Day", "Campaign Name", "Ad Set Name",
    "Amount Spent", "Impressions", "Clicks", "Reach",
    "Objective", "Campaign ID", "Ad Set ID",
    "First Reply", "Messaging Conversations Started"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  // 🔁 Definir data inicial automaticamente (último dia da planilha + 1)
  let dataAtual;
  if (sheet.getLastRow() <= 1) {
    dataAtual = new Date("2024-01-01"); // Data inicial padrão
  } else {
    const dataColuna = sheet.getRange(2, 1, sheet.getLastRow() - 1).getValues().flat();
    const ultimaData = dataColuna.length ? new Date(dataColuna[dataColuna.length - 1]) : new Date("2024-01-01");
    dataAtual = new Date(ultimaData);
    dataAtual.setDate(dataAtual.getDate() + 1);
  }

  const hoje = new Date();
  hoje.setDate(hoje.getDate() - 1); // Até ontem

  while (dataAtual <= hoje) {
    const since = dataAtual.toISOString().split("T")[0];
    const until = since;

    console.log(`🔍 Buscando dados para: ${since}`);

    const url = `https://graph.facebook.com/v22.0/${adAccountId}/insights?fields=campaign_name%2Cadset_name%2Cad_name%2Cad_id%2Cspend%2Cimpressions%2Cclicks%2Creach%2Cobjective%2Ccampaign_id%2Cadset_id%2Coutbound_clicks_ctr%2Cactions&time_increment=1&time_range=%7B%22since%22%3A%22${since}%22%2C%22until%22%3A%22${until}%22%7D&level=adset&limit=100&access_token=${token}`;

    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      const dados = json.data || [];

      if (dados.length === 0) {
        console.log(`⚠️ Nenhum dado no dia ${since}. Pulando.`);
      }

      dados.forEach(item => {
        const actions = item.actions || [];
        const firstReply = actions.find(a => a.action_type === "onsite_conversion.messaging_first_reply");
        const started7d = actions.find(a => a.action_type === "onsite_conversion.messaging_conversation_started_7d");

        const linha = [
          item.date_start || "",
          item.campaign_name || "",
          item.adset_name || "",
          parseFloat(item.spend) || "0",
          item.impressions || "0",
          item.clicks || "0",
          item.reach || "0",
          item.objective || "",
          item.campaign_id || "",
          item.adset_id || "",
          firstReply ? parseFloat(firstReply.value) : "0",
          started7d ? parseFloat(started7d.value) : "0"
        ];

        sheet.appendRow(linha);
      });
    } catch (erro) {
      console.error(`❌ Erro ao buscar dados de ${since}: ${erro}`);
    }

    dataAtual.setDate(dataAtual.getDate() + 1); // próximo dia
  }

  console.log("✅ Finalizado");
}

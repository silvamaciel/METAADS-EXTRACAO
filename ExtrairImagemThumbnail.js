function importarAdsComThumbnailCorreto() {
  const token = "token aqui ";
  const adAccountId = 'act_ID DASUA CONTA';
  const baseUrl = `https://graph.facebook.com/v18.0/${adAccountId}/ads`;
  const fields = 'creative,adset_id,adcreatives{thumbnail_url}';
  let url = `${baseUrl}?fields=${encodeURIComponent(fields)}&limit=100&access_token=${token}`;
  const dados = [];

  while (url) {
    const response = UrlFetchApp.fetch(url);
    const json = JSON.parse(response.getContentText());
    const ads = json.data;

    for (const ad of ads) {
      const adId = ad.id || "";
      const creativeId = ad.creative?.id || "";
      const adsetId = ad.adset_id || "";
      const thumbnails = ad.adcreatives?.data || [];

      for (const thumb of thumbnails) {
        const thumbUrl = thumb.thumbnail_url || "";
        dados.push([adId, adsetId, creativeId, thumbUrl]);
      }

      if (thumbnails.length === 0) {
        dados.push([adId, adsetId, creativeId, ""]);
      }
    }

    url = json.paging?.next || null;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AdsComThumbnail") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("AdsComThumbnail");
  sheet.clearContents();
  sheet.appendRow(["ad_id", "adset_id", "creative_id", "thumbnail_url"]);
  if (dados.length > 0) {
    sheet.getRange(2, 1, dados.length, 4).setValues(dados);
  }
}

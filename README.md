# 📊 Facebook Ads Reports Automation via Google Sheets & Apps Script

Este projeto automatiza a extração diária de dados do Facebook Ads diretamente para o Google Sheets usando Google Apps Script e a Graph API do Meta.
Você precisa ter um minimo de noção de como funcionam as macros do Appscript 

## 🚀 O que este script faz?

- Conecta-se à **API do Facebook Ads**
- Extrai métricas por **anúncio**, **idade/gênero** ou **plataforma/dispositivo**
- Salva automaticamente os dados em abas separadas de uma planilha do Google Sheets
- Atualiza os dados **diariamente** com base na data atual
- Remove acentuação decimal inconsistente e trata valores corretamente
- Organiza os dados para facilitar análise e dashboards

## 📌 Métricas disponíveis:

- `spend` (gasto)
- `impressions` (impressões)
- `reach` (alcance)
- `clicks` (cliques)
- `unique_clicks`
- `onsite_conversion.messaging_first_reply`
- `onsite_conversion.messaging_conversation_started_7d`
- `publisher_platform (instagram ou facebook)`
- `platform_position (lugar da plataforma)`
- `impression_device (iphone, Smarthphone, tablet etc`
- `Age (idade)`
- `Gender (genero)`
- `region`
- ´AD_Thumbnail (url da miniatura do anuncio)´

## 📅 Atualização Diária

Você pode configurar o script para buscar dados:

- Apenas do **dia atual**
- Ou em loop, do último dia registrado até ontem

## 🛠️ Pré-requisitos

- Conta de **anunciante no Facebook Ads**
- **Access Token** da Graph API com permissões de leitura
- Planilha no Google Sheets
- Permissão para rodar Apps Script na sua conta Google

## 🧩 Como usar

1. Vá até o Google Sheets e clique em `Extensões > Apps Script`
2. Copie o conteúdo do arquivo `.gs` deste repositório
3. Cole no editor e salve
4. Substitua seu **Access Token**
5. Crie as abas na planilha com os nomes:
   - `ADS_MAIN`
   - `FACEBOOKADS_ANUNCIO_MAIN`
   - `FACEBOOKADS_IDADE_GENERO`
   - `FACEBOOKADS_PLATAFORMA`
6. Execute o script

Opcional: configure um gatilho (`Trigger`) para rodar diariamente de forma automática.

## 📸 Exemplo do resultado

![image](https://github.com/user-attachments/assets/77438414-d885-46e4-8173-4ec8c53ea674)


## 🤝 Contribuição

Sinta-se à vontade para abrir issues, dar sugestões ou fazer um fork com melhorias!  
Este projeto surgiu da minha necessidade como desenvolvedor e analista de tráfego para otimizar a coleta de dados e ganhar tempo no dia a dia.

---

## 🧑‍💻 Documentação complementar
🔗 [https://developers.facebook.com/docs/graph-api?locale=pt_BR](url) - Documentação Graph Api

🔗 [https://developers.google.com/apps-script?hl=pt-br](url) Documentação Appscript
## 🧑‍💻 Autor

**[Maciel Silva]**  
🔗 [[LinkedIn]([https://www.linkedin.com/in/silvamaciel/])](https://www.linkedin.com/in/silvamaciel/)  
📬 contato: maciel.unidata@gmail.com

---

## 📄 Licença

MIT License

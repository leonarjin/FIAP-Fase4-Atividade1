const html =
  "<html><head><title>Gulliver Traveller - Roteiros</title></head><body><b>->1 - Roteiros para *São Paulo*</b><br>A Terra da Garoa!<br>Fundada em 25 de janeiro de 1554, a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro financeiro do Brasil. Aqui vão três dicas de roteiros obrigatórios para aqueles que passam pela capital paulista<br>#Roteiro A | Região: Avenida Paulista<br>MASP; Parque Trianon; Rua Augusta<br>#Roteiro B | Região: Centro<br>Catedral da Sé; Pátio do Colégio; Rua Augusta<br>#Roteiro C | Região: Vila Madalena<br>Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila<br> <b>->2 - Roteiros para *Las Vegas*</b><br>Viva Las Vegas!<br>       A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905. É considerada oficialmente como uma cidade desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos jogos de azar!<br>#Roteiro A | Região: Las Vegas Boulevard South<br>Fonte do Bellagio; Principais Cassinos; Madame Tussauds<br>#Roteiro B | Região: Downtown<br>; Fremont; Las Vegas Art Museum; Museu Nacional do Crime Organizado; <br>#Roteiro C | Região: Las Vegas Boulevard North<br>Outlet Premium North; Stratosphere; Apple Fashion Show<br><b>->3 - Roteiros para *Moscou*</b><br>Privet!<br>A capital russa fica situada às margens do Rio Moscou e, apesar de ser a cidade mais cosmopolita da Rússia, grande parte de sua história está preservada<br>#Roteiro A | Região: Praça Vermelha<br>Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin<br>#Roteiro B | Região: Centro<br>Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou<br>#Roteiro C | Região: Obras pela cidade<br>Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station  <br></body></html>";
const cidades = [];
const pontosTuriscosCentroSP = [];
const pontosTuriscosDowntownLV = [];
const roteirosA = [];

function buscarCidade(html, characterInicial, characterFinal) {
  return html.substring(
    html.indexOf(characterInicial) + 1,
    html.lastIndexOf(characterFinal)
  );

}

function sliceHtml(html, stringSlice) {

  return html.split(stringSlice);

}

function buscarRoteiros(trechoDeTexto) {

  var linhasBR = trechoDeTexto.split("<br>");

  var roteirosA = [];

  for (var i = 0; i < linhasBR.length; i++) {

    if (linhasBR[i].includes("Roteiro A")) {

      for (x = i; x < linhasBR.length; x++) {

        if (linhasBR[x].includes("Roteiro B")) {
          break;
        }

        roteirosA.push(linhasBR[x]);

        i = x;

      }

    }

  }

  return roteirosA;

}

function buscarPontosTuriscos(trechoDeTexto, local, fim, cidade) {

  var linhasBR = trechoDeTexto.split("<br>");

  var pontos = [];

  for (var x = 0; x < linhasBR.length; x++) {

    if (!linhasBR[x].includes(cidade))
      continue;

    for (var y = x + 1; y < linhasBR.length; y++) {

      if (!linhasBR[y].includes(local))
        continue;

      for (z = y + 1; z < linhasBR.length; z++) {

        if (linhasBR[z].includes(fim))
          break;

        nomes = linhasBR[z].split("; ");

        for (n = 0; n < nomes.length; n++)
          if (nomes[n] != "")
            pontos.push(nomes[n]);
      }
    }

    break;
  }

  return pontos;

}

var trechoDeTextos = sliceHtml(html, "<b>");

for (var i = 1; i < trechoDeTextos.length; i++) {
  var cidade = buscarCidade(trechoDeTextos[i], "*", "*");

  if (cidade != "") {
    cidades.push(cidade);
  }

  var roteiro = buscarRoteiros(trechoDeTextos[i]);

  if (roteiro != "") {
    roteirosA.push(roteiro);
  }

  var pontos = buscarPontosTuriscos(trechoDeTextos[i], "Centro", "#", "São Paulo");

  pontos.forEach(ponto => {
    pontosTuriscosCentroSP.push(ponto);
  });

  var pontos = buscarPontosTuriscos(trechoDeTextos[i], "Downtown", "#", "Las Vegas");

  pontos.forEach(ponto => {
    pontosTuriscosDowntownLV.push(ponto);
  });
}

document.write("As cidades são: <ul>");
for (var x = 0; x < cidades.length; x++) {
  document.write("<li>" + cidades[x] + "</li>");

  for (var y = 0; y < roteirosA[x].length; y++) {

    if (!roteirosA[x][y].includes("#")) {

      var text = roteirosA[x][y].toString();

      var locais = text.split(";");

      document.write("<div style='border: 1px solid black; padding: 5px; margin: 5px;'><label>Roteiros A</label>" + " (" + locais.length + "):");
      for (var i = 0; i < locais.length; i++)
        document.write("<div>" + locais[i] + "</div>");
      document.write("</div>");
    }
  }
}
document.write("</ul><br>");

document.write("<div>");
document.write("<label>Pontos Turísticos do Centro de São Paulo são:</label>");
pontosTuriscosCentroSP.forEach(ponto => {
  document.write("<div>" + ponto + "</div>")
});
document.write("</div><br>");

document.write("<div>");
document.write("<label>Pontos Turísticos de Downtown de Las Vegas são:</label>");
pontosTuriscosDowntownLV.forEach(ponto => {
  document.write("<div>" + ponto + "</div>")
});
document.write("</div><br>");
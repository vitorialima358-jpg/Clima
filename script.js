async function buscarClima() {
  const cidade = document.getElementById("cidade").value;
  const resultado = document.getElementById("resultado");

  if (cidade.length < 3) {
    resultado.innerText = "Digite um nome válido";
    return;
  }

  resultado.innerText = "🔍 Buscando...";

  try {
    // 1️⃣ Geocoding (cidade → latitude/longitude)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results) {
      resultado.innerText = "Cidade não encontrada";
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2️⃣ Clima atual
    const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const climaRes = await fetch(climaUrl);
    const climaData = await climaRes.json();

    const temp = Math.round(climaData.current_weather.temperature);

    resultado.innerHTML = `
      <strong>${name}</strong><br>
      🌡️ ${temp}°C
    `;

  } catch (error) {
    resultado.innerText = "Erro ao buscar clima";
  }
}

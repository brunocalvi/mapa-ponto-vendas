
mapboxgl.accessToken = '<-- Sua key de acesso aqui -->';

/**
 * Adicione o mapa à página
 * a variavel stores que o json com os dados vem da index do arquivo
 */
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-77.034084142948, 38.909671288923],
  zoom: 13,
  scrollZoom: true,
  // Escolha entre os estilos principais do Mapbox ou crie seu próprio estilo com o Mapbox Studio
  style: 'mapbox://styles/mapbox/streets-v12'
});

//pesquisar regiao no mapa
/*
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  language: 'pt-BR', // Especificado o idioma como port. - Brasil.
  mapboxgl: mapboxgl
});
map.addControl(geocoder);
*/

const size = 200;

// Isso implementa `StyleImageInterface`
// para desenhar um ícone de ponto pulsante no mapa.
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  // Quando a camada é adicionada ao mapa,
  // obtém o contexto de renderização para a tela do mapa.
  onAdd: function () {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
  },

  // Chama uma vez antes de cada quadro onde o ícone será usado.
  render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const context = this.context;

      // Desenhe o círculo externo.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
      );
      context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
      context.fill();

      // Desenha o círculo interno.
      context.beginPath();
      context.arc(
          this.width / 2,
          this.height / 2,
          radius,
          0,
          Math.PI * 2
      );
      context.fillStyle = 'rgba(255, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // Atualize os dados desta imagem com os dados da tela.
      this.data = context.getImageData(
          0,
          0,
          this.width,
          this.height
      ).data;

      // Repinta continuamente o mapa, resultando
      // na animação suave do ponto.
      map.triggerRepaint();

      // Retorna `true` para informar ao mapa que a imagem foi atualizada.
      return true;
  }
};

// Adicionar controles de zoom e rotação ao mapa.
map.addControl(new mapboxgl.NavigationControl());

/**
 * Atribua um id único a cada loja. Você usará este `id`
 * posteriormente para associar cada ponto do mapa a uma listagem
 * na barra lateral.
 */
stores.features.forEach((store, i) => {
  store.properties.id = i;
});

/**
 * Aguarde até que o mapa carregue para fazer alterações no mapa.
 */
map.on('load', () => {

  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
  /**
   * Aqui é onde seu '.addLayer()' costumava estar, em vez
   * adicione apenas a fonte sem estilizar uma camada
   */
  map.addSource('dot-point', {
    'type': 'geojson',
    'data': stores
  });

  map.addLayer({
      'id': 'layer-with-pulsing-dot',
      'type': 'symbol',
      'source': 'dot-point',
      'layout': {
          'icon-image': 'pulsing-dot'
      }
  });

  /**
   * Adicione todas as coisas à página:
   * - As listagens de localização na lateral da página
   * - Os marcadores no mapa
   */
  buildLocationList(stores);
  addMarkers();
});

/**
 * Adicione um marcador ao mapa para cada listagem de loja.
 **/
function addMarkers() {
  /* Para cada feição no objeto GeoJSON acima: */
  for (const marker of stores.features) {
    /* Crie um elemento div para o marcador. */
    const el = document.createElement('div');
    /* Atribua um `id` exclusivo ao marcador. */
    el.id = `marker-${marker.properties.id}`;
    /* Atribua a classe `marker` a cada marcador para estilização. */
    el.className = 'marker';

    /**
     * Crie um marcador usando o elemento div
     * definido acima e adicione-o ao mapa.
     **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    /**
     * Ouça o elemento e quando ele for clicado, faça três coisas:
     * 1. Voe direto ao ponto
     * 2. Feche todos os outros pop-ups e exiba o pop-up da loja clicada
     * 3. Destaque a listagem na barra lateral (e remova o destaque de todas as outras listagens)
     **/
    el.addEventListener('click', (e) => {
      /* Voe até o ponto */
      flyToStore(marker);
      /* Feche todos os outros pop-ups e exiba o pop-up da loja clicada */
      createPopUp(marker);
      /* Destacar listagem na barra lateral */
      const activeItem = document.getElementsByClassName('active');
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      const listing = document.getElementById(
        `listing-${marker.properties.id}`
      );
      listing.classList.add('active');
    });
  }
}

/**
 * Adicione uma listagem para cada loja na barra lateral.
 **/
function buildLocationList(stores) {
  for (const store of stores.features) {
    /* Adicione uma nova seção de listagem à barra lateral. */
    const listings = document.getElementById('listings');
    const listing = listings.appendChild(document.createElement('div'));
    /* Atribua um `id` exclusivo à listagem. */
    listing.id = `listing-${store.properties.id}`;
    /* Atribua a classe `item` a cada listagem para estilização. */
    listing.className = 'item';

    /* Adicione o link à listagem individual criada acima. */
    const link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = `link-${store.properties.id}`;
    link.innerHTML = `${store.properties.titulo}`;

    /* Adicione detalhes à listagem individual. */
    const details = listing.appendChild(document.createElement('div'));
    details.innerHTML = `${store.properties.endereco} <br/>`;
    if (store.properties.telefone) {
      details.innerHTML += `<i class="fa fa-phone" aria-hidden="true"></i>${store.properties.maskNumero}`;
    }

    /**
     * Ouça o elemento e quando for clicado, faça quatro coisas:
     * 1. Atualize o `currentFeature` para a loja associada ao link clicado
     * 2. Voe direto ao ponto
     * 3. Feche todos os outros pop-ups e exiba o pop-up da loja clicada
     * 4. Destaque a listagem na barra lateral (e remova o destaque de todas as outras listagens)
     **/
    link.addEventListener('click', function () {
      for (const feature of stores.features) {
        if (this.id === `link-${feature.properties.id}`) {
          flyToStore(feature);
          createPopUp(feature);
        }
      }
      const activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    });
  }
}

/**
 * 
 * Use `flyTo` do Mapbox GL JS para mover a câmera suavemente
 * um determinado ponto central.
 **/
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

/**
 * Crie um Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `
      <h3>${currentFeature.properties.titulo}</h3>
      <p>
        <b>Endereço:</b> ${currentFeature.properties.endereco}, nº ${currentFeature.properties.numero}<br/>
        <b>Contato:</b> <a href="https://wa.me/${currentFeature.properties.telefone}" target="_blank">${currentFeature.properties.maskNumero}</a><br/>
        <b>Obs. do local:</b><br/> 
          ${currentFeature.properties.observacoes}
      </p>
      `
    )
    .addTo(map);
}

$(document).ready(function() {
  $(function(){
    var contador = 0;

    $(".ocultar").click(function(){
      if(contador === 0){
        $("#sidebar").addClass("ajuste");
        $("#listings").css("display","none");
        $('#map').click(function(){
          $("#sidebar").addClass("ajuste");
          $(".listings").css("display","none");
        });
        $('.mapboxgl-popup').click(function(){
          $("#sidebar").addClass("ajuste");
          $(".listings").css("display","none");
        });
        $('.marker').click(function(){
          $("#sidebar").addClass("ajuste");
          $(".listings").css("display","none");
        });
        contador = 1;

      } else {
        $("#sidebar").removeClass("ajuste");
        $("#listings").css("display","block");
        contador = 0;
      }
    });
  });
});



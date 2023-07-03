<?php 
$localizacao = [
  'type' => 'FeatureCollection',
  'features' => [
    [
      'type' => 'Feature',
      'geometry' => [
          'type' =>'Point',
          'coordinates' => [-77.034084142948, 38.909671288923]
      ],
      'properties' => [
        'maskNumero' => '(11) 11111-1111',
        'telefone' => 11111111111,
        'endereco' => 'Rua: 1471 P St NW',
        'cidade' => 'Washington DC',
        'numero' => 20005,
        'estado' => 'D.C.',
        'titulo' => 'Teste Ponto 1',
        'observacoes' => 'De segunda a sexta das 8:30 as 20hs Sábado das 8:30 as 19hs Domingo das 9 as 17hs'
      ]
    ],
    [
      'type' => 'Feature',
      'geometry' => [
        'type' => 'Point',
        'coordinates' => [-77.049766, 38.900772]
      ],
      'properties' => [
        'maskNumero' => '(22) 22222-2222',
        'telefone' => 22222222222,
        'endereco' => 'Rua: 2221 I St NW',
        'cidade' => 'Washington DC',
        'numero' => 20037,
        'estado' => 'D.C.',
        'titulo' => 'Teste Ponto 2',
        'observacoes' => 'De segunda a sexta das 8:30 as 20hs Sábado das 8:30 as 19hs Domingo das 9 as 17hs'
      ]
    ],
    [
      'type' => 'Feature',
      'geometry' => [
        'type' => 'Point',
        'coordinates' => [-77.043929, 38.910525]
      ],
      'properties' => [
        'maskNumero' => '(33) 33333-3333',
        'telefone' => 33333333333,
        'endereco' => 'Rua: 1512 Connecticut Ave NW',
        'cidade' => 'Washington DC',
        'numero' => '20036',
        'estado' => 'D.C.',
        'titulo' => 'Teste Ponto 3',
        'observacoes' => 'De segunda a sexta das 8:30 as 20hs Sábado das 8:30 as 19hs Domingo das 9 as 17hs'
      ]
    ],
  ]
];


//echo '<pre>'; print_r($localizacao); echo '</pre>';
?>
<!-- Convertendo o array PHP para array JavaScript em format JSON -->
<script type='text/javascript'>
  <?php echo "const stores = ". json_encode($localizacao) . ";\n"; ?>
</script>

<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Demo: Build a store locator using Mapbox GL JS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js"></script>
    <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css" rel="stylesheet"/>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="./css/style.css" >
  </head>
  <body>

    <div id="sidebar" class="sidebar">
      <div class="heading ocultar">
        <h1>Pontos Cadastrados
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
          </svg>
        </h1>
      </div>
      <div id="listings" class="listings"></div>
    </div>

    <div id="map" class="map ocultar"></div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>


    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
    <link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="./js/scriptMap.js"></script>

  </body>
</html>
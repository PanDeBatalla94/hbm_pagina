@extends('cabecera')

@section('js')
{!! Html::script('js/json_libreria/d3.js') !!}
{!! Html::script('js/json_libreria/d3.min.js') !!}
{!! Html::script('js/convertir_csv.js') !!}

<script type="text/javascript">
     jQuery(document).ready(function() {
     	var ruta = "{{$ruta['ruta']}}";
     	var nodo = "{{$ruta['nodo']}}";

     	//console.log("{{ Storage::path($ruta['ruta']) }}");
     
     	//"{{$ruta['ruta']}}"
		d3.tsv( "{{Storage::url($ruta['ruta'])}}",function(data) {
		for (var i = 0 ; i < data.length; i++) 
		{
		//reemplazar valores   
		for (var key in data[i]) {

		  data[i][key] = data[i][key].replace('{','');
		  data[i][key] = data[i][key].replace('}','');
		}
		   messagesRef.push(data[i]);    
		}

		});
     	//convertir_csv(ruta, nodo);
      //obtener_nodos(ruta, nodo);
    })
  </script>

@endsection
@section('contenido')
<b>asd</b>
@endsection
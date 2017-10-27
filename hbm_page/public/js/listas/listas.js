

function obtener_nodos(){


  var html='';
//ontienevalores de nodos que se actualizan
  const divListado = document.getElementById('listaNodos');
  const fDB = firebase.database().ref();
  /*preDB.on('value', snap => function(){

 
  html = html+'<div class="card"> <div class="card-header" role="tab" id="headingOne"><h5 class="mb-0">';
  html = html+'       <a data-toggle="collapse" data-parent="#accordion" href="#'+preDB.key()+'" aria-expanded="true" aria-controls="collapseOne">';
  html = html+         preDB.key();
  html = html+'       </a> </h5></div>';

  html = html+'   <div id="'+preDB.key()+'" class="collapse " role="tabpanel" aria-labelledby="headingOne">';
  html = html+'     <div class="card-block">';
  html = html+'<div class="table-responsive" >';
  html = html+'        <table class="table table-bordered">';

 //   html = html + html_tab;
//   html = html+'</tr>';
   html = html+'</table>';
   html = html+'     </div>';
   html = html+'     </div>';
   html = html+'   </div>';
   html = html+' </div>';

});*/
var sNodo;
divListado.innerHTML='';
fDB.on("child_added",function (snapshot) {
  
            key = snapshot.key;         
           // tablas.push([key]);
            //snapshot.forEach(function (childSnapshot) {

               // key = childSnapshot.key;
                //console.log(key);
                //aNodos.push(key);
                /*starCountRef = firebase.database().ref("/"+key);
                starCountRef.on('value', function (snapshot) {
                    console.log(snapshot.val());
                    usuarios.push([key,snapshot.val()]);
                });*/

                sNodo = key;
                //MOSTRAR TODOS LOS NODOS
                html = '';
                html = html+'<div class="card"> <div class="card-header" role="tab" id="headingOne"><h5 class="mb-0">';
                html = html+'       <a data-toggle="collapse" data-parent="#accordion" href="#'+key+'" aria-expanded="true" aria-controls="collapseOne" onclick="get_nodo(\''+sNodo+'\')">';
                html = html+         key;
                html = html+'       </a> </h5></div>';

                html = html+'   <div id="'+key+'" class="collapse " role="tabpanel" aria-labelledby="headingOne">';
                html = html+'     <div class="card-block"><div id="tab_'+key+'"></div>';
                

               //   html = html + html_tab;
              //   html = html+'</tr>';

                 html = html+'     </div>';
                 html = html+'     </div>';
                 html = html+'   </div>';
                 html = html+' </div>';
                divListado.insertAdjacentHTML('beforeend', html); 
           // });
//

}); 





}

function get_nodo(sNodo){

  var html_tab = '';
  const divTabla= document.getElementById('tab_'+sNodo);

  const fDB = firebase.database().ref().child(sNodo);
  html_tab = html_tab+'<div class="table-responsive" >';
  html_tab = html_tab+'<table class="table table-bordered">';
  //cabecera tabla
  const fDBLast = firebase.database().ref().child(sNodo).limitToFirst(1);
  html_tab = html_tab+'<tr><th>id</th> ';
  fDBLast.once("child_added",function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      key = childSnapshot.key; //nodos principale
      html_tab = html_tab+'<th>'+key+'</th>';
    });
  });
  //tabla
  html_tab = html_tab+'</tr> ';

  fDB.on("child_added",function (snapshot) {
      html_tab = html_tab+'<tr> <td>'+snapshot.key+'</td>';
      snapshot.forEach(function (childSnapshot) {
      //CREA TABLA CON INFORMACION PERTENECIENTE AL NODO               
      html_tab = html_tab+'<td>'+childSnapshot.val()+'</td>';           
    });

    html_tab = html_tab+'</tr>';
                
 
  }); 
  html_tab = html_tab+'        </table>';
  html_tab = html_tab+'        </div>';

 // console.log(html_tab);
  divTabla.innerHTML=  html_tab; 




  //funcion para crear evento tablas

  $('#tab_'+sNodo + ' tr').click(function () {
  var tTd = $(this).find('td');
  //var parent = $(this).siblings().find('tr').find('td').deleteContents();
  console.log($(this).siblings().find('tr'));
 //$(this).toggle($(this).nextSibling);

  
  var input = document.createElement("input");
  input.type = "text";
  //input.name = "member" + i;
 input.value = tTd.innerText;
  input.id = "prueba";

  tTd[0].insertAdjacentHTML('beforeend', input);

  //  tTd[0].siblings().deleteContents();;
    
    //tTd.addClass('selected').siblings().removeClass('selected');    
})

}
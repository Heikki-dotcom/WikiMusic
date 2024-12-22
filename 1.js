$.ajax({
  url: 'file.json', 
  dataType: 'json', 
  success: function (response) {
    // Recorremos la lista de artistas
    for (var i = 0; i < response.artistas.length; i++) {
      $("#lista").append('<a href="search.html?query=' + encode(response.artistas[i].nombre) + '">' + response.artistas[i].nombre + '</a> <br>');
    }
    console.log(response); 
  },
  error: function (xhr, status, error) {
    console.log("Error: " + error);
  }
});

function encode(text) {
  text = text.toLowerCase();
  text = text.replace(/\s/g,'_');
  return text
}
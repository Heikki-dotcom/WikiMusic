function getQueryVariable(variable) { 
  var query = window.location.search.substring(1); 
  var vars = query.split("&"); 
  for (var i = 0; i < vars.length; i++) { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable) { 
      return pair[1]; 
    } 
  }
  return -1;
}

function encode(text) {
  text = text.toLowerCase();
  text = text.replace(/\s/g, '_');
  return text;
}

$(document).ready(function () {
  let result = getQueryVariable('query');
  $.ajax({
    url: 'file.json', // Ensure your JSON file path is correct
    dataType: 'json',
    success: function (response) {
      console.log('a');
      console.log(response.artistas);
      for (var i = 0; i < response.artistas.length; i++) {
        if (encode(response.artistas[i].nombre) == result) {
          $('#name').html(response.artistas[i].nombre);
          $('title').text(response.artistas[i].nombre);

          // Add tabs for each album
          for (var j = 0; j < response.artistas[i].albumes.length; j++) {
            let activeClass = (j === 0) ? 'active' : ''; // Set first tab as active

            // Creating the tab navigation
            let tabContent = `
              <li class="nav-item" role="presentation">
                <a data-mdb-tab-init class="nav-link ${activeClass}" id="ex1-tab-${j+1}" href="#ex1-tabs-${j+1}" role="tab" aria-controls="ex1-tabs-${j+1}" aria-selected="${j === 0 ? 'true' : 'false'}">Tab ${j+1}</a>
              </li>
            `;
            $("#ex1").append(tabContent);

            // Creating the content for each tab
            let tabPanelContent = `
              <div class="tab-pane fade ${activeClass}" id="ex1-tabs-${j+1}" role="tabpanel" aria-labelledby="ex1-tab-${j+1}">
                <h4>${response.artistas[i].albumes[j].titulo}</h4>
                <ul>
                  ${response.artistas[i].albumes[j].canciones.map(song => `<li>${song}</li>`).join('')}
                </ul>
              </div>
            `;
            $("#ex1-content").append(tabPanelContent);
          }
        }
      }
    }
  });
});

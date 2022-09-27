const numPersonagens = document.getElementById("personagens")
const numLuas = document.getElementById("luas")
const numPlanetas = document.getElementById("planetas")
const numNaves = document.getElementById("naves")


preenchendoContadores();
preencherTabela();
desenharGrafico();

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(desenharGrafico);

      async function desenharGrafico() {
        const response = await swapiGet("vehicles/")
        const vehiclesArray = response.data.results
        console.log(vehiclesArray)

        const dataArray = []
        dataArray.push(["Veículos", "Passageiros"])
        vehiclesArray.forEach(vehicle => {
            dataArray.push([vehicle.name, Number(vehicle.passengers)])
        })



        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
          title: 'Relação veiculos e Passageiros',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }

function preenchendoContadores(){
    Promise.all([swapiGet('people/'), swapiGet('vehicles/'), 
                 swapiGet('planets/'), swapiGet('starships/')])
    .then(function (results) {
    numPersonagens.innerHTML = results[0].data.count
    numLuas.innerHTML = results[1].data.count
    numPlanetas.innerHTML = results[2].data.count
    numNaves.innerHTML = results[3].data.count    
});
  
}

async function preencherTabela() {
    const response = await swapiGet('films/')    
    const tableData = response.data.results
    tableData.forEach(film => {
        $('#filmsTable').append(`<tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
        </tr>`) 
    });
}

function swapiGet(param){
return axios.get(`https://swapi.dev/api/${param}`)
}
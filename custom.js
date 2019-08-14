function searchByText() {
    $('#response_container').text('').append(
        `<div class="loader"></div>`
    );
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/disco-action-2.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function (e) {
        if (Http.readyState == 4) {
            $(".loader").fadeOut("slow");

            var json = JSON.parse(Http.responseText);
            console.log(json.matching_results)

            if (!json.matching_results){
                $('#response_container').text(`No se encontraron Resultados`)
            }else{
                $('#response_container').append(
                    `
                    <div class="container">
                        <div class="row">
                            <div class="col" id="passages">
                            </div>
                            <div class="col" id="documentos">
                            </div>
                        </div>
                    </div>
                    `
                )

                json.passages.forEach(function (element) {

                    var passage_text = element.passage_text;
                    var passage_score = element.passage_score;

                    $('#passages').append(
                        `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    Passage
                                </h5>
                                <p class="card-text">
                                    ${passage_text} 
                                </p>
                                <p>
                                    Score: ${passage_score}
                                </p>
                            </div>
                        </div>
                        `
                    )
                })

                json.results.forEach(function (element) {

                    var document_text = element.text;
                    var document_score = element.result_metadata.score;

                    $('#documentos').append(
                        `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">
                                Document
                            </h5>
                            <p class="card-text">
                                ${document_text}
                            </p>
                            <p>
                                Score: ${document_score}
                            </p>
                        </div>
                    </div>
                    `
                    )
                });
        
            }
        }
    }
}

function searchTopStories() {
    $('#response_container').text('').append(
        `<div class="loader"></div>`
    );
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/news-discovery.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function (e) {
        if (Http.readyState == 4) {
            $(".loader").fadeOut("slow");

            var json = JSON.parse(Http.responseText);
            console.log(json.matching_results)
            if (!json.matching_results){
                $('#response_container').text(`No se encontraron Resultados`)
            }else{
                json.results.forEach(function (element) {

                    var main_image_url = element.main_image_url;
                    var title = element.title;
                    var text = element.text;
                    var url = element.url;
    
                    $('#response_container').append(
                        `
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <div class="card-body">
                                    <img src="${main_image_url}" class="card-img" alt="Imagen URL">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        ${title}
                                    </h5>
                                    <p class="card-text">
                                        ${text} 
                                    </p>
                                    <a href="${url}" target="_blank" class="card-link">
                                        leer más
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    )
                });
            }

        }
    }
}

function searchBySentiment() {
    $('#response_container').text('').append(
        `<div class="loader"></div>`
    );
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/serverless-codeDay/sentimentAnalysis.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function (e) {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            var json = JSON.parse(Http.responseText);

            $(".loader").fadeOut("slow");
            $('#response_container').append(
                `
            <h2>Analisis de Sentimiento de: ${input}</h2>
            <div id="canvas-holder" style="width:80%">
            <canvas id="chart-area"></canvas>
            </div>
            `
            );

            var positive = json.aggregations[0].results[0]["matching_results"];
            var negative = json.aggregations[0].results[1]["matching_results"];
            var neutral = json.aggregations[0].results[2]["matching_results"];

            var config = {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [
                            positive,
                            negative,
                            neutral
                        ],
                        backgroundColor: [
                            'rgb(75, 192, 192)',
                            'rgb(255, 99, 132)',
                            'rgb(201, 203, 207)',
                        ],
                        label: 'Dataset 1'
                    }],
                    labels: [
                        'Positivo',
                        'Negativo',
                        'Neutral'
                    ]
                },
                options: {
                    responsive: true
                }
            };

            var ctx = document.getElementById('chart-area').getContext('2d');
            window.myPie = new Chart(ctx, config);
        }
    }
}


$(document).ready(function () {
    $(".search_button").click(function () {
        $('#page_1').css('top', '-100%')
        $('#page_1').css('transform', 'translateY(-100%)')
        $('#page_1').css('transition-duration', '1.5s')
        $('#response_page').css('transform', 'translateY(-100%)')
        $('#response_page').css('transition-duration', '2.5s')
    });
    $("#search_again").click(function () {
        $('#page_1').css('top', '0%')
        $('#page_1').css('transform', 'translateY(0%)')
        $('#page_1').css('transition-duration', '1.5s')
        $('#response_page').css('transform', 'translateY(0%)')
        $('#response_page').css('transition-duration', '1s')
    });
});


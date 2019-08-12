function searchByText() {
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/disco-action-2.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
        $('#response_container').text(Http.responseText)
    }
}

function searchTopStories() {
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/news-discovery.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
        $('#response_container').text(Http.responseText)
    }
}

function searchBySentiment() {
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url = 'https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/serverless-codeDay/sentimentAnalysis.json?user_input=' + input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4) {
            console.log(Http.responseText);
            var json = JSON.parse(Http.responseText);

            $('#response_container').append(
                `
            <h2>Analisis de Sentimiento de: ${input}</h2>
            <div id="canvas-holder" style="width:100%">
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


function searchByText(){
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url='https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/disco-action-2.json?user_input='+input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        $( '#response_container').text(Http.responseText)
    }
}

function searchTopStories(){
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url='https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/news-discovery.json?user_input='+input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        $( '#response_container').text(Http.responseText)
    }
}

function searchBySentiment(){
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url='https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/serverless-codeDay/sentimentAnalysis.json?user_input='+input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        var json = JSON.parse(Http.responseText)
        $( '#response_container').append(
            "<div id=positive_div>"+
            "<p>Positive: </p><p> "+json.aggregations[0].results[0]["matching_results"]+"</p></div>"+
            "<div id=negative_div>"+
            "<p>Negative: </p><p> "+json.aggregations[0].results[1]["matching_results"]+"</p></div>"+
            "<div id=neutro_div>"+
            "<p>Neutral: </p><p> "+json.aggregations[0].results[2]["matching_results"]+"</p></div>"
        )
    }
}


$(document).ready(function () {
    $( ".search_button" ).click(function() {
        $( '#page_1' ).css('top','-100%')
        $( '#page_1' ).css('transform','translateY(-100%)')
        $( '#page_1' ).css('transition-duration','1.5s')
        $( '#response_page' ).css('transform','translateY(-100%)')
        $( '#response_page' ).css('transition-duration','2.5s')
    });
    $( "#search_again" ).click(function() {
        $( '#page_1' ).css('top','0%')
        $( '#page_1' ).css('transform','translateY(0%)')
        $( '#page_1' ).css('transition-duration','1.5s')
        $( '#response_page' ).css('transform','translateY(0%)')
        $( '#response_page' ).css('transition-duration','1s')
    });
});


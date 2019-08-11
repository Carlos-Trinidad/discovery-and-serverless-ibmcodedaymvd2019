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


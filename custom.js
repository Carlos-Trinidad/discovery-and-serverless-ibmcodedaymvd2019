function searchByText(){
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url='https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/disco-action-2.json?user_input='+input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    }
}

function searchTopStories(){
    var input = document.getElementById('search_bar').value;
    const Http = new XMLHttpRequest();
    const url='https://us-south.functions.cloud.ibm.com/api/v1/web/Juan.fajardo1%40ibm.com_dev/default/news-discovery.json?user_input='+input;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    }
}

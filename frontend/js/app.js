$(document).ready(function () {
    $('#get-data').click(function () {
        $.ajax({
            url: 'http://localhost:9001/api/v1/time',
            method: 'GET'
        })
        .done(function (response) {
            $('.result').text(response);
        })
        .fail(function () {
            $('.result').text('Oh Noes! Something went wrong.');
        });
    });
});

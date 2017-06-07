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

    $('#create-pancake').submit(function (ev) {
        ev.preventDefault();

        var pancake = {
            name: $('input[name="name"]').val()
        };

        $.ajax({
            url: 'http://localhost:9001/api/v1/pancakes',
            method: 'POST',
            data: JSON.stringify({ pancake: pancake }),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .done(function (response) {
            $('.create-pancake-result').text(response);
        })
        .fail(function () {
            $('.create-pancake-result').text('Oh Noes! Something went wrong.');
        });
    });

    function getPancakes () {
        $.ajax({
            url: 'http://localhost:9001/api/v1/pancakes',
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
        .done(function (response) {
            if (response.pancakes.length === 0) {
                $('.get-pancake-result').text('No pancakes stored in the DB.');
            } else {
                var listHtml = '';
                for (var i = 0 ; i < response.pancakes.length; i++) {
                    listHtml += '<li>' + response.pancakes[i].name + '</li>';
                }
                $('.get-pancake-result').html('<ul>' + listHtml + '</ul>');
            }
        })
        .fail(function () {
            $('.get-pancake-result').text('Oh Noes! Something went wrong.');
        });
    }

    // call the get pancakes method once when we load the page
    getPancakes();

    // call the get pancakes when we hit the refresh list button too
    $('#refresh-pancakes').click(getPancakes);
});

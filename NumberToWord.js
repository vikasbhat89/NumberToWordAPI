
$(document).ready(function () {
    $("#number").keypress(function (event) {
        return isNumber(event, this);
    });

    function isNumber(evt, element) {

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // Check minus and only once.
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // Check for dots and only once.
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }

    $("#OutputVal").click(function () {
        if ($('#name').val() == '' || $('#number').val() == '') {
            alert('please enter both details to proceed');
            return false;
        }
        var letters = /^[a-zA-Z\s]+$/;
        if (!($('#name').val().match(letters))) {
            alert("Please enter alphabets only in name field.");
            return false;
        }

        var person = new Object();
        person.name = $('#name').val();
        person.number = $('#number').val();
        $.ajax({
            url: 'http://localhost:50872/api/NumberToWord/',
            contentType: 'application/json; charset=utf-8',
            type: 'GET',
            dataType: 'json',
            data: ({
                number: person.number
            }),
            success: function (data) {
                $("#Table").html('');
                $("#DIV").html('');
                var DIV = '';
                var rows = "<tr>" +
                    "<td>" + person.name + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td>" + data + "</td>" +
                    "</tr>";
                $('#Table').append(rows);

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });
    });
});

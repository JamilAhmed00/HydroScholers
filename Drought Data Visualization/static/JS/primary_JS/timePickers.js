
var maxYear_d, maxMonth_d, maxDay, maxYear_m, maxMonth_m;
var maxMonth, maxYear;

$(document).ready(function() {
    $('#start_day').html(fillHTML(1, 31, 'day'));
    $('#end_day').html(fillHTML(1, 31, 'day'));
    $('#end_day').val(31);   // sets default value to 31
    $('#start_month').html(fillHTML(1, 12, 'month'));
    $('#end_month').html(fillHTML(1, 12, 'month'));

    // gets max dates of netCDF files
    fetch('/getMaxDates').then(async response => {
        const text = await response.text();
        let list = text.split(' ');
        maxYear_d = parseInt(list[0]);
        maxMonth_d = parseInt(list[1]);
        maxDay = parseInt(list[2]);
        maxYear_m = parseInt(list[3]);
        maxMonth_m = parseInt(list[4]);
        // the page opens with the daily option selected
        maxMonth = maxMonth_d;
        maxYear = maxYear_d;
    }).then( () => {  
        $('#start_year').html(fillHTML(1990, maxYear, 'year'));
        $('#end_year').html(fillHTML(1990, maxYear, 'year'));
    });
});


var months = ['January', 'February', 'March', 'April', 'May', 'June',
             'July','August','September', 'October','November','December'];
var lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


// https://stackoverflow.com/questions/10142643/easy-way-to-add-drop-down-menu-with-1-100-without-doing-100-different-options
// Creates an html expression to fill a dropdown with a range of values
function fillHTML(min, max, variable) {
    var select = '';
    // if months, use corresponding names in months array
    if (variable=='month') {
        for (let i = 0; i < max; i++) {
            select += '<option val=' + i + '>' + months[i] + '</option>';
        }
    }
    // for day and year, use numbers
    else {
        for (let i = min; i <= max; i++) {
            select += '<option val=' + i + '>' + i + '</option>';
        }
    }
    return select;
}


// Resets the values in the start_day or end_day dropdown menu to match given month
// time should be 'start' or 'end'; index is index in 'months' of desired month
function reset(time, index) {
    let select = fillHTML(1, lengths[index], 'day')
    $('#'+time+'_day').html(select);
}


$('#start_month').on('change', function() {
    console.log('Year changed to: ' + $(this).val());
    let date = $('#start_day').val()  // store original date selected
    // last month of last year
    if ($('#start_year').val() == maxYear && months.indexOf($('#start_month').val()) == maxMonth-1) {
        $('#start_day').html(fillHTML(1, maxDay, 'day'));
        // make sure date doesn't overflow month (if current date is 31 and new month is April, set date to 30)
        date = Math.min(date, maxDay) 
    }
    else {   // regular month
        let index = months.indexOf($('#start_month').val());
        reset('start', index);
        date = Math.min(date, lengths[index]);  // make sure date doesn't overflow month
    }
    $('#start_day').val(date);
});


$('#end_month').on('change', function() {
    let date = $('#end_day').val()  // store original date selected
    // last month of last year
    if ($('#end_year').val() == maxYear && months.indexOf($('#end_month').val()) == maxMonth-1) {
        $('#end_day').html(fillHTML(1, maxDay, 'day'));
        date = Math.min(date, maxDay); // make sure date doesn't overflow month
    }
    else {  // regular month
        let index = months.indexOf($('#end_month').val());
        reset('end', index)
        // make sure date doesn't overflow month
        date = Math.min(date, lengths[index]) 
    }
    $('#end_day').val(date);
});


$('#end_year').on('change', function () {
    // reset February length
    if (isLeapYear($('#end_year').val()))
        lengths[1] = 29;
    else 
        lengths[1] = 28;

    // reset months
    let month = $('#end_month').val();  // save current value
    // if year is last year
    if ($('#end_year').val() == maxYear) {
        let index = months.indexOf(month);
        $('#end_month').html(fillHTML(1, maxMonth, 'month'));
        index = Math.min(index, maxMonth - 1);   // -1 because index of January is 0
        month = months[index];
    } else {  // not last year
        $('#end_month').html(fillHTML(1, 12, 'month'));
    }
    $('#end_month').val(month);

    // reset days
    let date = $('#end_day').val();  // store current date selected
    // last year and last month
    if ($('#end_year').val() == maxYear && months.indexOf($('#end_month').val()) == maxMonth-1) {
        $('#end_day').html(fillHTML(1, maxDay, 'day'));
        date = Math.min(date, maxDay);
    }
    else {
        let index = months.indexOf($('#end_month').val());
        reset('end', index);
        date = Math.min(date, lengths[index]);
    }
    $('#end_day').val(date);
});


$('#start_year').on('change', function () {
    // reset February length
    if (isLeapYear($('#start_year').val()))
        lengths[1] = 29;
    else 
        lengths[1] = 28;

    // reset months 
    let month = $('#start_month').val();  // save current month value
    // if year is last year
    if ($('#start_year').val() == maxYear) {
        let index = months.indexOf(month);
        $('#start_month').html(fillHTML(1, maxMonth, 'month'));
        index = Math.min(index, maxMonth - 1);   // -1 because indices are off by one
        month = months[index];
    } else {  // year is not last year
        $('#start_month').html(fillHTML(1, 12, 'month'));
    }
    $('#start_month').val(month);

    // reset days
    let date = $('#start_day').val();   // save current date 
    // last month of last year
    if ($('#start_year').val() == maxYear && months.indexOf($('#start_month').val()) == maxMonth-1) {
        $('#start_day').html(fillHTML(1, maxDay, 'day'));
        date = Math.min(date, maxDay);
    }
    else {  // regular month
        let index = months.indexOf($('#start_month').val());
        reset('start', index);
        date = Math.min(date, lengths[index]);
    }
    $('#start_day').val(date);

    // reset end year if it is prior to start year
    if ($('#end_year').val() < $('#start_year').val()) {
        $('#end_year').val($('#start_year').val());   // reset end year

        // check if need to reset month
        if ($('#start_year').val() == maxYear) {
            let index = months.indexOf($('#end_month').val());
            $('#end_month').html(fillHTML(1, maxMonth, 'month'));
            index = Math.min(index, maxMonth - 1);   // -1 because indices are off by one
            $('#end_month').val(months[index]);

            // check if need to reset day
            if (months.indexOf($('#end_month').val()) == maxMonth-1) {
                let date = $('#end_day').val();  // save current date selected
                $('#end_day').html(fillHTML(1, maxDay, 'day'));
                date = Math.min(date, maxDay);
                $('#end_day').val(date);
            }
        }
    }
});


// Toggles the max month and year between the daily and monthly file end 
// times when the daily/monthly toggle is changed
$('#monthly').on('change', function () {
    if (document.getElementById('monthly').checked) {
        maxMonth = maxMonth_m;
        maxYear = maxYear_m;
    } else {
        maxMonth = maxMonth_d;
        maxYear = maxYear_d;
    }
    // reset years
    let start = $('#start_year').val()
    let end = $('#end_year').val()
    $('#start_year').html(fillHTML(1990, maxYear, 'year'));
    $('#end_year').html(fillHTML(1990, maxYear, 'year'));
    start = Math.min(start, maxYear)
    end = Math.min(end, maxYear)
    $('#start_year').val(start)
    $('#end_year').val(end)

    // reset months if necessary
    start = months.indexOf($('#start_month').val())
    if ($('#start_year').val() == maxYear) {
        $('#start_month').html(fillHTML(1, maxMonth, 'month'));
        start = Math.min(start, maxMonth - 1)
    } else {
        $('#start_month').html(fillHTML(1, 12, 'month'));
    }
    $('#start_month').val(months[start])

    end = months.indexOf($('#end_month').val())
    if ($('#end_year').val() == maxYear) {    
        $('#end_month').html(fillHTML(1, maxMonth, 'month'));
        end = Math.min(end, maxMonth - 1)
    } else {
        $('#end_month').html(fillHTML(1, 12, 'month'));
    }
    $('#end_month').val(months[end])
})


// reference: https://en.wikipedia.org/wiki/Leap_year#/media/File:Leap_Year_Algorithm.png
function isLeapYear(year) {
    if (year % 4 != 0)
        return false;
    if (year % 100 != 0)
        return true;
    if (year % 400 != 0)
        return false;
    return true;
}


// Retrieves time values, returns start_date and end_date (type Date) 
// if start date is equal to or later than end date, and false otherwise
function validateRange() {
    var start_day, end_day;
    if (document.getElementById('monthly').checked) {  // monthly
        start_day = 1;
        end_day = 1;
    }
    else {      // daily
        start_day = document.getElementById('start_day').value;
        end_day = document.getElementById('end_day').value;
    }
    
    let start_month = document.getElementById('start_month').value;
    let start_year = document.getElementById('start_year').value;
    let end_month = document.getElementById('end_month').value;
    let end_year = document.getElementById('end_year').value;

    var start_date = new Date(start_year, months.indexOf(start_month), start_day)
    var end_date = new Date(end_year, months.indexOf(end_month), end_day)

    if (Date.parse(start_date) > Date.parse(end_date)) {
        return false;
    } 

    return [start_date, end_date];
}

var store = new Map();
var store_comment = new Map();

function calc_rating() {
    let qno = document.getElementById("qno").value;
    $star_rating.siblings('input.rating-value').val(store[qno]);
    return SetRatingStar();
}

function move_right() {
    let qno = document.getElementById("qno").value;
    qno = parseInt(qno);
    let rating = $star_rating.siblings('input.rating-value').val();
    document.getElementById("noti").hidden = true;
    //Modify Number Of questions Here
    let noOfQuestions = 5;
    store[qno] = rating;
    update();
    mystr = `<p style="font-size: 30px; text-align: center;"><b>Results:</b></p>`;
    mystr += `<table class="table table-light tabledimensions"><thead><tr><th scope="col">Qno</th><th scope="col">Given Rating</th><th scope="col">Comment: </th></tr></thead><tbody>`;

    if (qno == noOfQuestions) {
        document.getElementById("videos").hidden = true;
        document.getElementById("comment-box").hidden = true;
        document.getElementById("rate").hidden = true;
        document.getElementById("comment-save-button").hidden = true;
        document.getElementById("feedback-done").hidden = false;
        document.getElementById("curr-qno").innerHTML = "END";
        $('#items').empty();
        Object.keys(store).forEach(function(key) {
            if (store_comment[key] === undefined)
                store_comment[key] = "No Comments";
            if (store[key] == 0)
                store[key] = "Not Graded";
        });
        Object.keys(store).forEach(function(key) {
            mystr += `<tr>
      <th scope="row">${key}</th>
      <td>${store[key]}</td>
      <td>${store_comment[key]}</td>
      </tr>`;


        });
        mystr += `</tbody>
                </table>`;
        $('#items').append(mystr);
        document.getElementById("right").disabled = true;
        return;
    }
    qno = qno + 1;
    document.getElementById("curr-qno").innerHTML = qno;
    document.getElementById("qno").value = qno;
    let next = "videos/v";
    next += qno;
    next += ".mp4";
    document.getElementById("video").src = next;
    calc_rating();

}

function move_left() {

    let qno = document.getElementById("qno").value;
    qno = parseInt(qno);
    let rating = $star_rating.siblings('input.rating-value').val();
    document.getElementById("right").disabled = false;
    document.getElementById("videos").hidden = false;
    document.getElementById("comment-box").hidden = false;
    document.getElementById("rate").hidden = false;
    document.getElementById("comment-save-button").hidden = false;
    document.getElementById("noti").hidden = true;

    $('#items').empty();
    store[qno] = rating;
    update();
    if (qno == 1)
        return;
    if (document.getElementById("feedback-done").hidden == true) {
        qno = qno - 1;
    }
    document.getElementById("feedback-done").hidden = true;
    document.getElementById("curr-qno").innerHTML = qno;
    document.getElementById("qno").value = qno;
    let next = "videos/v";
    next += qno;
    next += ".mp4";
    document.getElementById("video").src = next;
    calc_rating();
}

function submitcomment() {
    let qno = document.getElementById("qno").value;
    qno = parseInt(qno);
    var comment = document.getElementById("comment").value;
    store_comment[qno] = comment;
    document.getElementById("comment").value = "";
    document.getElementById("noti").hidden = false;


}
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
    return $star_rating.each(function() {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
            return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
    });
};

$star_rating.on('click', function() {

    $star_rating.siblings('input.rating-value').val($(this).data('rating'));

    return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});

//Used for updating Radar Chart 
function update() {

    document.getElementById("container").innerHTML = "";
    var data1 = [];
    var value;

    Object.keys(store).forEach(function(key) {
        value = store[key];
        if (value == 1)
            data1.push({
                x: "Poor",
                value: 1
            });
        else if (value == 2)
            data1.push({
                x: "Average",
                value: 2
            });
        else if (value == 3)
            data1.push({
                x: "Good",
                value: 3
            });
        else if (value == 4)
            data1.push({
                x: "Very Good",
                value: 4
            });
        else
            data1.push({
                x: "Excellent",
                value: 5
            });
    });


    // create radar chart
    var chart = anychart.radar();
    // set chart yScale settings
    chart.yScale()
        .minimum(0)
        .maximum(100)
        .ticks({
            'interval': 5
        });

    // create first series
    chart.line(data1);
    chart.yGrid().palette(["gray 0.1", "gray 0.2"]);


    // set chart title
    chart.title("Radar Chart");


    // set container id for the chart
    chart.container('container');
    // initiate chart drawing
    chart.draw();

}

"use strict";
single_check_box_action();
multiple_check_box_acrion();
show_next_division();

function single_check_box_action(item) {
    var singles = document.getElementsByClassName("checkbox_single");
    for(var i=0; i<singles.length; i++){
        singles[i].checked = false;
    }
    item.checked = true;
}

function multiple_check_box_acrion() {
    
}

function show_next_division(item) {
    if(!item.classList.contains('disabled')){
        item.nextElementSibling.style.display = "block";
    }
}

function click_tag(item){
    console.log(item);
}

function timer(start_point){
    var timer_box = document.getElementById('timer');
    var disables = document.getElementsByName('disables');
    timer_box.parentElement.style.pointerEvents = 'none';
    var temp = setInterval(function() {
        start_point = parseInt(start_point, 10);
        var hours = Math.floor(start_point / (60 * 60));
        var minutes = Math.floor(start_point % (60 * 60) / 60);
        var seconds = Math.floor(start_point % 60);

        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0'+seconds : seconds;

        timer_box.style.color = start_point < 31 ? 'red' : 'inherit';
        timer_box.innerHTML = hours + ':' + minutes + ':' + seconds;

        if ( --start_point < 0){
            disables.forEach((item) => {
                item.classList.remove('disabled');
                item.classList.remove('stop_select');
            });
            clearInterval(temp);
        }
    }, 1000);    
}
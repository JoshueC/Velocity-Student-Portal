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

function getReadingContent(){
    let content = "New the her nor case that lady paid read. Invitation friendship travelling eat everything the out two. Shy you who scarcely expenses debating hastened resolved. Always polite moment on is warmth spirit it to hearts. Downs those still witty an balls so chief so. Moment an little remain no up lively no. Way brought may off our regular country towards adapted cheered. John draw real poor on call my from. May she mrs furnished discourse extremely. Ask doubt noisy shade guest did built her him. Ignorant repeated hastened it do. Consider bachelor he yourself expenses no. Her itself active giving for expect vulgar months. Discovery commanded fat mrs remaining son she principle middleton neglected. Be miss he in post sons held. No tried is defer do money scale rooms.";
    return content;
}

function timer(start_point, section=null){
    if (section === "reading"){
        var banner = document.getElementById('readingcontent-banner');
        banner.style.fontSize = "inherit";
        banner.style.textAlign = 'left';
        banner.classList.add("stop_select");
        banner.innerHTML = getReadingContent();
    }
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
            if (section === "reading") {
                banner.classList.remove("stop_select");
            }
            clearInterval(temp);
        }
    }, 1000);    
}
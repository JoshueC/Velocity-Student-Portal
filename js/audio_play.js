var audio_play = WaveSurfer.create({
    container: '#audio-play',
    waveColor: 'rgb(183, 193, 192)',
    progressColor: 'rgb(10, 85, 140)',
    barWidth: '2',  
    barHeight: '1',
    height: 60,
    maxCanvasWidth: 500,
    hideScrollbar: true
}); 

audio_play.load('../../js/repeat_sentence_sample.wav');


function seektimeupdate(){
    var nt = audio_play.getCurrentTime() * (100 / audio_play.getDuration());
    var curmins = Math.floor(audio_play.getCurrentTime() / 60);
    var cursecs = Math.floor(audio_play.getCurrentTime() - curmins * 60);
    var durmins = Math.floor(audio_play.getDuration() / 60);
    var dursecs = Math.floor(audio_play.getDuration() - durmins * 60);
    if(cursecs < 10){ cursecs = "0"+cursecs; }
    if(dursecs < 10){ dursecs = "0"+dursecs; }
    if(curmins < 10){ curmins = "0"+curmins; }
    if(durmins < 10){ durmins = "0"+durmins; }
    document.getElementById('tracktime').innerHTML = curmins+":"+cursecs+" / "+durmins+":"+dursecs;
}


$(document).ready(function() {
    
    audio_play.on('ready', function () {
        // document.getElementById('tracktime').innerHTML = Math.floor(audio_play.getCurrentTime()) + ' / ' + Math.floor(audio_play.getDuration());
        // console.log(audio_play.getDuration());
        seektimeupdate();
    });
    
    audio_play.on('audioprocess', function () {
        // document.getElementById('tracktime').innerHTML = Math.floor(audio_play.getCurrentTime()) + ' / ' + Math.floor(audio_play.getDuration());
        // console.log(audio_play.getDuration());
        seektimeupdate();
    });

    $("#play-button").click(function(){
        audio_play.playPause();
    });
    
    $("#step-backward-button").click(function(){
        audio_play.seekTo(0);
    });
});
    
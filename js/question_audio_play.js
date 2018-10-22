var question_audio_play = WaveSurfer.create({
    container: '#question-audio-play',
    waveColor: 'rgb(183, 193, 192)',
    progressColor: 'rgb(10, 85, 140)',
    barWidth: '2',  
    barHeight: '1',
    height: 60,
    maxCanvasWidth: 500,
    hideScrollbar: true
}); 

question_audio_play.load('../../js/repeat_sentence_sample.wav');

$(document).ready(function() {
    
    question_audio_play.on('ready', function () {
        // document.getElementById('tracktime').innerHTML = Math.floor(question_audio_play.getCurrentTime()) + ' / ' + Math.floor(question_audio_play.getDuration());
        // console.log(question_audio_play.getDuration());
        seektimeupdate(question_audio_play, 'question-tracktime');
    });
    
    question_audio_play.on('audioprocess', function () {
        // document.getElementById('tracktime').innerHTML = Math.floor(question_audio_play.getCurrentTime()) + ' / ' + Math.floor(question_audio_play.getDuration());
        // console.log(question_audio_play.getDuration());
        seektimeupdate(question_audio_play, 'question-tracktime');
    });

    $("#question-play-button").click(function(){
        question_audio_play.playPause();
    });
    
    $("#question-step-backward-button").click(function(){
        question_audio_play.seekTo(0);
    });
});
    
/**
**** Dependences: recorder.js (please load it before this script in html) ****

This is the js scriipt for recording users' audio input from browser.
For Using the code, you need to set a code block like this:

<div class="row is-table-row">
    <div id="record-play-button" class="col-xs-1"><a class="btn btn-app"><i class="fa fa-play"></i> Play</a></div>
    <div id="record-step-backward-button" class="col-xs-1"><a class="btn btn-app"><i class="fa fa-step-backward"></i> Play</a></div>
    <div id="record-audio-play" class="col-xs-8"></div>
    <div id="record-tracktime" class="col-xs-2" style="margin-top:20px"></div>
</div>

record-play-button: The play button
record-step-backward-button: The step backward button
record-audio-play: The area where the audio wave would be shown on the screen
record-tracktime: Showing "the current time" : "the duration" like 00:15 / 01:36

PS: you need to change the IDs of the <div>s' above to avoid confusion.

**/

var audio_context;
var recorder;
var record_audio_play;

function __log(e, data) {
    console.log("\n" + e + " " + (
    data || ''));
}

function startUserMedia(stream) {

    var input = audio_context.createMediaStreamSource(stream);
    __log('Media stream created.');

    recorder = new Recorder(input);
    __log('Recorder initialised.');
}

function startRecording(button) {

    // if this it it not the first time for recording.
    // we need to remove the previous one.
    // $('#record-audio-play wave').remove();

    recorder && recorder.record();
    button.disabled = true;
    $('#stop-button').prop('disabled', false);
    __log('Recording..dd.');
}

function stopRecording(button) {

    recorder && recorder.stop();
    button.disabled = true;
    $('#record-button').prop('disabled', false);
    __log('Stopped recording.');

    recorder && recorder.exportWAV(function(blob) {

        if (typeof record_audio_play !== 'object') {

            record_audio_play = new WaveSurfer.create({
                container: '#record-audio-play',
                waveColor: 'rgb(183, 193, 192)',
                progressColor: 'rgb(10, 85, 140)',
                barWidth: '2',
                barHeight: '1',
                height: 60,
                maxCanvasWidth: 500,
                hideScrollbar: true
            });
        }

        record_audio_play.loadBlob(blob);

        recorder.clear();


        if (typeof record_audio_play == 'object') {
            record_audio_play.on('ready', function() {
                seektimeupdate(record_audio_play, 'record-tracktime');
            });
            record_audio_play.on('audioprocess', function() {
                seektimeupdate(record_audio_play, 'record-tracktime');
            });
        }


    }); //exportWAV

}


$("#record-play-button").on("click", function() {
    record_audio_play.playPause();
});

$("#record-step-backward-button").click(function() {
    record_audio_play.seekTo(0);
});


window.onload = function init() {
    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
        __log('Audio context set up.');
        __log('navigator.getUserMedia ' + (
            navigator.getUserMedia
            ? 'available.'
            : 'not present!'));
    } catch (e) {
        alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({
        audio: true
    }, startUserMedia, function(e) {
        __log('No live audio input: ' + e);
    });

};

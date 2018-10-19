var audio_context;
var recorder;
function startUserMedia(stream) {
var input = audio_context.createMediaStreamSource(stream);

recorder = new Recorder(input);
}
function startRecording(button) {
recorder && recorder.record();
button.disabled = true;
button.nextElementSibling.disabled = false;
}
function stopRecording(button) {
recorder && recorder.stop();
button.disabled = true;
button.previousElementSibling.disabled = false;

recorder && recorder.exportWAV(function(blob) {
console.log(blob);
var wavesurfer = WaveSurfer.create({
container: '#audio-record',
waveColor: 'rgb(113, 114, 116)',
progressColor: 'rgb(244, 255, 0)',
// barWidth: 2
});

wavesurfer.loadBlob(blob);
recorder.clear();
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
  } catch (e) {
    alert('No web audio support in this browser!');
  }
  
  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
  console.log(e) );
    });
};
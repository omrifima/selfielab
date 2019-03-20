
var video = document.querySelector('#webcam');
var img = $("#capture");
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            document.querySelector('#webcam').srcObject = stream;
        })
        .catch(function (e) {
            console.log(e);
        });
}

const canvas = document.createElement('canvas');

function flash() {
    $('.flash-screen')
        .show()  //show the hidden div
        .animate({ opacity: 0.5 }, 700)
        .fadeOut(800)
        .css({ 'opacity': 1 });
}


function takePicture() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    img[0].src = canvas.toDataURL('image/webp');

    flash();
    $(".photo-screen").show();
    $(".webcam-screen").hide();
    setTimeout(function () {
        $(".photo-screen").hide();
        $(".webcam-screen").show();
    }, 5000
    )
}
$("#loader").click(function () {
    takePicture();

});


var final_transcript = '';
var recognizing = false;
var ignore_onend;
if (('webkitSpeechRecognition' in window)) {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
    };

    recognition.onerror = function (event) {

    };

    recognition.onend = function () {
    };

    recognition.onresult = function (event) {
        var interim_transcript = '';
   
        if (typeof (event.results) == 'undefined') {
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        if (interim_transcript.toLowerCase().includes("cheese")) {
takePicture();
        }

    };

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
        return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {
        return s.replace(first_char, function (m) { return m.toUpperCase(); });
    }

    final_transcript = '';
    recognition.lang = "en-US";
    recognition.start();
};



var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


var diagnosticPara = document.querySelector('.usrInput');

var testBtn = document.querySelector('.micbutton');

function genratespeechtotext() {
//   testBtn.disabled = true;
//   testBtn.textContent = 'Test in progress';

  diagnosticPara.textContent = '...diagnostic messages';

  var grammar = '#JSGF V1.0; grammar phrase;';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event)  {

    var speechResult = event.results[0][0].transcript.toLowerCase();
    console.log(speechResult);
    $(".usrInput").val(speechResult);
    // $(".usrInput").val() = speechResult;
    // diagnosticPara.textContent = speechResult; 

    // console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    // testBtn.disabled = false;
    // testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    // testBtn.disabled = false;
    // testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = event.error;
  }
  
}

testBtn.addEventListener('click', genratespeechtotext);

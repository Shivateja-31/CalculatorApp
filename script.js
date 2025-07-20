

function appendValue(value) {
    document.getElementById('display').value += value;
}
function clearDisplay() {
    document.getElementById('display').value = '';
}
function deleteLast() {
    let current = document.getElementById('display').value;
    document.getElementById('display').value = current.slice(0,-1);
}

function calculate() {
  let input = document.getElementById('display').value;

  // Convert "10% of 200" to "(10/100)*200"
  input = input.replace(/(\d+)% of (\d+)/g, "($1/100)*$2");

  // Convert plain "50%" to "(50/100)"
  input = input.replace(/(\d+)%/g, "($1/100)");

  try {
    const result = math.evaluate(input);
    document.getElementById('display').value = result;
  } catch (mathError) {
    try {
      const fallbackResult = eval(input);
      document.getElementById('display').value = fallbackResult;
    } catch (evalError) {
      document.getElementById('display').value = 'Invalid Input';
    }
  }
}
function startVoiceInput() {
    const recognition = new webkitSpeechRecognition () || new SpeechRecognition();
    recognition.lang = 'en-Us';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
  recognition.onresult = function(event) {
    const spoken = event.results[0][0].transcript;
    document.getElementById('display').value = spoken;
    calculate(); // optional auto-calc
  };

  recognition.onerror = function(event) {
    alert('Voice recognition error: ' + event.error);
  };

  recognition.start();
}
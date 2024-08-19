const btnEnc = document.getElementById("btn-action");
const btnDesc = document.getElementById("btn-back");
const textarea = document.getElementById("myTextarea");
const areaSecundaria = document.getElementById("secdBox");
const textResult = document.getElementById("txtResult");
const btnCopy = document.getElementById("contButt");

const substitutions = {
  e: "ender",
  i: "ines",
  a: "ai",
  o: "ober",
  u: "ufat",
};

const reverseSubstitutions = Object.fromEntries(
  Object.entries(substitutions).map(([key, value]) => [value, key])
);

function encryptText(text) {
  // Convert the text to an array of characters and map each character
  return text.split('').map(char => {
    // Handle both lower and uppercase characters
    const lowerChar = char.toLowerCase();
    const encrypted = substitutions[lowerChar] || lowerChar;

    // Preserve the original case
    return char === lowerChar ? encrypted : encrypted.charAt(0).toUpperCase() + encrypted.slice(1);
  }).join('');
}

function decryptText(text) {
  // Regular expression to match encrypted substrings
  const regExp = new RegExp(Object.keys(reverseSubstitutions).join('|'), 'gi');

  return text.replace(regExp, match => {
    return reverseSubstitutions[match.toLowerCase()];
  });
}

btnEnc.addEventListener("click", function () {
  const inputText = textarea.value;

  const encryptedText = encryptText(inputText);

  areaSecundaria.style.backgroundImage = "none";

  textResult.innerText = encryptedText;

  const btnCopy = document.createElement("button");
  btnCopy.textContent = "Copy";
  btnCopy.className = "btn-cp";

  const contBtn = document.getElementById("contButt");
  contBtn.appendChild(btnCopy);
});

btnDesc.addEventListener('click', () => {
  const inputText = textarea.value;
  const decryptedText = decryptText(inputText);
  textResult.innerText = decryptedText;

});

async function copiarTexto(texto) {
  try {
      await navigator.clipboard.writeText(texto);
      console.log('Texto copiado al portapapeles');
  } catch (err) {
      console.error('Error al copiar texto: ', err);
  }
};

// Copy Button Event Listener
btnCopy.addEventListener('click', () => {
  const encryptedText = textResult.value
  
  // Create a temporary textarea element for copying
  /* const tempTextarea = document.createElement('textarea');
  tempTextarea.value = encryptedText;
  document.body.appendChild(tempTextarea); */

  const text = encryptedText;
                copiarTexto(text);


  // Remove the temporary textarea
 // document.body.removeChild(tempTextarea);

  alert('Encrypted text copied to clipboard!');


});

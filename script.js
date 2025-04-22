function loadCipher(type) {
    let html = '';
    switch (type) {
      case 'caesar':
        html = generateCipherCard(
          'Caesar Cipher 🔁',
          `
          <label for="caesarText">Enter Text:</label>
          <textarea id="caesarText" placeholder="Type your message here..."></textarea>
  
          <label for="caesarShift">Shift Value:</label>
          <input type="number" id="caesarShift" placeholder="e.g., 3" />
  
          <div class="btn-group">
            <button onclick="encryptCaesar()">Encrypt 🔒</button>
            <button onclick="decryptCaesar()">Decrypt 🔓</button>
          </div>
  
          <div id="caesarResult" class="result-box"></div>
          `
        );
        break;
  
      case 'vigenere':
        html = generateCipherCard(
          'Vigenère Cipher 🔤',
          `
          <label for="vigenereText">Enter Text:</label>
          <textarea id="vigenereText" placeholder="Type your message here..."></textarea>
  
          <label for="vigenereKey">Key:</label>
          <input type="text" id="vigenereKey" placeholder="Enter keyword" />
  
          <div class="btn-group">
            <button onclick="encryptVigenere()">Encrypt 🔒</button>
            <button onclick="decryptVigenere()">Decrypt 🔓</button>
          </div>
  
          <div id="vigenereResult" class="result-box"></div>
          `
        );
        break;
  
      case 'railfence':
        html = generateCipherCard(
          'Rail Fence Cipher 🪜',
          `
          <label for="railText">Enter Text:</label>
          <textarea id="railText" placeholder="Type your message here..."></textarea>
  
          <label for="rails">Number of Rails:</label>
          <input type="number" id="rails" placeholder="e.g., 3" />
  
          <div class="btn-group">
            <button onclick="encryptRail()">Encrypt 🔒</button>
            <button onclick="decryptRail()">Decrypt 🔓</button>
          </div>
  
          <div id="railResult" class="result-box"></div>
          `
        );
        break;
    }
    document.getElementById('content').innerHTML = html;
  }
  
  function generateCipherCard(title, content) {
    return `
      <div class="cipher-card fade-in">
        <h2>${title}</h2>
        <div class="cipher-form">${content}</div>
      </div>
    `;
  }
  
  // Caesar Cipher
  function encryptCaesar() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      if (char >= 65 && char <= 90) {
        result += String.fromCharCode((char - 65 + shift) % 26 + 65);
      } else if (char >= 97 && char <= 122) {
        result += String.fromCharCode((char - 97 + shift) % 26 + 97);
      } else {
        result += text[i];
      }
    }
    document.getElementById('caesarResult').textContent = result;
  }
  
  function decryptCaesar() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      if (char >= 65 && char <= 90) {
        result += String.fromCharCode((char - 65 - shift + 26) % 26 + 65);
      } else if (char >= 97 && char <= 122) {
        result += String.fromCharCode((char - 97 - shift + 26) % 26 + 97);
      } else {
        result += text[i];
      }
    }
    document.getElementById('caesarResult').textContent = result;
  }
  
  // Vigenère Cipher
  function encryptVigenere() {
    const text = document.getElementById('vigenereText').value;
    const key = document.getElementById('vigenereKey').value;
    let result = '', j = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const isUpper = c >= 'A' && c <= 'Z';
      const isLower = c >= 'a' && c <= 'z';
      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const keyChar = key[j % key.length].toLowerCase().charCodeAt(0) - 97;
        result += String.fromCharCode((c.charCodeAt(0) - base + keyChar) % 26 + base);
        j++;
      } else {
        result += c;
      }
    }
    document.getElementById('vigenereResult').textContent = result;
  }
  
  function decryptVigenere() {
    const text = document.getElementById('vigenereText').value;
    const key = document.getElementById('vigenereKey').value;
    let result = '', j = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const isUpper = c >= 'A' && c <= 'Z';
      const isLower = c >= 'a' && c <= 'z';
      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const keyChar = key[j % key.length].toLowerCase().charCodeAt(0) - 97;
        result += String.fromCharCode((c.charCodeAt(0) - base - keyChar + 26) % 26 + base);
        j++;
      } else {
        result += c;
      }
    }
    document.getElementById('vigenereResult').textContent = result;
  }
  
  // Rail Fence Cipher
  function encryptRail() {
    const text = document.getElementById('railText').value;
    const rails = parseInt(document.getElementById('rails').value);
    if (rails <= 1) return (document.getElementById('railResult').textContent = text);
  
    let rail = Array.from({ length: rails }, () => []);
    let dirDown = false, row = 0;
  
    for (let char of text) {
      rail[row].push(char);
      if (row === 0 || row === rails - 1) dirDown = !dirDown;
      row += dirDown ? 1 : -1;
    }
  
    const result = rail.flat().join('');
    document.getElementById('railResult').textContent = result;
  }
  
  function decryptRail() {
    const text = document.getElementById('railText').value;
    const rails = parseInt(document.getElementById('rails').value);
    if (rails <= 1) return (document.getElementById('railResult').textContent = text);
  
    let len = text.length;
    let rail = Array.from({ length: rails }, () => Array(len).fill('\n'));
    let dirDown, row = 0, col = 0;
  
    for (let i = 0; i < len; i++) {
      if (row === 0) dirDown = true;
      if (row === rails - 1) dirDown = false;
      rail[row][col++] = '*';
      row += dirDown ? 1 : -1;
    }
  
    let index = 0;
    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < len; j++) {
        if (rail[i][j] === '*' && index < len) {
          rail[i][j] = text[index++];
        }
      }
    }
  
    let result = '';
    row = 0; col = 0;
    for (let i = 0; i < len; i++) {
      if (row === 0) dirDown = true;
      if (row === rails - 1) dirDown = false;
      result += rail[row][col++];
      row += dirDown ? 1 : -1;
    }
  
    document.getElementById('railResult').textContent = result;
  }
  
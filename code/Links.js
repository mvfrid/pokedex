// https://snack.expo.dev/@mvfrid/matildas-pokeapp

import React from 'react';

export default function Links() {
  
  return (
  <div class="container">
    <div class="links"> 
      <p>To open this app, you need to first download the app Expo Go.</p>
      <a class="fakeBtn" href="exp://exp.host/@mvfrid/matildas-pokeapp+zAAZ1c9o5m">Open Pokédex App</a>
      <a class="fakeBtn" href="https://expo.dev/client">Download Expo Go</a>
    </div>

    <div class="QR">
      <p>You can also scan this QR code to open it:</p>
      <img src="https://i.postimg.cc/gJsSmXzt/qr-code3.png" />
    </div>
  </div>
  );
}

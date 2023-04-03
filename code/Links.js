// https://snack.expo.dev/@mvfrid/matildas-pokeapp

import React from 'react';

export default function Links() {
  
  return (
  <div class="container">
    <div class="links"> 
      <p>To open this app, you need to first download the app Expo Go.</p>
      <a class="fakeBtn" href="exp://exp.host/@mvfrid/matildas-pokeapp+zAAZ1c9o5m">Open Pokédex App in Expo Go</a>
      <a class="fakeBtn" href="#">Download Expo Go</a>
    </div>

    <div class="QR">
      <p>You can also scan this QR code to open it:</p>
      <img src="./assets/qr_code.png" />
    </div>
  </div>
  );
}

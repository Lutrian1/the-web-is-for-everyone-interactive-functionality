// ----------------------------------------------- TEMPLATING -----------------------------------------------//

import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true})) // Formulierdata parsen

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

// ----------------------------------------------- HOMEPAGE  -----------------------------------------------//

app.get('/', async function (request, response) {

  const milledoniProducts = await fetch('https://fdnd-agency.directus.app/items/milledoni_products')
  const milledoniProductsJSON = await milledoniProducts.json()
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid' , {allMilledoniProducts: milledoniProductsJSON.data })
})

// ----------------------------------------------- SPECIFIEKE GIFT PAGE  -----------------------------------------------//

app.get('/gift/:id', async function (request, response) {

  const specificGiftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${request.params.id}`);

  const specificGiftResponseJSON = await specificGiftResponse.json();

  response.render('specificGift.liquid', { specificGift: specificGiftResponseJSON.data });
  
});

// ----------------------------------------------- SAVE GIFT CODE  -----------------------------------------------//

// Pseudo code POST-route voor de index-URL

  //haalt alle producten op
 
  //check of t product al bestaat
 
  //als het product bestaat verwijder hem
 
  //zo niet voeg hem toe
 
  //redirect naar homepage 

//Daadwerkelijke code:
app.post('/save-gift/:giftId', async function (request, response) {
  const giftId = request.params.giftId; // Haal de giftId uit de URL
  const userId = 6; // Hardcode mijn userId (id: 6)

  // Haal de gebruiker op uit Directus
  const userResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_users/${userId}`);
  const userData = await userResponse.json();

  // Haal de huidige saved_products op
  let savedProducts = userData.data.saved_products || [];

  // Voeg het geschenk toe als het nog niet is opgeslagen
  if (savedProducts.includes(giftId)) {
    savedProducts.push(giftId);
  }

  // Update de gebruiker in Directus met de nieuwe saved_products
  await fetch(`https://fdnd-agency.directus.app/items/milledoni_users/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      "data": {
        "update": [{"saved_products": [giftId] }]}
    }),
  });

  // Redirect naar de homepage
  response.redirect(303, '/');
});

// ----------------------------------------------- ZIEN VAN SAVED GIFTS -----------------------------------------------//

// VERANDER DIT: 
//app.get('/mysavedgifts', function (request, response) {
  //response.render('mygiftpage.liquid', { savedGifts: savedGifts });
//}); 

// ----------------------------------------------- REDIRECT EN 404 -----------------------------------------------//

// Redirect invalide path van :id gift naar home

app.get('/gift/{*splat}', function (request, response) {
  response.redirect('/');
});

// Redirect alle invalide paths naar 404
app.get('/{*splat}', function (request, response) {
  response.status(404).render('404.liquid');
}); 

// ----------------------------------------------- PORT -----------------------------------------------//

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {

  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
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
// Verander deze code naar de nieuwe dingen dat we hebben geleerd. 
let savedGifts = [];

// POST route om de gift op te slaan
app.post('/save-gift', express.urlencoded({ extended: true }), async function (request, response) { //express zet het ruwe http format (kan je zien in console van browser) om naar een prettig json object
    const giftId = request.body.giftId;

    // Fetch gift details van API met giftId
    const giftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${giftId}`);
    const giftData = await giftResponse.json();

    // voeg toe aan de 'savedGifts' array
    savedGifts.push(giftData.data);

    // Redirect naar homepage (Doe dit voor meerdere pages, voor nu alleen index)
    
    response.redirect('/');
});

// Route om de likes te laten zien
app.get('/mysavedgifts', function (request, response) {
    response.render('mygiftpage.liquid', { savedGifts: savedGifts });
});
// Pseudo code POST-route voor de index-URL

//haalt alle producten op
 
 //check of t product al bestaat
 
 //als het product bestaat verwijder hem
 
 //zo niet voeg hem toe
 
 //redirect naar homepage 

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
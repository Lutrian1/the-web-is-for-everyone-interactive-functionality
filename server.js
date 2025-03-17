import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.get('/', async function (request, response) {

  const milledoniProducts = await fetch('https://fdnd-agency.directus.app/items/milledoni_products')
  const milledoniProductsJSON = await milledoniProducts.json()
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid' , {allMilledoniProducts: milledoniProductsJSON.data })
})

app.get('/gift/:id', async function (request, response) {

  const specificGiftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${request.params.id}`);

  const specificGiftResponseJSON = await specificGiftResponse.json();

  response.render('specificGift.liquid', { specificGift: specificGiftResponseJSON.data });
  
});

let savedGifts = [];

// POST route om de gift op te slaan
app.post('/save-gift', express.urlencoded({ extended: true }), async function (request, response) { //express.urlencoded zet het ruwe http format (kan je zien in console van browser) om naar een prettig json object
    const giftId = request.body.giftId;

    //giftID, partial save button

    // Haal de data van de persoon op
    const giftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${giftId}`);
    const giftData = await giftResponse.json();

    // voeg toe aan de 'savedGifts' array
    savedGifts.push(giftData.data);

    // Redirect naar homepage (Doe dit voor meerdere pages, voor nu alleen index)
    
    response.redirect(303, '/');
});

//haalt alle producten op

//check of t product al bestaat

//als het product bestaat verwijder hem

//zo niet voeg hem toe

//redirect naar homepage 

// Route om de likes te laten zien
app.get('/mysavedgifts', function (request, response) {
    response.render('mygiftpage.liquid', { savedGifts: savedGifts });
});

// Redirect invalide path van :id gift naar home

app.get('/gift/{*splat}', function (request, response) {
  response.redirect('/');
});

// Redirect alle invalide paths naar 404
app.get('/{*splat}', function (request, response) {
  response.status(404).render('404.liquid');
}); 

/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {

  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})
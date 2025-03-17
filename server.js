// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

app.get('/', async function (request, response) {

  const milledoniData = await fetch('https://fdnd-agency.directus.app/items/milledoni_products') // Luuk: Pas dit aan naar een filter voor de homepage dus soorteren op saves bijv /)

  // En haal daarvan de JSON op
  const milledoniDataJSON = await milledoniData.json()
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid' , {allData: milledoniDataJSON.data })
   console.log(allData)  
})

app.get('/gift/:id', async function (request, response) {

  const specificGiftResponse = await fetch(`https://fdnd-agency.directus.app/items/milledoni_products/${request.params.id}`);

  const specificGiftResponseJSON = await specificGiftResponse.json();

  response.render('specificGift.liquid', { specificGift: specificGiftResponseJSON.data });
  
});

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

// Redirect invalide path van :id gift naar home

app.get('/gift/{*splat}', function (request, response) {
  response.redirect('/');
});

// Redirect alle invalide paths naar 404
app.get('/{*splat}', function (request, response) {
  response.status(404).render('404.liquid');
}); 

console.log('Pages Loaded')

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


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

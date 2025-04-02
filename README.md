# Milledoni

## Inleiding
Milledoni heeft sinds kort het design van hun site aangepast. De site was, in hun woorden, 'verouderd' en had vernieuwing nodig. Milledoni is een site die bedoeld is om mensen te helpen bij het uitzoeken van een cadeau, of het nu zelfgemaakt of gekocht is. Het maakt gebruik van een AI-chatbot die je vragen stelt, zodat hij je helpt bij het vinden van een perfect cadeau. Alle resultaten die je aan de AI vraagt, worden rechts getoond.
### Doel
Het doel van deze review is om feedback te krijgen op het werk dat is gemaakt en de opdrachtgever op de hoogte te houden van het werk.
## Beschrijving
Voor school is het de bedoeling om te leren werken met Node.js, en voornamelijk te werken met app.get en app.post. Wij krijgen data uit Directus die we in ons werk tonen. Een van de belangrijkste dingen waar ik aan heb gewerkt, is het maken van een 'opslaan'-knop, die data opslaat en toont in een andere tab. Daarnaast vroeg de opdrachtgever ons om ook een mobiel design te maken, waaraan ik een idee heb gebouwd.

## Uitwerking

### Mobile Design.

Omdat ik het nieuwe design van Milledoni al een goed design vond, heb ik niet de kleuren of opbouw van kaartjes veranderd. Ik heb alleen gewerkt aan hoe je op een telefoonscherm resultaten kunt tonen terwijl je typt naar de chatbot. Dit was namelijk een design challenge.

![Results 45](https://github.com/user-attachments/assets/d5ce3b68-2c0e-4506-9c80-f8b5ce389b02)

Ik koos ervoor om de resultaten die je naar de chatbot stuurt rechts te tonen, zodat je kunt volgen wat je vragen waren. In de box kun je scrollen om verder terug te gaan. De items worden boven de chatbox getoond, dit kunnen er maximaal drie zijn. Het belangrijkste is dat de home- en andere knoppen worden verwijderd. Deze zijn namelijk niet nodig als je aan het typen bent. Zodra je de chatbox sluit om de resultaten te tonen, komen deze knoppen terug.

### Homepage

Ik heb voornamelijk gewerkt aan de styling van de homepage en een save-knop die ik in 'Kenmerken' laat zien. Mijn homepage ziet er nu zo uit:

#### Save-Button

Momenteel is het belangrijkste in mijn site de 'save-button'. Deze knop kan cadeaus opslaan en deze tonen op de 'jouw cadeaus'-pagina. Dit is hoe het werkt:

https://github.com/user-attachments/assets/e12574eb-44e8-441e-8fc8-81cf8387dc58

In [Server-Side-Rendering](https://github.com/Lutrian1/server-side-rendering-server-side-website?tab=readme-ov-file#save-button) was dit enkel nog lokaal werkend en kon dit niet worden opgeslagen in de database. In deze sprint heb ik ervoor gezorgd dat deze werkt in de database in 'Kenmerken' Laat ik zien hoe ik dit heb gedaan. Daarnaast is hieraan ook een 'Loading-State' aan toegevoegd, ook hier vertel ik meer over in 'Kenmerken'

#### Light House Test

<img width="1061" alt="image" src="https://github.com/user-attachments/assets/fbcceccf-42b2-4572-a85f-b6aed45ddb64" />

## Kenmerken

### Liquid 

#### For Loop

In de for-loop wordt voor elke data uit Directus een artikel gemaakt met daarin specifieke dingen uit Directus. Dingen zoals de cadeaunaam of afbeelding kun je dan met een servercode meegeven in de for-loop.

https://github.com/Lutrian1/the-web-is-for-everyone-interactive-functionality/blob/dd934385735147b8882772e70b775cc181fcab5f/views/index.liquid#L34-L60

De {{ gift.Image }} in de img src="" toont dus de afbeelding van Directus voor dat item. Hierdoor is elke data dynamisch.

<img width="1217" alt="image" src="https://github.com/user-attachments/assets/aa24dbc7-403c-4114-89a2-4a90344cf7af" />

Hierin bevind zich ook een 'if' statement. Deze lijnen code zorgen ervoor dat de bookmark kan veranderen van een '+' naar een '-', als een cadeau al is gesaved zal hij tonen als een '-', in mijn server code zorg ik ervoor dat stel hij is een '-', dat hij dan ipv een POST, een DELETE plaatst in de database om het bijbehorende item te verwijderen:

https://github.com/Lutrian1/the-web-is-for-everyone-interactive-functionality/blob/df2e325248feabbacc68895dc132bfd5b71c9f6c/server.js#L71-L104

### Specifieke gift page

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/3610cfdfb0eb07aa231b6cdf48787bc3221ecf56/views/index.liquid#L49

In mijn html creeër ik een pagina voor elke specifieke gift.

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/26703c537048c3e73c18ae93ff8a6eb11479e43e/server.js#L51-L59

Nadat je hebt geklikt op een cadeau, fetched hij data uit Directus van dat specifieke cadeau en post dit in de HTML. De belangrijkste regel is de request.params.id. Dit zorgt ervoor dat de data dynamisch is, en ik voor elk cadeau dus een andere inhoud op de pagina heb.

### Save Button

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/3610cfdfb0eb07aa231b6cdf48787bc3221ecf56/views/index.liquid#L51-L58

In het kort geeft dit data mee aan een pagina die niet bestaat. Ik gebruik hiervoor een form met de action /save-gift. Het post het dus naar een link waar je niet naartoe kunt. Ik haal data uit deze link en toon het op een pagina waar je wel naartoe kunt navigeren:

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/26703c537048c3e73c18ae93ff8a6eb11479e43e/server.js#L61-L82

In regel 61 maak ik een lege array die wordt gevuld met data uit de save-knop. Deze array wordt meegegeven met een app.get naar de /mysavedgift (mygiftpage.liquid) in regel 61 tot 82.

Om het specifieke cadeau toe te voegen, gebruik ik de GiftId variabele. De specifieke cadeaus worden uiteindelijk gepushed naar de saveGifts, en daarna geredirect naar de homepage.

### Reroute en 404.

https://github.com/user-attachments/assets/553cfdf9-83e4-4daf-89b8-136db5a0a9a8

#### Reroute: 

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/3610cfdfb0eb07aa231b6cdf48787bc3221ecf56/server.js#L86-L88

Hierin word je teruggestuurd naar de lege pagina als je een verkeerde cadeau-ID invoert.

#### 404:

https://github.com/Lutrian1/server-side-rendering-server-side-website/blob/3610cfdfb0eb07aa231b6cdf48787bc3221ecf56/server.js#L91-L93

Als je een niet-bestaande route invoert, toont hij een 404-pagina. Ik render een 404-pagina met specifieke styling. Het belangrijkste is de response.status(404), zodat de browser weet dat dit een 404 is.

#### Het gebruik van {*splat}

In Express 4 kon je gebruik maken van het '*'. Dit betekent eigenlijk alles. Dus alles wat verkeerd wordt ingevoerd na een route (bijvoorbeeld: /oigwogee), wordt getoond als 404. In Express 5 wordt gebruik gemaakt van de *splat. Ik weet niet wat dit inhoudt, maar dit is nodig om dezelfde werking te behouden. Zie documentatie van Express.js: https://expressjs.com/en/guide/migrating-5.html#path-syntax

### Vragen

Veel staat in het Engels, maar de namen en dynamische data zijn allemaal in het Nederlands. Kan dit worden aangepast?

Welke pagina gaat naar wat?










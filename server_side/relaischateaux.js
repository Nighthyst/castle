const puppeteer = require('puppeteer');
var stringSimilarity = require('string-similarity');

const special = require('./web');
const resto = require('./michelin');
const property = require('./castle');



(async () => {
  //const browser = await puppeteer.launch({headless: false});
  //const page = await browser.newPage();

  var star_restaurants = await resto.getRestaurants();
  console.log(star_restaurants);


  var ranking = await property.getProperties();
  console.log(ranking);
  /*
  ranking[i]["resto"].forEach(function(element){

    var matches = stringSimilarity.findBestMatch(element,star_restaurants);
    if(matches.bestMatch.rating >= 0.75)
    {
      ranking[i]["stars_resto"].push("Yes");
    }
    else
    {
      ranking[i]["stars_resto"].push("No");
    }

  });
  */

  //console.log(ranking);

  //console.log(ranking);








  //console.log(ranking);
  //await page.waitFor(90000);
  //browser.close();
})();

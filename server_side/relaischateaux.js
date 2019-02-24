const puppeteer = require('puppeteer');
var stringSimilarity = require('string-similarity');

const special = require('./web');
const resto = require('./michelin');
const property = require('./castle');
const fs = require('fs');


(async () => {
  //const browser = await puppeteer.launch({headless: false});
  //const page = await browser.newPage();
  /*
  var star_restaurants = await resto.getRestaurants();
  console.log(star_restaurants);
  fs.writeFile("star_restaurants.json", JSON.stringify(star_restaurants), function(err) {
   if(err)
   {
       return console.log(err);
   }
   console.log("star_restaurants.json was saved!");
  });
  */
  var ranking = await property.getProperties();
  console.log(ranking);

  fs.writeFile("ranking.json", JSON.stringify(ranking), function(err) {
   if(err)
   {
       return console.log(err);
   }
   console.log("ranking.json was saved!");
  });
  console.log("Fin de la partie reloue");


  console.log("\n *STARTING* \n");

  //If we directly read in the JSON files

  // Get content from file
  //var contents = fs.readFileSync("ranking.json");
  // Define to JSON type
  //var ranking = JSON.parse(contents);

  var contents = fs.readFileSync("star_restaurants.json");
  // Define to JSON type
  var star_restaurants = JSON.parse(contents);

  for(var i = 0; i < ranking.length; i++)
  {
    ranking[i]["resto"].forEach(function(element){
      var test = element.indexOf("(");
      if(test != -1)
      {
        element = element.slice(0,test);
      }
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
  }

  ranking = JSON.stringify(ranking);
  fs.writeFile("results.json", ranking, function(err) {
   if(err)
   {
       return console.log(err);
   }
   console.log("results.json was saved!");
  });




  console.log(ranking);
  console.log("Fin du programme");
  //console.log(ranking);








  //console.log(ranking);
  //await page.waitFor(90000);
  //browser.close();
})();

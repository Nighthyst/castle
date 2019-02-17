const puppeteer = require('puppeteer');
var stringSimilarity = require('string-similarity');

const special = require('./web');
const resto = require('./michelin');
const property = require('./castle');

var ranking = [];

special.test();

(async () => {
  //const browser = await puppeteer.launch({headless: false});
  //const page = await browser.newPage();

  //var star_restaurants = await resto.getRestaurants(browser);
  //console.log(star_restaurants);


  ranking = await property.getProperties();

  console.log(ranking);


  //console.log(ranking);

  //console.log(ranking);
  /*
  const nbPages = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.innerText);
}, '#destPagination > ul > li> a');
  console.log(nbPages);
  console.log(Number(nbPages[nbPages.length-2]));
  console.log("Ici commence la boucle");

  for(var i = 2; i <= Number(nbPages[nbPages.length-2]); i++)
  {

    await page.$eval("#destPagination > ul > li.next > a", e => e.click());
    await page.waitFor(25000);
    console.log("Et un hop un tour !");

    await page.screenshot({ path: 'form.png', clip: {x: 0, y:0, width: 1024, height: 800}});

    const typeResa = await page.evaluate((selector) => {

    const anchors_node_list = document.querySelectorAll(selector);

    const anchors = [...anchors_node_list];
    return anchors.map(link => link.innerText);
  }, '#destinationResults > div > div > div:nth-child(1) > div > div > div > div.slick-slide.slick-active > div > span');

  var dispo = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.textContent);
  }, '#destinationResults > div > div > div:nth-child(2) > div.priceTag > a');

  const anchors = [...anchors_node_list];
  console.log(anchors);
  return anchors.map(link => link.href);
  }, '#destinationResults > div > div > div:nth-child(2) > h3 > a');
    console.log(links);
    console.log(dispo);
    for(var j = 0; j < links.length; j++)
    {
      if((dispo[j] === "Réserver") && (typeResa[j] === "Hôtel + Restaurant"))
      {
        ranking.push({"dispo" : dispo[j], "url" : links[j], "price" : -1, "resto" : [], "stars_resto" : []});
      }
    }


  }
  */
  //console.log(ranking);
  //await page.waitFor(90000);
  //browser.close();
})();

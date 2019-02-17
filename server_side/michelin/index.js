const puppeteer = require('puppeteer');
const special = require('../web');

async function getRestaurants()
{
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  var start_page = await special.web_href_link(browser,'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-1','#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > div > div.item-list-first > div > ul > li.mr-pager-item.active.first > span');
  console.log(start_page)
  var end_page = await special.web_href_link(browser,'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-1','#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > div > div.item-list-first > div > ul > li:nth-child(13) > a');
  console.log(end_page)

  var star_restaurants = await special.web_href_link(browser,'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-1','#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > ul > li > div > a > div.poi_card-details > div.poi_card-description > div.poi_card-display-title');

  for(var i = Number(start_page[0])+1; i <= Number(end_page[0]); i++)
  {
    star_restaurants = star_restaurants.concat(await special.web_href_link(browser,'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-' + i,'#panels-content-main-leftwrapper > div.panel-panel.panels-content-main-left > div > div > ul > li > div > a > div.poi_card-details > div.poi_card-description > div.poi_card-display-title'));
  }
  await page.close();
  return star_restaurants;
}


module.exports = {getRestaurants};

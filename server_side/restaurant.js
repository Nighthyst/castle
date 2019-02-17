
const puppeteer = require('puppeteer');
//selector = "div.hotelQuickView:nth-child(4) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(2) > a:nth-child(1)";

/*
The purpose of this function is to extract the content of the href attribute of a "a" tag.
*/
async function web_content_link(browser,url,selector)
{
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'networkidle2'});

  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  console.log(anchors);
  return anchors.map(link => link.href);
}, selector);

  return result;
};

async function web_href_link(browser,url,selector)
{
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'networkidle2'});

  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.innerText);
}, selector);

  return result;
};
async function web_content_meta(browser,url,selector)
{
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'networkidle2'});

  const result = await page.evaluate((selector) => {
    const anchors_node_list = document.querySelectorAll(selector);
    const anchors = [...anchors_node_list];
    return anchors.map(elem => {
            const attrObj = {};
            elem.getAttributeNames().forEach(name => {
              attrObj[name] = elem.getAttribute(name);
            })
            return attrObj.content;
          })
}, selector);

  return result;
};

(async () => {
  const browser = await puppeteer.launch();

  vrac = await web_content_link(browser,'https://www.relaischateaux.com/fr/site-map/etablissements','#countryF > ul > li > a:nth-child(1)');
  console.log("Taille du tableau cue_card_links :");
  console.log(vrac.length);
  cue_card_links = [];
  for(var i = 1; i < 5; i++)
  {
    var is_hotel = await web_href_link(browser,vrac[i],'body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li.active > a > span');
    var is_restaurant = await web_href_link(browser,vrac[i],'body > div.jsSecondNav.will-stick > ul > li:nth-child(2) > a > span');

    if((is_hotel[0] === 'Hôtel') && (is_restaurant[0] === 'Restaurant'))
    {
      cue_card_links.push(vrac[i]);
    }
  }
  var max = cue_card_links.length;

  proprio_numero = [];
  for(i = 0; i < max; i++)
  {
  //We visit each website
  //console.log(cue_card_links[i]);
  var link_resto = await web_content_link(browser,cue_card_links[i],'body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li:nth-child(2) > a');
  console.log(link_resto);
  var restaurants_name = await web_href_link(browser,link_resto[0],'body > div.jsSecondNav.will-stick > ul.jsSecondNavSub.active > li > a');
  //console.log(restaurants_name.length);
  if(restaurants_name.length === 0)
  {
    //console.log("Oups !");
    var restaurants_name = await web_href_link(browser,link_resto[0],'div > div.row.hotelTabsHeader > div:nth-child(1) > div.hotelTabsHeaderTitle > h3');
  }
  else
  {

  }

  proprio_numero.push([cue_card_links[i],restaurants_name]);
  /*
  var numero = await web_content_meta(browser,cue_card_links[i],'#tabProperty > div:nth-child(5) > div.row.propertyDesc > div.col-2-3 > div > div.col-1-2.propertyInfo > div.propertyInfo__ratings > meta:nth-child(3)');
  proprio_numero.push([cue_card_links[i],numero]);
  */
}
for(i = 0; i < max; i++)
{
  console.log(proprio_numero[i]);
}
console.log("Fin du prgm");


/*
const page2 = await browser.newPage();
await page2.goto('https://restaurant.michelin.fr/restaurants-etoiles-france/',{waitUntil: 'networkidle2'});

//await page.waitForSelector('a[href*="https://www.relaischateaux.com/fr"]');
const star_resto = await page2.evaluate((selector) => {

const anchors_node_list = document.querySelectorAll(selector);

const anchors = [...anchors_node_list];
console.log(typeof(anchors));
console.log("Taille du tableau anchors :");
console.log(anchors.length);
return anchors.map(link => link.href);
}, 'body > div.l-page > div > div.l-main > div > div.panel-flexible.panels-flexible-51.clearfix > div > div > div > div.panel-pane.pane-block.pane-bean-links-etoiles-directory > div > div > div > div.field.field--name-field-links.field--type-link-field.field--label-hidden > div > div > a');
//console.log("Le nombre de page est " + nombreDePage);

console.log("Taille du tableau des restos :");
console.log(star_resto.length);

for(i = 0; i < star_resto.length; i++)
{
  //We visit each website
  console.log(star_resto[i]);


}
*/
})();

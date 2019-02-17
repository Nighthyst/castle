
/*
Bon code pour scrapper sur relaischateaux:
https://medium.com/the-z/having-fun-with-puppeteer-js-5a744babaf0a


*/
const puppeteer = require('puppeteer');
//selector = "div.hotelQuickView:nth-child(4) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(2) > a:nth-child(1)";
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.relaischateaux.com/fr/destinations/europe/france',{waitUntil: 'networkidle2'});

  //await page.waitForSelector('a[href*="https://www.relaischateaux.com/fr"]');
  const cue_card_links = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  console.log(typeof(anchors));
  console.log("Taille du tableau anchors :");
  console.log(anchors.length);
  return anchors.map(link => link.href);

}, '#destinationResults > div > div > div:nth-child(2) > h3 > a');

console.log("Taille du tableau cue_card_links :");
console.log(cue_card_links.length);
console.log(cue_card_links[0]);
  //const myNodeList = await page.evaluate(() => document.querySelectorAll('#destinationResults > div > div > div > h3 > a'));
  //console.log(myNodeList);
  //console.log(textContent['0']);
  /*
  var i;
  for (i = 0; i < textContent.length; i++) {
    console.log(i);
    console.log(x[i].innerHTML);
  }
  */
  browser.close();
})();
//div.hotelQuickView:nth-child(3) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(2) > a
//div.hotelQuickView:nth-child(4) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(2) > a:nth-child(1)
/*
const rp = require('request-promise');
const fs = require('fs');
const url = 'https://www.relaischateaux.com/fr/destinations/europe/france';

rp(url)
  .then(function(html){
    //success!
    console.log(html);
    fs.appendFile('pageWeb.html', html, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
  })
  .catch(function(err){
    //handle error
  });
*/

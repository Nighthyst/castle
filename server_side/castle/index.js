const puppeteer = require('puppeteer');
const special = require('../web');

var debut = '02/03/2019';
var fin = '03/03/2019';

async function getProperties()
{

  var ranking = [];
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.relaischateaux.com/fr/destinations/europe/espagne', {waitUntil: 'networkidle2',timeout:0});   await page.waitForSelector('#rc_destination_availability_type_start');


  //type the name
  await page.focus('#rc_destination_availability_type_start');
  await page.click('#rc_destination_availability_type_start');
  await page.keyboard.type(debut);

  //type the email
  await page.focus('#rc_destination_availability_type_end');
  await page.click('#rc_destination_availability_type_end');
  await page.keyboard.type(fin);

  //type the message

  await page.focus('#rc_destination_availability_type_areaSelectBoxItText');
  await page.click('#rc_destination_availability_type_areaSelectBoxItText');
  await page.keyboard.type("France");

  await page.keyboard.type('\n');

  page.focus('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  page.click('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  await page.waitFor(5000);
  //await page.waitForNavigation({waitUntil: 'load'});

  page.click('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  await page.waitFor(5000);

  const nbPages = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.innerText);
  }, '#destPagination > ul > li> a');
  console.log(nbPages);
  console.log(Number(nbPages[nbPages.length-2]));
  //console.log("Here the loop start");

  for(var i = 1; i <= Number(nbPages[nbPages.length-2]); i++)
  {
    console.log("Le nombre de page à parcourir est :");
    console.log(Number(nbPages[nbPages.length-2]));
    const typeResa = await special.eval_web_href_link(page,'#destinationResults > div > div > div:nth-child(1) > div > div > div > div.slick-slide.slick-active > div > span');
    //console.log(typeResa);
    var dispo = await page.evaluate((selector) => {

    const anchors_node_list = document.querySelectorAll(selector);

    const anchors = [...anchors_node_list];
    return anchors.map(link => link.textContent);
    }, '#destinationResults > div > div > div:nth-child(2) > div.priceTag > a');

    var links = await special.eval_web_content_link(page,'#destinationResults > div > div > div:nth-child(2) > h3 > a');
    console.log(links);

    for(var j = 0; j < links.length; j++)
    {
      if((dispo[j] === "Réserver")  && (typeResa[j] === "Hôtel + Restaurant"))
      {
        ranking.push({"dispo" : dispo[j], "url" : links[j], "grade" : -1, "price" : -1, "resto" : [], "stars_resto" : []});
      }
    }
    for(var j = 0; j < ranking.length; j++)
    {
      var second_page = await browser.newPage();
      second_page.goto(ranking[j]["url"],{waitUntil: 'networkidle2',timeout:0});
      var restaurants_name = "";

      //We visit each website
      //await page.waitForNavigation({waitUntil: 'load'});

      await second_page.waitForSelector("#popinTripAdvisor > div.rc-popinQualitelis-header > span > div", {timeout: 0});
      await second_page.waitFor(500);

      var grade = await second_page.evaluate(() => document.querySelector("#popinTripAdvisor > div.rc-popinQualitelis-header > span > div"));

      console.log(grade);
      var price = await special.eval_web_href_link(second_page,"body > div.hotelHeader > div.innerHotelHeader > div > div > span.price");
      var link_resto = await special.eval_web_content_link(second_page,'body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li:nth-child(2) > a');
      console.log("Le lien du resto:");
      console.log(link_resto);
      var restaurants_name = await special.web_href_link(browser,link_resto[0],'body > div.jsSecondNav.will-stick > ul.jsSecondNavSub.active > li > a');

      if(restaurants_name.length === 0)
      {
        restaurants_name = await special.eval_web_href_link(second_page,'div > div.row.hotelTabsHeader > div:nth-child(1) > div.hotelTabsHeaderTitle > h3');
      }
      ranking[j]["resto"] = restaurants_name;
      console.log(ranking[j]["resto"]);
      //ranking[i]["grade"] = grade[Object.keys(grade)[0]]["reviewrate"];
      ranking[j]["price"] = price;
      console.log(ranking[j]["price"]);
      if(grade[Object.keys(grade)[0]] === undefined)
      {
        ranking[j]["grade"] = -1;
      }
      else {
        ranking[j]["grade"] = grade[Object.keys(grade)[0]]["reviewrate"];
      }
      await second_page.close();


      }

      await page.$eval("#destPagination > ul > li.next > a", e => e.click());
      await page.waitFor(500);

      await page.waitForSelector("#destPagination > ul > li.next > a", {timeout: 0});
      await page.waitFor(500);
      await page.$eval("#destPagination > ul > li.next > a", e => e.click());
      await page.waitFor(500);
      console.log("Et un hop un tour !");

    }
  return ranking;
}

module.exports = {getProperties};

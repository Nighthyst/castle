const puppeteer = require('puppeteer');
const special = require('../web');

async function getProperties()
{

  var ranking = [];
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.relaischateaux.com/fr/destinations/europe/espagne', {waitUntil: 'networkidle2',timeout:0});   await page.waitForSelector('#rc_destination_availability_type_start');

  await page.screenshot({ path: 'form2.png', fullPage: true });
  //type the name
  await page.focus('#rc_destination_availability_type_start');
  await page.click('#rc_destination_availability_type_start');
  await page.keyboard.type('25/02/2019');

  //type the email
  await page.focus('#rc_destination_availability_type_end');
  await page.click('#rc_destination_availability_type_end');
  await page.keyboard.type('28/02/2019');

  //type the message

  await page.focus('#rc_destination_availability_type_areaSelectBoxItText');
  await page.click('#rc_destination_availability_type_areaSelectBoxItText');
  await page.keyboard.type("France");

  await page.keyboard.type('\n');

  page.focus('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  page.click('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  await page.waitFor(5000);
  page.click('#destinationResults > div.fastTrack.destDatePicker > form > div.formFieldset.ftrackGo > button');
  await page.waitFor(30000);


  await page.screenshot({ path: 'form.png', clip: {x: 0, y:0, width: 1024, height: 800}});

  const typeResa = await special.eval_web_href_link(page,'#destinationResults > div > div > div:nth-child(1) > div > div > div > div.slick-slide.slick-active > div > span');
  console.log(typeResa);

  var dispo = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.textContent);
  }, '#destinationResults > div > div > div:nth-child(2) > div.priceTag > a');
  console.log(dispo);


  var prices = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.textContent);
  }, '#destinationResults > div > div > div:nth-child(2) > div.priceTag > div > span.price > span.price');
  console.log(prices);
  var links = await special.eval_web_content_link(page,'#destinationResults > div > div > div:nth-child(2) > h3 > a');

  console.log(links);
  console.log(dispo);
  for(var i = 0; i < links.length; i++)
  {
    if((dispo[i] === "Réserver")  && (typeResa[i] === "Hôtel + Restaurant"))
    {
      ranking.push({"dispo" : dispo[i], "url" : links[i], "grade" : -1, "price" : -1, "resto" : [], "stars_resto" : []});
    }
  }
  for(var i = 0; i < ranking.length; i++)
  {
    page.goto(ranking[i]["url"]);
    var restaurants_name = "";

    //We visit each website
    await page.waitForSelector("#popinTripAdvisor > div.rc-popinQualitelis-header > span > div", {timeout: 0});
    await page.waitFor(5000);
    var grade = await page.evaluate(() => document.querySelector("#popinTripAdvisor > div.rc-popinQualitelis-header > span > div"));

    console.log(grade);
    var price = await special.eval_web_href_link(page,"body > div.hotelHeader > div.innerHotelHeader > div > div > span.price");
    var link_resto = await special.eval_web_content_link(page,'body > div.jsSecondNav.will-stick > ul.jsSecondNavMain > li:nth-child(2) > a');
    console.log(link_resto);
    var restaurants_name = await special.web_href_link(browser,link_resto[0],'body > div.jsSecondNav.will-stick > ul.jsSecondNavSub.active > li > a');

    if(restaurants_name.length === 0)
    {
      restaurants_name = await special.eval_web_href_link(page,'div > div.row.hotelTabsHeader > div:nth-child(1) > div.hotelTabsHeaderTitle > h3');
    }
    ranking[i]["resto"] = restaurants_name;
    //ranking[i]["grade"] = grade[Object.keys(grade)[0]]["reviewrate"];
    ranking[i]["price"] = price;
    if(grade[Object.keys(grade)[0]] === undefined)
    {
      ranking[i]["grade"] = -1;
    }
    else {
      ranking[i]["grade"] = grade[Object.keys(grade)[0]]["reviewrate"];
    }
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
  }
  return ranking;
}

module.exports = {getProperties};

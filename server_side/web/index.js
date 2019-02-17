const puppeteer = require('puppeteer');


/*
This function's purpose is to get the link in the attribute href of a <a> tag.
The difference between this one and the function of similar name but starting with
eval_ is that this one will open a new page in the browser.

browser -> currently running browser
url -> url of the webpage where the link can be found
selector -> CSS selector to access the link
*/
async function web_content_link(browser,url,selector)
{
  const page = await browser.newPage();
  //Doing something else
  await page.goto(url,{waitUntil: 'networkidle2', timeout:0});

  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  console.log(anchors);
  return anchors.map(link => link.href);
}, selector);
  await page.close();
  return result;
};

/*
This function's purpose is to get the link in the attribute href of a <a> tag.
This function doesn't open a new page.

browser -> currently running browser
url -> url of the webpage where the link can be found
selector -> CSS selector to access the link
*/
async function eval_web_content_link(page,selector)
{
  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  console.log(anchors);
  return anchors.map(link => link.href);
}, selector);

  return result;
};

/*
This function's purpose is to get the TEXT in <a>TEXT</a> tags.
This function open a new page.

browser -> currently running browser
url -> url of the webpage where the link can be found
selector -> CSS selector to access the link
*/
async function web_href_link(browser,url,selector)
{
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'networkidle2',timeout:0});

  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.innerText);
}, selector);
  await page.close();
  return result;
};

/*
This function's purpose is to get the TEXT in <a>TEXT</a> tags.
This function doesn't open a new page.

browser -> currently running browser
url -> url of the webpage where the link can be found
selector -> CSS selector to access the link
*/
async function eval_web_href_link(page,selector)
{

  const result = await page.evaluate((selector) => {

  const anchors_node_list = document.querySelectorAll(selector);

  const anchors = [...anchors_node_list];
  return anchors.map(link => link.innerText);
}, selector);

  return result;
};


function test()
{
  console.log("Hello");
}

module.exports = {eval_web_content_link,eval_web_href_link,web_href_link,web_content_link,test};

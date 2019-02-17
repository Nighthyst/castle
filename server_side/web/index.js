const puppeteer = require('puppeteer');

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

async function eval_web_href_link(page,selector)
{

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
  await page.goto(url,{waitUntil: 'networkidle2',timeout:0});

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
  await page.close();
  return result;
};

async function eval_web_content_meta(page,selector)
{
  const page = await browser.newPage();
  await page.goto(url,{waitUntil: 'networkidle2',timeout:0});

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
  await page.close();
  return result;
};

function test()
{
  console.log("Hello");
}

module.exports = {eval_web_content_link,eval_web_href_link,web_href_link,web_content_link,web_content_meta,test,eval_web_content_meta};

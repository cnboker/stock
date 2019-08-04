//同花顺行业数据
var sleep = require("../sleep");
const select3day =
  "#datacenter_change_content > div.table-tab.J-ajax-board > a:nth-child(2)";
const select5day =
  "#datacenter_change_content > div.table-tab.J-ajax-board > a:nth-child(3)";
const select10day =
  "#datacenter_change_content > div.table-tab.J-ajax-board > a:nth-child(4)";
const select20day =
  "#datacenter_change_content > div.table-tab.J-ajax-board > a:nth-child(5)";
const selectTable = "#J-ajax-main > table tr";
//var selector = 'a[href*="' + keyword + '"]'
///html/body/div[3]/div[3]/div[2]/div[3]/div[2]/a[text()="下一页"]
const nextpage = "a.changePage:nth-last-child(3)";
const SCAN_MAX_PAGE = 5;
var day3Data = {},
  day5Data = {},
  day10Data = {},
  day20Data = {};

function main() {
  const puppeteer = require("puppeteer");

  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://data.10jqka.com.cn/funds/gnzjl/###");
    //await page.screenshot({ path: "example.png" });

    day3Data = await dataFetch(select3day, page);
    day5Data = await dataFetch(select5day, page);
    day10Data = await dataFetch(select10day, page);
    day20Data = await dataFetch(select20day, page);

    dataMerge(day3Data, day5Data);
    dataMerge(day3Data, day10Data);
    dataMerge(day3Data, day20Data);
    //console.log(day3Data);
    var fs = require("fs");
    var moment = require('moment')
    var outputFilename = `D:/projects/stock/app/src/data/${moment().format('YYYY-MM-DD')}.json`;
    fs.writeFile(outputFilename, JSON.stringify(day3Data, null, 4), function(
      err
    ) {
      if (err) {
        console.log(err);
      }
    });
    await browser.close();
  })();
}

async function dataFetch(selector, page) {
  await page.evaluate(
    selector => document.querySelector(selector).click(),
    selector
  );
  await sleep(1000);
  var pageIndex = 0;
  var jd = {};
  //3d
  while (pageIndex < SCAN_MAX_PAGE) {
    var data = await page.evaluate(selectTable => {
      const tds = Array.from(document.querySelectorAll(selectTable));
      return tds.map(td => td.innerText);
    }, selectTable);
    data = refineData(data);

    jd = { ...jd, ...data };

    await sleep(1000);
    await page.evaluate(
      selector => document.querySelector(selector).click(),
      nextpage
    );
    await sleep(2000);
    pageIndex++;
  }
  return jd;
}

function refineData(data) {
  return data.slice(1).reduce((map, x) => {
    var arr = x.split("\t");
    map[arr[1]] = arr;
    return map;
  }, {});
}

function dataMerge(d1, d2) {
  Object.keys(d1).forEach(function(key) {
    var target = d2[key] || [];
    if (target.length > 0) {
      target.splice(1, 2);
    }
    d1[key] = d1[key].concat(target);
  });
}

main();

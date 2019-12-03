//同花顺行业数据
var sleep = require("../sleep");
const selectnowday =
  "#datacenter_change_content > div.table-tab.J-ajax-board > a:nth-child(1)";
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
var nowData = {},
  day3Data = {},
  day5Data = {},
  day10Data = {},
  day20Data = {};

function nowDataParse(data) {
  var keys = Object.keys(data);
  _nowdata = {};
  for (var key of keys) {
    var _item = [];
    var item = data[key];
    _item.push(item[0]);
    _item.push(item[1]);
    _item.push(item[7]);
    _item.push(item[2]);
    _item.push(item[3]);
    _item.push(item[4]);
    _item.push(item[5]);
    _item.push(item[6]);
    _nowdata[item[1]] = _item;
  }

  return _nowdata;
}

function main() {
  const puppeteer = require("puppeteer");

  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://data.10jqka.com.cn/funds/gnzjl/###");
    //await page.screenshot({ path: "example.png" });

    //day20Data = await dataFetch(select20day, page);
    try {
      nowData = await dataFetch(selectnowday, page);

      nowData = nowDataParse(nowData);

      day3Data = await dataFetch(select3day, page);
      dataMerge(nowData, day3Data);

      day5Data = await dataFetch(select5day, page);
      dataMerge(nowData, day5Data);

      day10Data = await dataFetch(select10day, page);            
      dataMerge(nowData, day10Data);
      // dataMerge(nowData, day20Data);
    } catch (e) {
      console.info(e);
    }

    //console.log(day3Data);
    var fs = require("fs");
    var moment = require("moment");
    var outputFilename = `../server/jsonFiles/${moment().format(
      "YYYY-MM-DD"
    )}.json`;
    fs.writeFile(outputFilename, JSON.stringify(nowData, null, 4), function(
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
  await sleep(5000);
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

    //await sleep(5000);
    await page.evaluate(
      selector => document.querySelector(selector).click(),
      nextpage
    );
    await sleep(9000);
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

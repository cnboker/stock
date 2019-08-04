const PageFetcher = require('./pageFetcher')

var fetcher = new PageFetcher();
fetcher.on('nextpage',function(result){
  if(result.records.length > 0){
    fetcher.fetch(result.pageIndex + 1);
  }else{
    console.log('fetch end...')
  }
})
fetcher.fetch(1);


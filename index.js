/* 参考文档：
http://www.r9it.com/20171106/puppeteer.html
*/
const puppeteer=require('puppeteer')
const configs=require('./config')

const {BASE_URL,POLL_TIME}=configs

// 测试个股代码
const stockCode='600776';

(async () => {
    const browser = await (puppeteer.launch({
      //设置超时时间
      timeout: 15000,
      //如果是访问https页面 此属性会忽略https错误
      ignoreHTTPSErrors: true,
      // 打开开发者工具, 当此值为true时, headless总为false
      devtools: false,
      // 关闭headless模式, 不会打开浏览器
      headless: false
    }));
    const page = await browser.newPage();
    await page.goto(BASE_URL+'sh'+stockCode+'.html');

    //const bodyHandle = await page.$('body')
    let i=0;

    function wait(){
      return new Promise((resolve,reject)=>{
          setTimeout(resolve,POLL_TIME)
      })
  }

  async function polling(){
    try{
      const price = await page.$eval("#price9", input => input.innerText)
      console.log('price',price)
      await wait()
      i++;
      if(i>10){
        browser.close();
      }else{
        polling()
      }
    }catch(e){
      console.error(e)
    }
  }

  polling();
  
  })();

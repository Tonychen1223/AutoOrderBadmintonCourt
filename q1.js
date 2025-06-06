const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const url = 'https://resortbooking.metro.taipei/MT02.aspx?module=net_booking&files=booking_place&StepFlag=25&QPid=1154&QTime=19&PT=1&D=2025/06/14';
  await page.goto(url, { waitUntil: 'networkidle2' });

  // 擷取網頁中主要的預約表格內容
  const content = await page.evaluate(() => {
    const table = document.querySelector('.tablebg'); // 表格 class
    return table ? table.innerText : '找不到預約資料';
  });

  // 將資料寫入文字檔
  fs.writeFileSync('booking_info.txt', content, 'utf-8');
  console.log('✅ 預約資訊已儲存至 booking_info.txt');

  await browser.close();
})();

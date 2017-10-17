let fs = require('fs');

let ui = require('../../config/uiconfig/indexpage')
let registerPage = require('../../config/uiconfig/registerPage')
let loginPage = require('../../config/uiconfig/loginPage')
let userinfo = require('../../config/userinfo.json')
let app = require('../../config/app.confifg');
let util = require('./util')


let userLogin = async function (driver, userName, passWord) {
    await driver.get(app.baseUrl);
    await driver.findElement(ui.loginhref).click();
    await driver.findElement(loginPage.username).sendKeys(userName);
    await driver.findElement(loginPage.password).sendKeys(passWord);
    await driver.findElement(loginPage.submit).click();
}

let userRegister = async function (driver, loginname, pass, re_pass, email) {
    await driver.get(app.baseUrl)
    await driver.findElement(registerPage.registerUrl).click();
    await driver.findElement(registerPage.loginName).sendKeys(loginname);
    await driver.findElement(registerPage.pass).sendKeys(pass);
    await driver.findElement(registerPage.rePass).sendKeys(re_pass);
    await driver.findElement(registerPage.email).sendKeys(email);
    await driver.findElement(registerPage.sudmit).click();
}

let saveScreenShots = async function (driver) {
    let screenshotdir = util.getScreenshotsDir();
    let imagedata = await driver.takeScreenshot();
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    // console.log(year + '_' + month + '_' + day + '_' + hour + '_' + min + '_' + sec + '_' + '.png')
    let filename = year + '_' + month + '_' + day + '_' + hour + '_' + min + '_' + sec + '_' + '.png';
    fs.writeFileSync(screenshotdir + "/" + filename, imagedata, "base64");
}

// let takeScreenshot().then((ImageData)=>{
//             var date = new Date();
//             let year = date.getFullYear();
//             let month = date.getMonth()+1;
//             let day = date.getDate();
//             let hour =date.getHours();
//             let min = date.getMinutes();
//             let sec = date.getSeconds();
//             let filename = year+'_'+month+'_'+day+'_'+hour+'_'+min+'_'+sec+'_'+'.png'
// }

module.exports.userLogin = userLogin;
module.exports.userRegister = userRegister;
module.exports.saveScreenShots = saveScreenShots;

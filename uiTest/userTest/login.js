
let uiaction = require('../../common/ui/uiaction')
let loginPage = require('../../config/uiconfig/loginPage')
let indexpage =require("../../config/uiconfig/indexPage")
let uiAction = require('../../common/ui/uiaction')
let testdata = require('../../testdata/login.json');
let userinfo_success=testdata.userinfo_success;
let userinfo_err=testdata.userinfo_err;
let { Builder } = require('selenium-webdriver')
require ("chromedriver")

var assert = require('assert');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe('用户登录',function(){

    this.timeout(600000)
    before('open browser', function () {
        driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
    })

    afterEach('tackscreenshot', async function () {
        
        await uiAction.saveScreenShots(driver);
        await driver.manage().deleteAllCookies();
    })

    after('close browser', async function () {
        
        return await driver.quit();
    })
    it('用户登录正确用户名与密码',async function(){
        for(let i=0;i<userinfo_success.length;i++){
            await uiAction.userLogin(driver,userinfo_success[i].username, userinfo_success[i].password)
        let  UserName=await driver.findElement(indexpage.username).getText();
        return assert.deepEqual(userinfo_success[i].username,UserName);
        }
         
    })
    it('报错',async function(){
            for (let i=0;i<userinfo_err.length;i++){
            await uiAction.userLogin(driver,userinfo_err[i].username,userinfo_err[i].password)
            //错误信息提示断言
            let errTip = await driver.findElement(loginPage.errortip).getText();
            
            assert.ok(errTip.indexOf(userinfo_err[i].errortip) )
        }
    })
})
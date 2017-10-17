
let uiaction = require('../../common/ui/uiaction')
let loginPage = require('../../config/uiconfig/loginPage')
let uiAction = require('../../common/ui/uiaction')
require ("chromedriver")
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe('用户登录',function(){

    this.timeout(600000)
    it('用户登录正确用户名与密码',async function(){
        await uiAction.userLogin(driver,"tangyuan","tvxqsj124");
    let errortip = await driver.findElement(loginPage.errortip).getText();
            //验证提示信息是否正确
            return assert.ok(errortip.indexOf("用户名or密码错误。"));    
    })
    it('格式不正确,提示 不合法。',async function(){
           await uiAction.userLogin(driver,"t","t")
            let errortip = await driver.findElement(loginPage.errortip).getText();
            //不合法。
            return assert.ok(errortip.indexOf("不合法。"));
        })
    it('用户名不存在',async function(){
            await uiAction.userLogin(driver,"tangyuan1850","tvxqsj123")
            let errortip = await driver.findElement(loginPage.errortip).getText();
            //用户名不存在。
            return assert.ok(errortip.indexOf("用户名不存在。"));
        })
    })

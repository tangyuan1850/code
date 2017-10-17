/**
 * 
 * 1. 注册窗口是否可以正常打开？
 * 2. 注册窗口UI显示正常
 * 3. 注册信息合法值验证
 * 4. 使用已经注册email 注册
 * 5. 注册成功后是否显示激活提示信息
 * 6. 注册成功后是否收到邮件
 * 7 使用未激活的账户登录
 * 8 激活后是否可以正常登录
 * 9 注册窗口与注册窗口是否可以正常切换
 */

require('chromedriver')
let { Builder } = require('selenium-webdriver')

let registerPage = require('../../config/uiconfig/registerPage')
let loginPage = require('../../config/uiconfig/loginPage')
let indexPage = require('../../config/uiconfig/indexPage')

let app = require('../../config/app.confifg')
let uiAction = require('../../common/ui/uiaction')
let dbAction = require('../../common/ui/db')

let data = require("../../testdata/register.json")
let driver;


//

let assert = require('assert')
describe('注册功能', function () {
    this.timeout(60*1000)
    before('open browser', function () {
        driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
    })

    afterEach('tackscreenshot', async function () {
        
        await uiAction.saveScreenShots(driver);
        await driver.manage().deleteAllCookies();
    })

    after(' close browser', async function () {
        
        return await driver.quit();
    })


    it('注册窗口是否可以正常打开？', async function () {
        await driver.get(app.baseUrl);
        await driver.findElement(registerPage.registerUrl).click();
        // 验证页面中的元素是否存在
        return assert.ok(driver.findElement({ css: "#content > div > div.header > ul > li.active" }));
    })
    it('注册窗口UI显示正常', async function () {
        await driver.get(app.baseUrl);
        await driver.findElement(registerPage.registerUrl).click();
        // 验证页面中的元素是否存在
        return assert.ok(driver.findElement({ css: "#content > div > div.header > ul > li.active" }));
    })
    describe.only('注册信息合法值验证', function () {
        it.only('两次密码不一致 应该收到<两次密码输入不一致。>提示', async function () {
            await driver.get(app.baseUrl);
            await uiAction.userRegister(driver,data.passworderrData.userName,data.passworderrData.password,data.passworderrData.repassword,data.passworderrData.email)
            let errortip = await driver.findElement(registerPage.errortip).getText();
            //验证提示信息是否正确
            return assert.ok(errortip.indexOf("两次密码输入不一致。") );
        })
        it('email 格式不正确,提示 邮箱不合法。',async function(){
            await driver.get(app.baseUrl);
            await uiAction.userRegister(driver,"tangyuan","tvxqsj123","tvxqsj123","2569867157@qq.com")
            let errortip = await driver.findElement(registerPage.errortip).getText();
            //邮箱不合法。
            return assert.ok(errortip.indexOf("邮箱不合法。") );
        })
        it('用户名存在，提示用户名或邮箱已被使用。',async function(){
            await driver.get(app.baseUrl);
            await uiAction.userRegister(driver,"tangyuan","tvxqsj123","tvxqsj123","2569867157@qq.com")
            let errortip = await driver.findElement(registerPage.errortip).getText();
            //用户名或邮箱已被使用。
            return assert.ok(errortip.indexOf("用户名或邮箱已被使用。"));
        })
    })
    it('注册成功后是否显示激活提示信息', async function () {
        await driver.get(app.baseUrl);
        let nowdate = new Date().valueOf();
        await uiAction.userRegister(driver,data.passWorderrData.userName,data.passWorderrData.password,data.passWorderrData.repassword,data.passWorderrData.email)
        let successtip = await driver.findElement(registerPage.successtip).getText();
        //欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。
        let actualtip = "欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。"
        return assert.deepEqual(actualtip,successtip);
    })
    it('注册成功后是否收到邮件', async function () {
        //暂不支持 todo
    })
    it('使用未激活的账户登录', async function () {
        await driver.get(app.baseUrl);
        let nowdate = new Date().valueOf();
        await uiAction.userRegister(driver,nowdate,"tvxqsj123","tvxqsj123",nowdate+"@qq.com")
        await uiAction.userLogin(driver,nowdate,"tvxqsj123");
        //此帐号还没有被激活，激活链接已发送到 1506689011794@163.com 邮箱，请查收。
        let actualtip = `此帐号还没有被激活，激活链接已发送到 '${nowdate}'@qq.com 邮箱，请查收。`
        let errortip =  await driver.findElement(loginPage).getText();
        return assert.ok(errortip.indexOf(actualtip))
    })
    it('激活后能够正常登录', async function () {
        await driver.get(app.baseUrl);
        let nowdate = new Date().valueOf();
        await uiAction.userRegister(driver,nowdate,"tvxqsj123","tvxqsj123",nowdate+"@qq.com")
        // todo new Promise() async
        dbAction.activeUser(nowdate);
        await uiAction.userLogin(driver,nowdate,"tvxqsj123");
        //验证登录成功后首页显示用户名
        let assertUserName = await driver.findElement(indexPage.username).getText();
        return assert.equal(assertUserName,nowdate)
    })
    it('注册窗口与注册窗口是否可以正常切换', async function () {

    })

})
var Koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    DB = require('./module/db'),
    koaBodyParser = require('koa-bodyparser'),
    path = require('path')
var app = new Koa();
// 配置post提交数据的中间件
app.use(koaBodyParser());
// 配置koa-art-template
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})

// 显示学员信息
router.get('/', async (ctx) => {
    var result = await DB.find('user', {})

    await ctx.render('index', {
        list: result
    });
})

// 增加学员
router.get('/add', async(ctx) => {
    await ctx.render('add', {});
})

// 执行增加学员的操作
router.post('/doAdd', async(ctx) => {
    // 获取表单提交的数据
    // console.log(ctx.request.body); // { username: '1231', age: '123', sex: 'male' }
    let data = await DB.insert('user', ctx.request.body);
    try {
        if (data.result.ok) {
            ctx.redirect('/');
        }
    } catch(err) {
        console.log(err);
        ctx.redirect('/add');
    }
})

// 编辑学员
router.get('/edit', async(ctx) => {
    // 通过get传过来的id获取用户信息
    let id = ctx.query.id;

    let data = await DB.find('user', {"_id": DB.getObjectID(id)});
    // 获取用户信息
    ctx.render('edit', {
        list: data[0]
    });
})

router.post('/doEdit', async(ctx) => {
    var id = ctx.request.body.id;
    var username = ctx.request.body.username;
    var age = ctx.request.body.age;
    var sex = ctx.request.body.sex;

    let data = await DB.update('user', {"_id": DB.getObjectID(id)}, {
        username, age, sex
    })

    console.log(data.result);
    try {
        if (data.result.ok) {
            ctx.redirect('/');
        }
    }catch(err) {
        console.log(err);
        ctx.redirect('/eidt');
    }
})

// 删除学员
router.get('/delete', async(ctx) => {
    let id = ctx.query.id;
    var data = await DB.remove('user', {"_id": DB.getObjectID(id)})
    if (data) {
        ctx.redirect('/');
    }
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
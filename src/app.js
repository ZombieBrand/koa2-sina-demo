const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const statics = require("koa-static")
const path = require('path')
const { REDIS_CONF } = require("./config/db");
const { isProd } = require("./utils/env");
const { SESSION_SECRET_KEY } = require("./config/secretKeys")
// 路由
const blogHomeAPI = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const profileAPI = require('./routes/api/blog-profile')
const users = require("./routes/view/users");
const usersAPI = require("./routes/api/user");
const errorViewRouter = require("./routes/view/error");
const utilsAPIRouter = require("./routes/api/utils")
// error handler
let onerrorConfig = {};
if (isProd) {
  onerrorConfig = {
    redirect: "/error",
  };
}
onerror(app, onerrorConfig);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(statics(__dirname + "/public"));
app.use(statics(path.join(__dirname, '..', 'uploadFiles')));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: "weibo.sid", //cookie name
    prefix: "weibo:sess:", //redis key 的前缀 默认是 koa:sess
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(blogHomeAPI.routes(), blogHomeAPI.allowedMethods());
app.use(profileAPI.routes(), profileAPI.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(usersAPI.routes(), usersAPI.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); //404注册最后
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;

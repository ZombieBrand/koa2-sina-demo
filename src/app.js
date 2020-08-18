const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");

const { REDIS_CONF } = require("./config/db");
const { isProd } = require("./utils/env");
// 路由
const index = require("./routes/view/index");
const users = require("./routes/view/users");
const errorViewRouter = require("./routes/view/error");
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
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// session 配置
app.keys = ["jdfisofjao"];
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
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(errorViewRouter.routes(errorViewRouter.allowedMethods())); //404注册最后
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;

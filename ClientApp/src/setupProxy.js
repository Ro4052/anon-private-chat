const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/*", { target: "http://localhost:4392" }));
  app.use(
    proxy("/ws", {
      target: "http://localhost:8080",
      ws: true,
      onError: e => console.log(e)
    })
  );
};

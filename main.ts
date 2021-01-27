import {
    bold,
    cyan,
    green,
    yellow,
  } from "https://deno.land/std@0.73.0/fmt/colors.ts";
  
  import {
    Application,
    Context,
    isHttpError,
    Status,
  } from "http://deno.land/x/oak/mod.ts";
import router from "./router/router.ts"

function notFound(context: Context) {
    context.response.status = Status.NotFound;
    context.response.body =
      `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
  }

const app = new Application();

  // Logger
  app.use(async (context, next) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
      `${green(context.request.method)} ${
        cyan(decodeURIComponent(context.request.url.pathname))
      } - ${
        bold(
          String(rt),
        )
      }`,
    );
  });
  
  // Response Time
  app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  });
  
  // Error handler
  app.use(async (context, next) => {
    try {
      await next();
    } catch (err) {
      if (isHttpError(err)) {
        context.response.status = err.status;
        const { message, status, stack } = err;
        if (context.request.accepts("json")) {
          context.response.body = { message, status, stack };
          context.response.type = "json";
        } else {
          context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
          context.response.type = "text/plain";
        }
      } else {
        console.log(err);
        throw err;
      }
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(notFound);

app.addEventListener("listen", ({ hostname, port }) => {
    console.log(
      bold("Start listening on ") + yellow(`${hostname}:${port}`),
    );
  });
  
await app.listen({ port: 8000 });
console.log(bold("Finished."));
Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(Bun.file("index.html"), {
        headers: { "Content-Type": "text/html" }
      });
    }

    // Serve images from the "photos" folder
    if (url.pathname.startsWith("/photos/")) {
      const filePath = `.${url.pathname}`;
      const file = Bun.file(filePath);
      return file.exists()
        ? new Response(file)
        : new Response("Not found", { status: 404 });
    }

    return new Response("Not found", { status: 404 });
  }
});


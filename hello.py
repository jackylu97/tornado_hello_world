import tornado.ioloop
import tornado.web
import os.path

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("index.html")

class SearchHandler(tornado.web.RequestHandler):
    def get(self, term):
        url = "https://api.github.com/users/" + term + "/repos"
        result = yield tornado.httpclient.HTTPRequest(url, method = "GET")
        return result

def make_app():
    return tornado.web.Application(
        [
            (r"/", MainHandler),
            (r"/search/(\w+)", SearchHandler)
        ],
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()

const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

routes.get("/posts", async (req, resp) => {
  const posts = await Post.find();
  return resp.json(posts);
});

routes.post(
  "/posts",
  multer(multerConfig).single("file"),
  async (req, resp) => {
    const { originalname: name, size, key, location: url = "" } = req.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });
    return resp.json(post);
  }
);

routes.delete("/posts/:id", async (req, resp) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  return resp.send();
});

module.exports = routes;

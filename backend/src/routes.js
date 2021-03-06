const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const Post = require('./models/Post');

routes.get('/posts', async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});
routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, filename: key } = req.file;
  const post = await Post.create({
    name,
    size,
    key,
    url: '',
  });
  console.log(req.file);
  return res.json(post);
});

routes.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  await post.remove();
  return res.send('Deletado com sucesso');
});
module.exports = routes;

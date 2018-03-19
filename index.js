const server = require('server');
const { get, post, error } = server.router;
const { render, redirect, status } = server.reply;
const uploadAll = require('./upload-all');
const Image = require('./image');

// Render the homepage with any picture you have in *session*
const renderHome = async ctx => {
  const pictures = await Image.find().sort('-_id').exec();
  return render('index.hbs', { pictures });
};

// Store the posted body, which has the same props as the DB
const saveToDatabase = async ({ data }) => {
  await new Image(data).save();
};

// Launch the server, load the middleware and the two routes
server(8000, uploadAll, [
  get('/', renderHome),
  post('/', saveToDatabase, ctx => redirect('/')),
  error(ctx => status(500).send(ctx.error.message))
]);

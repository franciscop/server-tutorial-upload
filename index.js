const server = require('server');
const { get, post } = server.router;
const { render, redirect } = server.reply;
const uploadAll = require('./upload-all');
const Image = require('./image');

// Render the homepage with any picture you have in *session*
const renderHome = async ctx => {
  const pictures = await Image.find().sort('-_id').exec();
  return render('index.hbs', { pictures });
};


// Store the image. "avatar" comes from the <input> with the name="avatar"
const saveToDatabase = async ({ data }) => {
  await new Image(data).save();
};


server(8000, uploadAll, [
  get('/', renderHome),
  post('/', saveToDatabase, ctx => redirect('/'))
]);

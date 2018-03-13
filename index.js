const server = require('server');
const { get, post } = server.router;
const { render, redirect } = server.reply;
const uploadAll = require('./upload-all');


// Render the homepage with any picture you have in *session*
const renderHome = ctx => render('index.hbs', { pictures: ctx.session.pictures });


const dateTime = time => time.toLocaleDateString() + ' ' + time.toLocaleTimeString();

// Add the submitted picture to your session
const handleSubmission = ctx => {

  // Initialize it
  ctx.session.pictures = ctx.session.pictures || [];

  // "avatar" comes from the name="avatar" in the <input> for file
  ctx.session.pictures.push({
    title: ctx.data.title,
    url: ctx.data.avatar,
    date: dateTime(ctx.files.avatar.lastModifiedDate)
  });

  // Go back home to be able to submit another pic
  return redirect('/');
};


server(8000, uploadAll, [
  get('/', renderHome),
  post('/', handleSubmission)
]);

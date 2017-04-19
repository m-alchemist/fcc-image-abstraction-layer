
const request = require('request');

exports.getImage = function(search, page = 1) {
  return new Promise((resolve, reject) => {

let options = {
      url: `https://api.imgur.com/3/gallery/search/${page}?q=${search}`,
      headers: { Authorization: 'Client-ID 0cbc3bbcd3c3ada' },
      json: true,
    };

function getPics(err, response, body) {
  if (!err && response.statusCode == 200) {
    body = body.data.filter(image => {
      if (!image.is_album) {
        return image;
      }
    }).map(image => {
      return {
        url: image.link,
        snippet: image.title,
        context: `https://imgur.com/${image.id}`
      };
    });
    resolve(body)
  }
}
 request(options, getPics);
  });
};

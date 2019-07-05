/* Originally from https://github.com/justluca/Musakui */

/*
MIT License

Copyright (c) 2019 Luca Polesel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
const got = require('got');

function randomPost(sub) {
  return got(`https://www.reddit.com/r/${sub}/random/.json`, { json: true, headers: {
    'user-agent': 'Chrome'
  }}).then((resp) => {
    const {
      children,
    } = !Array.isArray(resp.body)
      ? resp.body.data
      : resp.body[0].data;

    // Check if it contains something
    if (children.length < 1) {
      throw new Error('No posts.');
    }

    let {
      data,
    } = children[0];

    // Check if crossposted
    if (data.crosspost_parent_list) {
      data = data.crosspost_parent_list[0];
    }

    // Parse post
    const {
      title,
      selftext,
      ups,
      downs,
      num_comments,
      url,
      permalink,
      author,
      over_18,
      is_self,
    } = data;

    const obj = {
      title,
      content: selftext,
      author,
      upvotes: ups,
      downvotes: downs,
      comments: num_comments,
      nsfw: over_18,
      reddit_url: `https://reddit.com${permalink}`,
    };

    // Check if this post contains an image/video/gif
    // TODO: Check more cases
    if (!is_self) {
      // Get proper media url
      
      /* Modification starts here */
      if (url.startsWith('https://v.redd.')) {
        obj.media_url = 'Discord不支持直接播放Reddit视频，请点击链接查看: \n' + data.media.reddit_video.fallback_url;
        

      } else if (url.startsWith('https://gfycat.')) {
        const reg = /[^\/]+(?=\/$|$)/;
        const match = reg.exec(url);

        if (match) {
          obj.media_url = `https://gfycat.com/${match[0]}`;
        }

      } else {
        obj.media_url = url;
      }
    }

    return obj;
  });
}

module.exports = sub => randomPost(sub);

import sample from 'lodash/sample';

export default {
  getArtworkSourceAsync,
};

async function getArtworkSourceAsync() {
  let posts = await _getTopPostsAsync('earthporn');
  let photoPosts = _filterPhotoPosts(posts);
  if (!photoPosts.length) {
    return null;
  }
  let post = sample(photoPosts);
  let photo = post.data.preview.images[0].source;
  return { uri: photo.url, width: photo.width, height: photo.height };
}

async function _getTopPostsAsync(subreddit) {
  let uri = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/top/.json?count=100`;

  let response = await fetch(uri, {
    headers: {
      'user-agent': 'Canvas-Contraption/1.0.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit API returned HTTP status ${response.status}`);
  }

  let result = await response.json();
  if (result.error) {
    throw new Error(`Reddit API returned status ${result.error}: ${result.message}`);
  }

  return result.data.children;
}

function _filterPhotoPosts(posts) {
  return posts.filter(post => {
    if (post.kind !== 't3' || post.data.over_18 || post.data.is_video) {
      return false;
    }
    if (!post.data.preview || !post.data.preview.images || !post.data.preview.images.length) {
      return false;
    }
    return true;
  });
}

import emoticons from '../mock/emoticons';

class MessageFilter {
  getEmoticonImage(name) {
    const path = '/public/images/emoticons/' + name + '.png';
    return `<img src="${path}"/>`;
  }

  filterEmoticon(text) {
    emoticons.forEach((emoticon) => {
      const keys = Object.keys(emoticon);
      const emoticonPath = this.getEmoticonImage(emoticon[keys[0]]);
      // Escape the pattern.
      const pattern = keys[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      text = text.replace(new RegExp(pattern, 'gi'), emoticonPath);
    });

    return text;
  }

  filterLink(text) {
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return text
        .replace(urlPattern, '<a href="$&">$&</a>')
        .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
        .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
  }

  filterImage(text) {
    const picturePath = '/public/images/pictures/' + text;
    return `<img src="${picturePath}"/>`;
  }

  filter(text, filters= []) {
    filters.forEach((filter) => {
      filter = filter.charAt(0).toUpperCase() + filter.slice(1);
      if (typeof this['filter' + filter] == 'function') {
        text = this['filter' + filter](text); 
      }
    });

    return text;
  }
}

export function filterMessage(message) {
  let filters = [];

  switch (message.type) {
    case 'text':
      filters = ['link', 'emoticon'];
      break;

    case 'emoticon':
      filters = ['emoticon'];
      break;

    case 'image':
      filters = ['image'];
      break;
  }

  return Object.assign({}, message, {
    text: new MessageFilter().filter(message.text, filters)
  });
}

export function formatTimestamp(ts, format = 'short') {
  const date = new Date(ts);
  const now = new Date();

  const tsInfo = {
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
  const nowInfo = {
    date: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
  };

  if (tsInfo.date == nowInfo.date && 
      tsInfo.month == nowInfo.month && 
      tsInfo.year == nowInfo.year) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  const monthNames = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
  };

  if (tsInfo.date < 10) {
    tsInfo.date = "0" + tsInfo.date;
  }

  if (format == 'short') {
    if (tsInfo.year == nowInfo.year) {
      return `${monthNames[tsInfo.month]} ${tsInfo.date}`;
    }
    else {
      return `${monthNames[tsInfo.month]} ${tsInfo.date}, ${tsInfo.year}`;
    }
  }

  return `${monthNames[tsInfo.month]} ${tsInfo.date}, ${tsInfo.year} ${date.getHours()}:${date.getMinutes()}`;
}

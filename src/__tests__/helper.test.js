import {expect} from 'chai';
import * as messageHelpers from '../helpers/message';

describe('Helpers', () => {
  it('should filter text message', () => {
    const message = {
      type: 'text',
      text: 'Hello :). Please check this: http://www.google.com',
    };

    const result = messageHelpers.filterMessage(message);
    expect(result.text).to.equal('Hello <img src="/public/images/emoticons/smile.png"/>. Please check this: <a href="http://www.google.com">http://www.google.com</a>');
  });

  it('should filter emoticon message', () => {
    const message = {
      type: 'emoticon',
      text: ':D',
    };
    const result = messageHelpers.filterMessage(message);
    expect(result.text).to.equal('<img src="/public/images/emoticons/big_smile.png"/>');
  });

  it('should filter image message', () => {
    const message = {
      type: 'image',
      text: '1.jpg',
    };
    const result = messageHelpers.filterMessage(message);
    expect(result.text).to.equal('<img src="/public/images/pictures/1.jpg"/>');
  });

  it('should format timestamp', () => {
    let ts = 1473191423764;
    let result = messageHelpers.formatTimestamp(ts, 'short');
    expect(result).to.equal('Sep 06');

    ts = 1423191020764;
    result = messageHelpers.formatTimestamp(ts, 'short');
    expect(result).to.equal('Feb 06, 2015');

    result = messageHelpers.formatTimestamp(ts, 'long');
    expect(result).to.equal('Feb 06, 2015 4:50');

    ts = Date.now();
    const date = new Date(ts);
    result = messageHelpers.formatTimestamp(ts);
    expect(result).to.equal(`${date.getHours()}:${date.getMinutes()}`);
  });
});

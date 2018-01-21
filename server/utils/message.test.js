var expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage',()=>{
  it('should generate the right message object',()=>{
    var from = 'Alay';
    var text = 'Some message';
    var message = generateMessage(from,text);
    expect(message).toInclude({from,text});
  });
})

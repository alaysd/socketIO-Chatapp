const expect = require('expect');
const {Users} = require('./users');

describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name:'Alay',
      room: 'Casual'
    },
    {
      id: '2',
      name:'Dhagia',
      room: 'Casual'
    },
    {
      id: '3',
      name:'Keyur',
      room: 'Casual'
    }]
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id: '123',
      name: 'ALay',
      room:'casual'
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  })
  if('should return names for casual course',()=>{
    var userList = users.getUserList('Casual course');
    expect(userList).toEqual(['Alay','Keyur'])
  })
})

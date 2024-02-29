// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++
    let newUser = {
      id: this.currentID,
      name: name
    }

    this.users[this.currentID] = newUser;
    this.follows[this.currentID] = new Set();

    return newUser.id;
  }

  getUser(userID) {
    if (this.users[userID]) return this.users[userID];
    return null;
  }

  follow(userID1, userID2) {
    if (!this.users[userID1] || !this.users[userID2]) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    if (this.follows[userID]) return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();

    for (let user in this.follows) {
      if (this.follows[user].has(userID)) {
        followers.add(+user);
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let visit = new Set([userID]);
    let res = [];

    while (queue.length) {
      let curr = queue.shift();
      let last = curr[curr.length - 1];

      if (curr.length - 2 < degrees) {
        let followed = this.getFollows(last);
        followed.forEach( user => {
          if (!visit.has(user)) {
            visit.add(user);
            queue.push([...curr, user]);
          }
          if (!this.follows[userID].has(user) && user != userID) res.push(user);
        })
      }
    }
    return res;
  }
}

module.exports = SocialNetwork;

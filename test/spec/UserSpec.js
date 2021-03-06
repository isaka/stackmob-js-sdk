/**
 * This suite will test all the query functions that StackMob has
 * (StackMob.Collection.Query) except for StackMob.GeoPoint
 * More:
 * https://www.stackmob.com/devcenter/docs/Javascript-API-Docs#a-stackmob.collection.query
 */

//howMany number of users to be created (needs to be at least 4)
var howMany = 10;

describe("User", function() {
    var count = 0;
    
	it("should create (" + howMany + ") users", function() {
		runs(function() {
			for (var i = 0; i < howMany; ++i) {
				var user = new StackMob.User({
					'username' : 'test' + i,
					'password' : 'test' + i,
					'age' : initAge + i,
					'location' : initLocation + i,
					'money' : initMoney + i,
					'colors' : ['red', 'green', 'blue', 'some_color' + i],
					'numbers' : [1, 2, 3, i],
					'flag' : 'mUser'
				});
				
				user.create({
					success : function(model) {
						count = count + 1;
					}
				});
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "number of created user should be " + howMany, howMany * 2000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users whose age is less than " + (howMany + initAge - 1), function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').lt('age', howMany + initAge);
		var ageArray = [];
		var max = howMany - 1 + initAge;

		for (var i = initAge; i < max; ++i) {
			ageArray.push(i);
		}

		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < ageArray.length; ++j) {
						if (collection.models[i]['attributes']['age'] === ageArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});

		waitsFor(function() {
			return count === (howMany - 1);
		}, "finish checking all the users fetched", howMany * 1000);

		runs(function() {
			expect(count).toEqual(howMany - 1);
		});
	});

	
	it("should fetch users whose age is less than or equal to " + (howMany + initAge - 1), function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').lte('age', howMany + initAge);
		var ageArray = [];
		var max = howMany - 1 + initAge;

		for (var i = initAge; i <= max; ++i) {
			ageArray.push(i);
		}

		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < ageArray.length; ++j) {
						if (collection.models[i]['attributes']['age'] === ageArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});

		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);

		runs(function() {
			expect(count).toEqual(howMany);
		});
	}); 

	
	it("should fetch users whose age is greater than " + (initAge), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').gt('age', initAge);
		var ageArray = [];
		var max = howMany - 1 + initAge;
		
		for (var i = initAge + 1; i <= max; ++i) {
			ageArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < ageArray.length; ++j) {
						if (collection.models[i]['attributes']['age'] === ageArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === (howMany - 1);
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany - 1);
		});
	});
	
	it("should fetch users whose age is greater than or equal to " + (initAge), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').gte('age', initAge);
		var ageArray = [];
		var max = howMany - 1 + initAge;
		
		for (var i = initAge; i <= max; ++i) {
			ageArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < ageArray.length; ++j) {
						if (collection.models[i]['attributes']['age'] === ageArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	var ageTemp = [];
	var maxTemp = howMany - 1 + initAge;
	for (var i = initAge; i <= maxTemp; ++i) {
		ageTemp.push(i);
	}
	
	it("should fetch users whose age matches one of the following " + ageTemp + " i.e. all multiple created users", function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').mustBeOneOf('age', ageTemp);
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < ageTemp.length; ++j) {
						if (collection.models[i]['attributes']['age'] === ageTemp[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users with age ordered in ascending order", function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').orderAsc('age');
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					if (collection.models[i]['attributes']['age'] === ageTemp[i]) {
						count = count + 1;
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users with age ordered in descending order", function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').orderDesc('age');
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0, j = ageTemp.length - 1; i < collection.models.length, j > -1; ++i, --j) {
					if (collection.models[i]['attributes']['age'] === ageTemp[j]) {
						count = count + 1;
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch only " + (howMany - range) + " out of " + howMany + " users", function() {
		var res = false;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').setRange(0, howMany - range - 1);
	
		users.query(q, {
			success : function(collection) {
				if (collection.models.length == (howMany - range)) {
					res = true;
				}
			}
		});
		
		waitsFor(function() {
			return res === true;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(res).toEqual(true);
		});
	});
	
	it("should fetch users whose money is less than " + (howMany + initMoney - 1), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').lt('money', howMany + initMoney);
		var moneyArray = [];
		var max = howMany - 1 + initMoney;
		
		for (var i = initMoney; i < max; ++i) {
			moneyArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < moneyArray.length; ++j) {
						if (collection.models[i]['attributes']['money'] === moneyArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === (howMany - 1);
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany - 1);
		});
	});
	
	it("should fetch users whose money is less than or equal to " + (howMany + initMoney - 1), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').lte('money', howMany + initMoney);
		var moneyArray = [];
		var max = howMany - 1 + initMoney;
		
		for (var i = initMoney; i <= max; ++i) {
			moneyArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < moneyArray.length; ++j) {
						if (collection.models[i]['attributes']['money'] === moneyArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users whose money is greater than " + (initMoney), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').gt('money', initMoney);
		var moneyArray = [];
		var max = howMany - 1 + initMoney;
		
		for (var i = initMoney + 1; i <= max; ++i) {
			moneyArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < moneyArray.length; ++j) {
						if (collection.models[i]['attributes']['money'] === moneyArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === (howMany - 1);
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany - 1);
		});
	});
	
	it("should fetch users whose money is greater than or equal to " + (initMoney), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').gte('money', initMoney);
		var moneyArray = [];
		var max = howMany - 1 + initMoney;
		
		for (var i = initMoney; i <= max; ++i) {
			moneyArray.push(i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < moneyArray.length; ++j) {
						if (collection.models[i]['attributes']['money'] === moneyArray[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	var moneyTemp = [];
	maxTemp = howMany - 1 + initMoney;
	for (var i = initMoney; i <= maxTemp; ++i) {
		moneyTemp.push(i);
	}
	
	it("should fetch users whose money matches one of the following " + moneyTemp + " i.e. all multiple created users", function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').mustBeOneOf('money', moneyTemp);
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < moneyTemp.length; ++j) {
						if (collection.models[i]['attributes']['money'] === moneyTemp[j]) {
							count = count + 1;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users with money ordered in ascending order", function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').orderAsc('money');
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					if (collection.models[i]['attributes']['money'] === moneyTemp[i]) {
						count = count + 1;
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users with money ordered in descending order", function() {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').orderDesc('money');
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0, j = moneyTemp.length - 1; i < collection.models.length, j > -1; ++i, --j) {
					if (collection.models[i]['attributes']['money'] === moneyTemp[j]) {
						count = count + 1;
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === howMany;
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany);
		});
	});
	
	it("should fetch users whose location is alphabetically less than " + initLocation + (howMany - 1), function () {
		var count = 0;
		var q = new StackMob.Collection.Query();
		var users = new StackMob.Users();
		q.equals('flag', 'mUser').lt('location', initLocation + (howMany - 1));
		var locationArray = [];
		var max = howMany - 1;
		
		for (var i = 0; i < max; ++i) {
			locationArray.push(initLocation + i);
		}
	
		users.query(q, {
			success : function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					for (var j = 0; j < locationArray.length; ++j) {
						if (collection.models[i]['attributes']['location'] === locationArray[j]) {
							count++;
						}
					}
				}
			}
		});
		
		waitsFor(function() {
			return count === (howMany - 1);
		}, "finish checking all the users fetched", howMany * 1000);
		
		runs(function() {
			expect(count).toEqual(howMany - 1);
		});
	});
	
	// This function uses 'equals' query
	deleteMultipleCreatedUsers(howMany);
});
	

describe("add messages to user and query with setExpand level 1", function() {
	var usr = 'jasminestackmob';
	var howMany = 10;

	var msgIDs = [];
  createSimpleUser(usr);
  	
	it("should add " + howMany + " messages to user " + usr, function() {
		
		var res = false;
		var user = new StackMob.User({username:usr});
		var msgs = [];
		for (var i = 0; i < howMany; ++i) {
			msgs.push(new Message({'content' : 'message ' + i}));
		}
		
		user.appendAndCreate('messages', msgs, {
			success: function(model) {
				res = true;
			}
		});
		
		waitsFor(function() {
			return res === true;
		}, "adding messages to be done", howMany * 1000);
		
		runs(function() {
			expect(res).toEqual(true);
		});
	});
	
	
	
	it("should be able to query user " + usr + " with setExpand 1", function() {
		var res = false;
		var user = new StackMob.User({username:usr});
		
		var users = new StackMob.Users();
		var count = 0;
		var q = new StackMob.Collection.Query();
		q.setExpand(1);
		
		users.query(q, {
			success: function(collection) {
				for (var i = 0; i < collection.models.length; ++i) {
					if (collection.models[i]['attributes']['username'] === usr) {
						var max = collection.models[i]['attributes']['messages'].length;
						var messages = collection.models[i]['attributes']['messages'];
						for (var i = 0; i < max; ++i) {
							count = count + 1;
							msgIDs.push(messages[i]['messages_id']);
						}
						break;
					}
				}
			}
		});
		
		waitsFor(function() {
			return count == howMany;
		}, "finish fetching expanded user", howMany * 1000);
	});
	
	xit("should delete all the newly created messages to user " + usr, function() {
		var res = false;
		var user = new StackMob.User({username:usr});
		
		user.deleteAndSave('messages', msgIDs, true, {
			success: function(model) {
				res = true;
			}
		});
		
		waitsFor(function() {
			return res === true;
		}, "finish deleting all messages for user " + usr, 20000);
		
		runs(function() {
			expect(res).toEqual(true);
		});
	});
	
	deleteUser(usr);
});

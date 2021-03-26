// server/roles.js
const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("user")
 .readOwn("profile")
 .updateOwn("profile")

ac.grant("agancy")
 .extend("user")
 .readAny("profile")

ac.grant("admin")
 .extend("user")
 .extend("agancy")
 .updateAny("profile")
 .updateAny("place")
 .readAny("place")
 .deleteAny("profile")
 .readAny("category")
 .deleteAny("category")
 .createAny('category')
 .deleteAny("tag")
 .readAny("users")
 .createAny("users")
 .readAny('comments')
 .readAny('messages')
 .deleteAny('message')
 .readAny('rating')
 .updateAny("admin")
 .deleteAny('advertise')
 .createAny('advertise')
 .updateAny("advertise")
 

return ac;
})();
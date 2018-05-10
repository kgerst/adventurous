'use strict';

var resetDatabase = async function (dbSession) {

  await dbSession.remove('page', '1', function(err) {
    if (err) throw err;
  });

};

module.exports = resetDatabase;
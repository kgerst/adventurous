'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('page', {
      id:     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
      title:  {type: 'string', length: '128', notNull: true, unique: false},
      text:   {type: 'string', length: '1024', notNull: true, unique: false}
    }
  );
};

exports.down = function(db) {
  return db.dropTable('page');
};

exports._meta = {
  "version": 1
};

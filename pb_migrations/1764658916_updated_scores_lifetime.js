/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4014701777")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  u.id,\n  u.id AS user_id,\n  u.name,\n  IFNULL(\n    (SELECT SUM(ch.value)\n     FROM chore_claims cc, chores ch\n     WHERE cc.chore = ch.id\n       AND cc.user = u.id\n    ), 0\n  ) AS chores_sum,\n  IFNULL(\n    (SELECT SUM(b.value)\n     FROM bounties b\n     WHERE instr(IFNULL(b.claimers, ''), '\"' || u.id || '\"') > 0\n    ), 0\n  ) AS bounties_sum,\n  (\n    IFNULL(\n      (SELECT SUM(ch.value)\n       FROM chore_claims cc, chores ch\n       WHERE cc.chore = ch.id\n         AND cc.user = u.id\n      ), 0\n    )\n    +\n    IFNULL(\n      (SELECT SUM(b.value)\n       FROM bounties b\n       WHERE instr(IFNULL(b.claimers, ''), '\"' || u.id || '\"') > 0\n      ), 0\n    )\n  ) AS score\nFROM users u\nORDER BY score DESC;"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_vJx1")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2809058197",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_YKfp",
    "max": 255,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4014701777")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  u.id,\n  u.name,\n  IFNULL(\n    (SELECT SUM(ch.value)\n     FROM chore_claims cc, chores ch\n     WHERE cc.chore = ch.id\n       AND cc.user = u.id\n    ), 0\n  ) AS chores_sum,\n  IFNULL(\n    (SELECT SUM(b.value)\n     FROM bounties b\n     WHERE instr(IFNULL(b.claimers, ''), '\"' || u.id || '\"') > 0\n    ), 0\n  ) AS bounties_sum,\n  (\n    IFNULL(\n      (SELECT SUM(ch.value)\n       FROM chore_claims cc, chores ch\n       WHERE cc.chore = ch.id\n         AND cc.user = u.id\n      ), 0\n    )\n    +\n    IFNULL(\n      (SELECT SUM(b.value)\n       FROM bounties b\n       WHERE instr(IFNULL(b.claimers, ''), '\"' || u.id || '\"') > 0\n      ), 0\n    )\n  ) AS score\nFROM users u\nORDER BY score DESC;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_vJx1",
    "max": 255,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("relation2809058197")

  // remove field
  collection.fields.removeById("_clone_YKfp")

  return app.save(collection)
})

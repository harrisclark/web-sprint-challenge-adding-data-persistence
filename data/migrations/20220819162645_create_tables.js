exports.up = function (knex) {
  return knex.schema
    .createTable('projects', (tbl) => {
      tbl.increments('project_id')
      tbl.varchar('project_name', 100).notNullable()
      tbl.varchar('project_description')
      tbl.boolean('project_completed').notNullable().defaultTo(0)
    })
    .createTable('resources', (tbl) => {
      tbl.increments('resource_id')
      tbl.varchar('resource_name', 100).unique().notNullable()
      tbl.varchar('resource_description')
    })
    .createTable('tasks', (tbl) => {
      tbl.increments('task_id')
      tbl.varchar('task_description').notNullable()
      tbl.varchar('task_notes')
      tbl.boolean('task_completed').notNullable().defaultTo(0)
      tbl
        .integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
    })
    .createTable('project_resources', (tbl) => {
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
      tbl
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
      tbl.primary(['project_id', 'resource_id'])
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
}

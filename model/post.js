/**
 * Posts
 */
var db = require('../config/database');

exports = module.exports;

/**
 * Total posts
 *
 * @param {array} param
 * @param {function} callback
 * @returns {db}
 */
exports.total = (function (param, callback)
{
    var searchStatement = (param.keyword) ? ' WHERE (title LIKE "%' + param.keyword + '%" OR description LIKE "%' + param.keyword + '%")' : '';

    return db.query('SELECT COUNT(*) AS total_posts FROM posts' + searchStatement, function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});

/**
 * Posts list
 *
 * @param {array} param
 * @param {function} callback
 * @returns {db}
 */
exports.list = (function (param, callback)
{
    var paginationStatement = (param.limit > 0) ? ' LIMIT ' + param.offset + ', ' + param.limit : '';
    var searchStatement = (param.keyword) ? 'WHERE (title LIKE "%' + param.keyword + '%" OR description LIKE "%' + param.keyword + '%")' : '';

    return db.query('SELECT * FROM posts ' + searchStatement + ' ORDER BY id DESC' + paginationStatement, function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});

/**
 * Posts detail
 *
 * @param {int} id
 * @param {function} callback
 * @returns {db}
 */
exports.info = (function (id, callback)
{
    return db.query('SELECT * FROM posts WHERE id = ?', id, function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});

/**
 * Create a new post
 *
 * @param {array} data
 * @param {function} callback
 * @returns {db}
 */
exports.create = (function (data, callback)
{
    return db.query('INSERT INTO posts SET ?', data, function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});

/**
 * Update an old post
 *
 * @param {int} id
 * @param {array} data
 * @param {function} callback
 * @returns {db}
 */
exports.update = (function (id, data, callback)
{
    return db.query('UPDATE posts SET ? WHERE id = ? ', [data, id], function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});

/**
 * Delete an old post
 *
 * @param {int} id
 * @param {function} callback
 * @returns {db}
 */
exports.delete = (function (id, callback)
{
    return db.query('DELETE FROM posts WHERE id = ?', id, function (err, rows, fields)
    {
        if (err)
            throw err;

        // done: call callback with rows
        callback(err, rows);
    });
});
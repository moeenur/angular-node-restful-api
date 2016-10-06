var express = require('express');
var post = require('../model/post');
var router = express.Router();

/**
 * GET home page.
 */
router.get('/', function (req, res, next)
{
    res.render('posts/index', {title: 'Posts'});
});

/**
 * GET post list.
 */
router.get('/list', function (req, res, next)
{
    function queries(param, callback)
    {
        var paginate = {};
        post.total(query_param, function (err, result)
        {
            if (result) {
                paginate.total_data = result[0].total_posts;
            }
        });

        post.list(param, function (err, result)
        {
            if (result) {
                paginate.per_page = parseInt(req.query.limit);
                paginate.current_page = parseInt(req.query.page);
                paginate.last_page = Math.ceil(paginate.total_data / paginate.per_page);
                paginate.data = result;
            }
            callback(err, paginate);
        });
    }

    var query_param = {};
    if (req.query) {
        var pageNumber = (req.query.page > 0) ? parseInt(req.query.page - 1) : 0;
        query_param.offset = Math.ceil(pageNumber * parseInt(req.query.limit));
        query_param.limit = parseInt(req.query.limit);
        query_param.keyword = req.query.searchText;
    }

    queries(query_param, function (err, result)
    {
        if (err)
            throw err;

        res.json(result);
    });
});

/**
 * GET post info.
 */
router.get('/info/:id', function (req, res, next)
{
    post.info(req.params.id, function (err, result)
    {
        var data = "";
        if (err) {
            throw err;
        }
        if (result) {
            data = result[0];
        }
        res.json({post: data});
    });
});

/**
 * Create post.
 */
router.post('/create', function (req, res, next)
{
    if (req.body) {
        var data = {
            title: req.body.title,
            description: req.body.description
        };

        post.create(data, function (err, result)
        {
            if (err)
                throw err;

            res.json(result);
        });
    }
});

/**
 * Update post.
 */
router.put('/update/:id', function (req, res, next)
{
    if (req.body) {
        var data = {
            title: req.body.title,
            description: req.body.description
        };

        post.update(req.params.id, data, function (err, result)
        {
            if (err)
                throw err;

            res.json(result);
        });
    }
});

/**
 * Delete post.
 */
router.delete('/delete/:id', function (req, res, next)
{
    post.delete(req.params.id, function (err, result)
    {
        if (err)
            throw err;

        res.json(result);
    });
});

module.exports = router;
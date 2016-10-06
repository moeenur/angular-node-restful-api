/**
 * Define the `post` factory on the `nodeNgApp` module
 */
nodeNgApp.factory('post', function ($http)
{
    var getList = (function (param)
    {
        var queries = {page: param.paginate.page, limit: param.paginate.itemsPerPage, searchText: param.keyword};
        //fetch data from DB
        return $http({method: 'GET', url: 'posts/list', params: queries})
                .then(function (response)
                {
                    return response.data;
                }, function (error)
                {
                    return error;
                });
    });

    var addPost = (function (formData)
    {
        //insert row into the DB
        return $http({method: 'POST', url: 'posts/create/', data: formData})
                .then(function (response)
                {
                    return response.data;
                }, function (error)
                {
                    return error;
                });
    });

    var editPost = (function (postID, formData)
    {
        //update row into the DB
        return $http({method: 'PUT', url: 'posts/update/' + postID, data: formData})
                .then(function (response)
                {
                    return response.data;
                }, function (error)
                {
                    return error;
                });
    });

    var deletePost = (function (postID)
    {
        //fetch data from DB
        return $http({method: 'DELETE', url: 'posts/delete/' + postID})
                .then(function (response)
                {
                    return response.data;
                }, function (error)
                {
                    return error;
                });
    });

    return{
        list: getList,
        create: addPost,
        update: editPost,
        delete: deletePost
    };
});


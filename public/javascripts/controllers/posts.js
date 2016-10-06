/**
 * Define the `postsController` controller on the `nodeNgApp` module
 */
nodeNgApp.controller('postsController', function ($scope, $http, post)
{
    $scope.view = {
        keyword: "",
        postList: {},
        createForm: {},
        updateForm: {},
        deleteForm: {},
        paginate: {
            page: 1,
            itemsPerPage: 10
        }
    };

    $scope.createFormModal = (function ()
    {
        $scope.view.createForm = {};
        $('#create-form-modal').openModal();
    });

    $scope.updateFormModal = (function (id)
    {
        $scope.view.updateForm = {};
        $http.get('posts/info/' + id).then(function (response)
        {
            $scope.view.updateForm = response.data.post;
            $('#update-form-modal').openModal();
            $('input#update-title, textarea#update-description').characterCounter();
            $('textarea#update-description').trigger('autoresize');
        });
    });

    $scope.deletePostForm = (function (param)
    {
        $scope.view.deleteForm = param;
        $('#delete-form-modal').openModal();
    });

    $scope.createPost = (function ()
    {
        if ($scope.createPostForm.$valid) {
            post.create($scope.view.createForm).then(function (response)
            {
                $('#create-form-modal').closeModal();
                $scope.view.paginate.page = 1;
                Materialize.toast('POST successfully created', 3000, 'green darken-3', $scope.init());
            });
        }
    });

    $scope.updatePost = (function (id)
    {
        if ($scope.updatePostForm.$valid) {
            post.update(id, $scope.view.updateForm).then(function (response)
            {
                $('#update-form-modal').closeModal();
                Materialize.toast('POST successfully updated', 3000, 'yellow darken-3', $scope.init());
            });
        }
    });

    $scope.deletePost = (function (id)
    {
        post.delete(id).then(function (response)
        {
            if (($scope.view.postList.current_page === $scope.view.postList.last_page) && ($scope.view.postList.data.length <= 1)) {
                $scope.view.paginate.page = $scope.view.postList.current_page - 1;
            }
            Materialize.toast('POST successfully deleted', 3000, 'red darken-3', $scope.init());
        });
    });

    $scope.init = (function ()
    {
        post.list($scope.view).then(function (response)
        {
            $scope.view.postList = response;
        });
    });

    $scope.paginate = (function (pageNumber)
    {
        $scope.view.paginate.page = (pageNumber > 0) ? pageNumber : $scope.view.paginate.page;

        if (($scope.view.postList.current_page !== $scope.view.paginate.page) && ($scope.view.postList.last_page >= $scope.view.paginate.page)) {
            $scope.init();
        }
    });

    $scope.keywordSearch = (function (keyword)
    {
        $scope.view.keyword = keyword;
        $scope.view.paginate.page = 1;
        $scope.init();
    });

    $scope.init();
});
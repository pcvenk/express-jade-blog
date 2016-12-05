$(document).ready(function(){

    $('.delete-btn').click(function(e){
        //preventing the default action
        $target = $(e.target);
        //making an ajax request
        $.ajax({
            type: 'DELETE',
            url: '/categories.delete' + $target.attr('data-category-id'),
            data: {
                _csrf: $target.attr('data-csrf')
            },
            success: function(res){
                //removing the category
                $target.parent().parent().remove();
                alert('Category Removed');
                //redirecting to
                window.location.href='/manage/categories'
            },
            error: function(err){
                alert(err);
                console.log(err);
            }
        })
    })

});
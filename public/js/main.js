// for security issues, we will send the delete request using ajax
$(document).ready(() => {
    $('.delete-art').on('click', (e) => {
        $target = $(e.target);

        const id = $target.attr('data-id');

        $.ajax({
            type: 'DELETE',
            url: '/articles/' + id,
            success: (response) => {
                alert('Deleting Article');
                window.location.href='/';
            },
            error: (err) => {

            }
        });
    });
});
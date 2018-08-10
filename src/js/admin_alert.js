/**
 * Created by bohai on 18/8/10.
 */
module.exports = function (type, txt, auto) {
    let $alert = $('.alert');
    $alert.addClass('alert-' + type);
    $alert.find('h1').text('txt');
    $alert.addClass('show');

    setTimeout(function () {
        $alert.removeClass('show');
    }, 3000);
};
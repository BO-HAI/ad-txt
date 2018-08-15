/**
 * Created by bohai on 18/8/13.
 */
const HOST = 'http://localhost:8080/api';

module.exports = {
    // classifyApi: function () {
    //     let id = 0;
    //     if (arguments.length > 0) {
    //         id = arguments[0];
    //     }
    //     return {
    //         getAll: HOST + '/classify',
    //         postOne: HOST + '/classify',
    //         update: HOST + `/classify/${id}`,
    //         delete: HOST + `/classify/${id}`,
    //         getList: HOST + '/classify/list'
    //     }
    // },

    themeApi: function () {
        let id = 0;
        if (arguments.length > 0) {
            id = arguments[0];
        }

        return {
            getAll: HOST + '/theme',
            postOne: HOST + '/theme',
            update: HOST + `/theme/${id}`,
            delete: HOST + `/theme/${id}`,
            getOne: HOST + `/theme/${id}`
        }
    },

    themeGetById: function (id) {
        let url = HOST + `/theme/${id}`;
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp'
        });
    },

    themeGetAll: function () {
        let url = HOST + '/theme';
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp'
        });
    },

    themePostOne: function (data) {
        let url = HOST + '/theme';
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data
        });
    },

    themeUpdateById: function (id, data) {
        let url = HOST + `/theme/${id}`;
        return $.ajax({
            url: url,
            type: 'PUT',
            dataType: 'json',
            data
        });
    },

    themeDeleteById: function (id) {
        let url = HOST + `/theme/${id}`;
        return $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'json'
        });
    },

    classifyGetAll: function () {
        let url = HOST + '/classify';
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp'
        });
    },

    classifyPostOne: function (data) {
        let url = HOST + '/classify';
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data
        });
    },

    classifyUpdateById: function (id, data) {
        let url = HOST + `/classify/${id}`;
        return $.ajax({
            url: url,
            type: 'PUT',
            dataType: 'json',
            data
        });
    },

    classifyDeleteById: function (id) {
        let url = HOST + `/classify/${id}`;
        return $.ajax({
            url: url,
            type: 'DELETE',
            dataType: 'json'
        });
    },

    classifyGetList: function () {
        let url = HOST + '/classify/list';
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp'
        });
    }
};
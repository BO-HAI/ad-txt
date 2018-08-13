/**
 * Created by bohai on 18/8/13.
 */
const HOST = 'http://localhost:8080/api';

module.exports = {
    classifyApi: function () {
        let id = 0;
        if (arguments.length > 0) {
            id = arguments[0];
        }
        return {
            getAll: HOST + '/classify',
            postOne: HOST + '/classify',
            update: HOST + `/classify/${id}`,
            delete: HOST + `/classify/${id}`,
            getList: HOST + '/classify/list'
        }
    },

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
        }
    }
};
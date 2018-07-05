/**
 * Created by bohai on 18/6/13.
 */

// window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor;

class Dao {
    constructor (name, version) {
        this.dbName = name;
        this.dbVersion = version;
        this.dbConnect = null;
        this.idb = null;
    }

    connect () {
        this.dbConnect = window.indexedDB.open(this.dbName, this.dbVersion);
        this.dbConnect.onupgradeneeded = (e) => {
            let tx = e.target.transaction;
            this.idb = e.target.result;
            let oldV = e.oldVersion;
            let newV = e.newVersion;
            console.log('数据库版本更新成功，旧版本号：' + oldV + ', 新版本号为：' + newV);

            let classifyStore =  this.idb.createObjectStore('Classify', {
                keyPath: 'id',   // 主键名称
                autoIncrement: false // 是否自增
            });
            console.log('Classify对象仓库创建成功');

            let themeStore = this.idb.createObjectStore('theme', {
                keyPath: 'id',
                autoIncrement: false
            });
            console.log('theme对象仓库创建成功');

            let imageStore = this.idb.createObjectStore('image', {
                keyPath: 'id',
                autoIncrement: false
            });
            console.log('image对象仓库创建成功');
        };
    }

    save (storeName, data) {
        this.dbConnect = window.indexedDB.open(this.dbName, this.dbVersion);
        this.dbConnect.onsuccess = (e) => {
            let idb = e.target.result;
            let tx = idb.transaction([storeName], 'readwrite');
            let store = tx.objectStore(storeName);

            let req1 = store.put(data);

            req1.onsuccess = function () {
                console.log('保存成功');
            };

            req1.onerror = function () {
                console.log('保存失败');
            };
        };
    }
}
module.exports = Dao;
Ext.define('App.store.Degree', {
    extend: 'Ext.data.Store',
    alias: 'store.Degree',
    fields: [
        { type: 'int', name: 'id' },
        { type: 'string', name: 'name' }
    ],

    proxy: {
        type: 'ajax',
        url: '/degrees',
        reader: {
            type: 'json',
        }
    },

    pageSize: null
})
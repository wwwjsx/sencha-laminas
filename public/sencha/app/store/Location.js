Ext.define('App.store.Location', {
    extend: 'Ext.data.Store',
    alias: 'store.Location',
    fields: [
        { type: 'int', name: 'id' },
        { type: 'string', name: 'name' }
    ],

    proxy: {
        type: 'ajax',
        url: '/locations',
        reader: {
            type: 'json',
        },
    },

    pageSize: 0
})
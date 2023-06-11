Ext.define('App.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.Users',
    fields: [
        { type: 'int', name: 'id' },
        { type: 'string', name: 'login' },
        { type: 'int', name: 'degree_id' },
        { type: 'string', name: 'degree_name' },
        { type: 'auto', name: 'locations' },
        { type: 'auto', name: 'locations_id' }
    ],

    proxy: {
        type: 'ajax',
        url: '/users',
        reader: {
            type: 'json',
        }
    },

    pageSize: 0
})
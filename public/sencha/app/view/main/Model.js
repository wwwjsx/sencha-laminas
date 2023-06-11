Ext.define('App.view.main.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    requires: [
        'App.store.Degree',
        'App.store.Location',
        'App.store.Users'
    ],

    stores: {
        degrees: {
            type: 'Degree',
            autoLoad: true,
            listeners: {
                load: 'onLoadDegree'
            },
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }],
            storeId: 'degrees'
        },

        degreeEditor: {
          source: 'degrees'
        },

        locations: {
            type: 'Location',
            autoLoad: true,
            listeners: {
                load: 'onLoadLocation'
            },
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        },

        users: {
            type: 'Users',
            autoLoad: true,
            sorters: [{
                property: 'login',
                direction: 'ASC'
            }]
        }
    }
});
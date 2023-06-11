Ext.define('App.view.main.location.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.main-location',

    requires: [
        'App.view.main.location.Controller'
    ],

    controller: 'main-location',

    bind: {
        store: '{locations}'
    },

    border: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'textfield',
                    emptyText: 'Search location ...',
                    flex: 1,
                    listeners: {
                        change: {
                            fn: 'onSearch',
                            buffer: 500
                        }
                    }
                }
            ]
        }
    ],

    columns: [
        {
            text: 'Name',
            dataIndex: 'name',
            align: 'left',
            flex: 1
        }
    ],

    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    }
})
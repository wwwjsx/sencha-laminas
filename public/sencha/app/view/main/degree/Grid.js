Ext.define('App.view.main.degree.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.main-degree',

    bind: {
        store: '{degrees}'
    },

    border: true,

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
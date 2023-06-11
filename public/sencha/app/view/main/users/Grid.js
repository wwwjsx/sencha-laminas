Ext.define('App.view.main.users.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.main-users',

    requires: [
        'App.view.main.users.Controller'
    ],

    controller: 'main-users',

    bind: {
        store: '{users}'
    },

    border: true,

    columnLines: true,
    columns: [
        {
            text: 'Login',
            align: 'left',
            dataIndex: 'login',
            flex: 1
        },
        {
            text: 'Degree',
            align: 'left',
            flex: 1,
            dataIndex: 'degree_id',
            editor: {
                field: {
                    xtype: 'combobox',
                    bind: {
                        store: '{degreeEditor}'
                    },
                    queryMode: 'local',
                    editable: false,
                    forceSelection: true,
                    valueField: 'id',
                    displayField: 'name'
                }
            },
            renderer: 'rendererDegree'
        },
        {
            text: 'Location',
            align: 'left',
            flex: 2,
            dataIndex: 'locations',
            renderer: 'rendererLocations'
        }
    ],

    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 1,
        listeners: {
            edit: 'onEdit'
        }
    }
})
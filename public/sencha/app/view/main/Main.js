/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'App.view.main.Controller',
        'App.view.main.Model',
        'App.view.main.degree.Grid',
        'App.view.main.location.Grid',
        'App.view.main.users.Grid'
    ],

    controller: 'main',

    viewModel: {
        type: 'main'
    },

    items: [
        {
            title: 'Filters',
            region: 'west',
            width: 400,
            split: true,
            bodyPadding: 5,
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [
                {
                    xtype: 'main-degree',
                    title: 'Degrees',
                    flex: 1,
                    margin: '0 0 5 0'
                },
                {
                    xtype: 'main-location',
                    title: 'Locations',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'main-users',
            title: 'Users',
            region: 'center',
            flex: 1,
        }
    ],

    layout: {
        type: 'border'
    }
});

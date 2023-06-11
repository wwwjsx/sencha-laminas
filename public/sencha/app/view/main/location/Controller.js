Ext.define('App.view.main.location.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-location',

    onSearch: function (field, value) {
        const me = this;
        const store = me.getStore('locations');

        if (Ext.isEmpty(value)) {
            store.removeFilter('byName');
        } else {
            const text = String(value).toLowerCase();

            store.addFilter({
                id: 'byName',
                filterFn: function (record) {
                    const name = String(record.get('name')).toLowerCase();
                    return name.indexOf(text) !== -1;
                }
            });
        }
    }
});
Ext.define('App.view.main.users.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main-users',

    /**
     * Location column renderer
     * @param {String} value
     * @return {String}
     */
    rendererLocations: function (value) {
        const result = [];

        if (Ext.isObject(value) && !Ext.Object.isEmpty(value)) {
            Ext.Object.each(value, (key, val) => {
               result.push(val);
            });
        }

        return result.length ? result.join('; ') : '';
    },

    /**
     * Degree column renderer
     * @param {Number} value
     * @return {String}
     */
    rendererDegree: function (value) {
        const degree = this.getStore('degreeEditor');
        const record = !Ext.isEmpty(value) ? degree.getById(value) : null;

        if (record) {
            return record.get('name');
        }

        return '';
    },

    /**
     * After cell edit event handler
     * @param {Ext.grid.plugin.CellEditing} editor
     * @param {Object} context
     */
    onEdit: function (editor, context) {
        const me = this;
        const { record } = context;
        const view = me.getView();

        if (Ext.isEmpty(context.value) || context.originalValue === context.value) {
            return;
        }

        view.mask('Update ...');

        Ext.Ajax.request({
            url: '/users/update',
            method: 'PUT',
            jsonData: {
                id: record.get('id'),
                degree_id: record.get('degree_id')
            },
            success: function () {
                view.unmask();
                record.commit();
            },
            failure: function () {
                view.unmask();
            }
        });
    }
});
Ext.define('App.view.main.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    control: {
        'main-degree': {
            selectionchange: {
                fn: 'onCheckChangeDegree',
                buffer: 500
            }
        },
        'main-location': {
            selectionchange: {
                fn: 'onCheckChangeLocation',
                buffer: 500
            }
        }
    },

    /**
     * Degree grid selection change event handler
     */
    onCheckChangeDegree: function () {
        this.applyFilter('main-degree');
    },

    /**
     * Location grid selection change event handler
     */
    onCheckChangeLocation: function (sm, selected) {
        this.applyFilter('main-location');
    },

    /**
     * After load degrees store
     * @param {Ext.data.Store} store
     */
    onLoadDegree: function (store) {
        this.selectAll('main-degree', store);
    },

    /**
     * After load locations store
     * @param {Ext.data.Store} store
     */
    onLoadLocation: function (store) {
        this.selectAll('main-location', store);
    },

    privates: {
        /**
         * Apply filter to users store
         * @param {String} selector
         */
        applyFilter: function (selector) {
            const me = this;
            const view = me.getView();
            const grid = view.down(selector);

            if (grid) {
                const selModel = grid.getSelectionModel();
                const selection = selModel.getSelection();
                const selIds = selection.map((rec) => rec.get('id'));

                if (selector === 'main-location') {
                    this.applyLocationFilter(selIds);
                } else if (selector === 'main-degree') {
                    this.applyDegreeFilter(selIds);
                }
            }
        },

        /**
         * Apply filter by location field
         * @param {Number[]} selIds
         */
        applyLocationFilter: function (selIds) {
            const users = this.getStore('users');
            users.removeFilter('byLocation', true);
            users.addFilter({
                id: 'byLocation',
                filterFn: function (record) {
                    const locIds = record.get('locations_id');
                    let exist = false;

                    if (selIds.length > 0 && Ext.isArray(locIds) && locIds.length > 0) {
                        exist = locIds.find((id) => {
                            return selIds.includes(id);
                        });
                    }

                    return Boolean(exist);
                },
            });
        },

        /**
         * Apply filter by degree field
         * @param {Number[]} selIds
         */
        applyDegreeFilter: function (selIds) {
            const users = this.getStore('users');
            users.removeFilter('byDegree', true);
            users.addFilter({
                id: 'byDegree',
                filterFn: function (record) {
                    let exist = false;

                    if (selIds.length > 0) {
                        const degreeId = record.get('degree_id');
                        exist = selIds.includes(degreeId);
                    }

                    return Boolean(exist);
                },
            });
        },

        /**
         * Select all grid records
         * @param {String} selector
         * @param {Ext.data.Store} store
         */
        selectAll: function (selector, store) {
            const me = this;
            const view = me.getView();
            const grid = view.down(selector);

            if (grid) {
                const range = store.getRange();

                grid.selModel.select(range);
            }
        }
    }
});
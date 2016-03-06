/**
 * Widget is a minimalist JavaScript library for create widget element in your page.
 * @name    Widget.js
 * @license MIT license (MIT)
 */

(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    } else if (typeof Package !== "undefined") {
        // Export for Meteor.js
        var Widget = factory();
    } else {
        // jshint sub:true
        window["Widget"] = factory();
    }

})(function() {

    "use strict";

    /**
     * Widget's constructor
     * @param {object} el      Element to widgetize.
     * @param {Array}  options Options for widget.
     */
    function Widget(el, options) {
        if (!(el && el.nodeType && el.nodeType === 1)) {
            throw 'Widget: `el` must be HTMLElement, and not ' + {}.toString.call(el);
        }

        this.el = el;
        this.header = el.querySelector('.widget-header') || null;
        this.icon = el.querySelector('.widget-icon') || null;
        this.title = el.querySelector('.widget-title') || null;
        this.buttons = this.header.querySelector('.widget-buttons') || null;
        this.buttons.maximize = this.buttons.querySelector('a[data-toggle="maximize"]') || null;
        this.buttons.collapse = this.buttons.querySelector('a[data-toggle="collapse"]') || null;
        this.buttons.close = this.buttons.querySelector('a[data-toggle="close"]') || null;
        this.body = el.querySelector('.widget-body');

        this.options = options = _extend({}, options);

        // Bind all private methods.
        for (var fn in this) {
            if (fn.charAt(0) === '_') {
                this[fn] = this[fn].bind(this);
            }
        }

        this._bindEvents();
    }

    Widget.prototype = {
        constructor: Widget,

        /**
         * Bind events to elements.
         */
        _bindEvents: function() {
            if(this.buttons.collapse) {
                _on(this.buttons.collapse, 'click', this._onCollapse);
            }
            if(this.buttons.close) {
                _on(this.buttons.close, 'click', this._onClose);
            }
            if(this.buttons.maximize) {
                _on(this.buttons.maximize, 'click', this._onMaximize);
            }
        },

        /**
         * Collapse element's body.
         * @param {object} evt Event handle.
         */
        _onCollapse: function(evt) {
            _toggleClass(this.body, 'collapsed');
            var icon = this.buttons.collapse.querySelector('i.fa');
            if(_hasClass(this.body, 'collapsed')) {
                _removeClass(icon, 'fa-minus');
                _addClass(icon, 'fa-plus');
            } else {
                _removeClass(icon, 'fa-plus');
                _addClass(icon, 'fa-minus');
            }
        },

        /**
         * Remove Widget.
         * @param {object} evt Event handle.
         */
        _onClose: function(evt) {
            this.el.remove();
        },

        /**
         * Maximized Widget.
         * @param {object} evt Event handle.
         */
        _onMaximize: function(evt) {
            _toggleClass(this.el, 'maximized');
            var icon = this.buttons.maximize.querySelector('i.fa');
            if(_hasClass(this.el, 'maximized')) {
                _removeClass(icon, 'fa-expand');
                _addClass(icon, 'fa-compress');
            } else {
                _removeClass(icon, 'fa-compress');
                _addClass(icon, 'fa-expand');
            }
        }
    }

    /**
     * Merge 2 arrays together
     * @param   {Array} dst Array that will add items.
     * @param   {Array} src Array where the elements come.
     * @returns {Array} dst
     */
    function _extend(dst, src) {
        if (dst && src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                }
            }
        }
        return dst;
    }

    /**
     * Add class to an element.
     * @param {object}  el   Element that is added a class.
     * @param {string}  name Class to add.
     */
    function _addClass(el, name) {
        if(el) {
            if(el.classList) {
                el.classList.add(name);
            } else {
                var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ',' ');
                el.className = (className + ' ' + name).replace(RSPACE, ' ');
            }
        }
    }

    /**
     * Remove class from an element.
     * @param {object} el   Element which class is removed.
     * @param {string} name Class to removed.
     */
    function _removeClass(el, name) {
        if(el) {
            if(el.classList) {
                el.classList.remove(name);
            } else {
                var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ',' ');
                el.className = (className).replace(RSPACE, ' ');
            }
        }
    }

    /**
     * Toggle class from an element.
     * @param {object} el   Element which class is toggled.
     * @param {string} name Class to toggled.
     */
    function _toggleClass(el, name) {
        if (el) {
            if (el.classList) {
                el.classList.toggle(name);
            } else {
                if(_hasClass(el, name)) {
                    _removeClass(el, name);
                } else {
                    _addClass(el, name);
                }
            }
        }
    }

    /**
     * Check if an element has a class.
     * @param {object} el   Element to check.
     * @param {string} name Class to search.
     */
    function _hasClass(el, name) {
        if(el) {
            if(el.classList) {
                return el.classList.contains(name);
            } else {
                return el.className.search(name) != -1 ? true : false;
            }
        }
    }

    /**
     * Add event to an element.
     * @param {object}   el    Element which event is added.
     * @param {string}   event Event added to the element.
     * @param {function} fn    Function binded to the element.
     */
    function _on(el, event, fn) {
        el.addEventListener(event, fn, false);
    }

    /**
     * Remove event from an element.
     * @param {object}   el    Element which event is removed.
     * @param {string}   event Event to removed.
     * @param {function} fn    Function to removed.
     */
    function _off(el, event, fn) {
        el.removeEventListener(event, fn, false);
    }

    Widget.version = "0.1";

    return Widget;

});


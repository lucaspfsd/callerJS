(function ($) {
        var pluginCallerJs = {
            attrAjaxMethod: "call-ajax-method", //POST or GET
            attrFunction: "call-fn", //string
            attrImmediate: "call-immediate", //true or false
            attrInto: "call-into", //string
            attrOnce: "call-once", //string
            attrTrigger: "call-trigger", //click or hover or focus
            attrUrl: "call-url", //string
            attrCallback: "call-callback", //string
            call: function (item, callback) {
                var params = this.getParams(item);

                if (params.once && /\</ig.test($(params.into).html())) {
                    return item;
                }

                if (params.fn != null && params.fn != '')
                {
                    this.callFn(params, callback);
                }
                else if (params.url != null && params.url != '') {
                    this.callUrl(params, callback);
                }

                this.checkCallback(callback);

                return item;
            },
            callFn: function (params, callback) {
                var targetFn = new Function(params.fn);
                var cb = callback == null ? params.callback : callback;

                this.formatLoader(params.into);

                targetFn.call();

                this.checkCallback(cb);
            },
            callImmediate: function () {
                var self = this;

                $('[data-' + self.attrImmediate + ']').each(function (index, item) {
                    self.call(item);
                });
            },
            callUrl: function (params, callback) {
                var self = this;
                self.formatLoader(params.into);
                var method = params.ajaxMethod == 'post' ? 'POST' : 'GET';
                var cb = callback == null ? params.callback : callback;

                $.ajax({
                    method: method,
                    url: params.url
                }).done(content => {
                    $(params.into).html(content);
                }).
                always(() => {
                    self.checkCallback(cb);
                });
            },
            checkCallback: function (callback) {
                if (callback) {
                    if (typeof callback === 'string') {
                        const index = (x, i) => x[i];
                        const f = callback.split('.').reduce(index, window);
                        f();
                    }
                    else
                        callback();
                }
            },
            defaults: {
                loaderTemplate: '<div class="preloader"><span class="loader [[DEFAULT_SIZE]]"></span><p>[[DEFAULT_MSG]]<p></div>',
                defaultLoaderSize: "loader-2x",
                defaultLoaderMessage: "Loading...",
                delay: "quite long"
            },
            formatLoader: function (target) {
                var htmlLoader = this.defaults.loaderTemplate.replace('[[DEFAULT_MSG]]', this.defaults.defaultLoaderMessage).replace('[[DEFAULT_SIZE]]', this.defaults.defaultLoaderSize);
                $(target).html(htmlLoader);
            },
            getParams: function (element) {
                var item = $(element);
                return {
                    ajaxMethod: item.data(this.attrAjaxMethod),
                    fn: item.data(this.attrFunction),
                    immediate: item.data(this.attrImmediate),
                    into: item.data(this.attrInto),
                    once: item.data(this.attrOnce),
                    trigger: item.data(this.attrTrigger),
                    url: item.data(this.attrUrl),
                    callback: item.data(this.attrCallback)
                };
            },
            init : function(item, options) {
                this.defaults = $.extend({}, $.fn.callerJS.defaults, options);

                this.callImmediate();

                this.setCallOnEvent();
            },
            setCallOnEvent: function () {
                var self = this;

                $('[data-' + self.attrTrigger + ']').each(function (index, item) {
                    $(item).on($(item).data(self.attrTrigger), function () { self.call(item) });
                });
            },
        };

        $.fn.callerJS = function (methodOrOptions, callback) {
            return this.each(function() {
                if (methodOrOptions === 'call') {
                    return pluginCallerJs[methodOrOptions].apply(this, callback);
                } else if ( typeof methodOrOptions === 'object' || !methodOrOptions ) {
                    // Default to "init"
                    return pluginCallerJs.init(this, arguments[2]);
                } else {
                    $.error('Method ' +  methodOrOptions + ' does not exist on jQuery.callerJS');
                }
            });
        };

        $.fn.callerJS.defaults = pluginCallerJs.defaults;
    }(jQuery));
(function ($) {
	var pluginCallerJs = {
		attrCache: 'call-cache', //true or false, call url or function once
		attrFunction: 'call-fn', //string of function to call
		attrHttpVerb: 'call-httpverb', //string POST or GET methods of url call.
		attrOnEvent: 'call-onevent', //string of event: load or click or mouseenter or focus
		attrOnError: 'call-fn-onerror', //string of function to callback on error (url)
		attrOnSuccess: 'call-fn-onsuccess', //string of function to callback on success (fn and url)
		attrTarget: 'call-target', //string of id or class of element to render the content of call
		attrUrl: 'call-url', //string of url to call by ajax
		call: function (item, options, callback) {
			this.defaults = $.extend({}, $.fn.callerJS.defaults, options);

			var params = this.getParams(item);

			if (params.cache && /\</ig.test($(params.target).html())) {
				return item;
			}

			if (params.fn != null && params.fn != '')
			{
				this.callFn(params, callback);
			}
			else if (params.url != null && params.url != '') {

				params.target = params.target != null ? params.target : item;

				this.callUrl(params, callback);
			}

			return item;
		},
		callFn: function (params, callback) {
			var targetFn = new Function(params.fn);
			var callbackSuccess = callback == null ? params.eventOnSuccess : callback;

			this.formatLoader(params.into);

			targetFn.call();

			this.checkCallback(callbackSuccess);
		},
		callImmediate: function () {
			var self = this;

			$('[data-' + self.attrOnEvent + '="load"]').each(function (index, item) {
				self.call(item);
			});
		},
		callUrl: function (params, callback) {
			var self = this;
			self.formatLoader(params.target);

			var method = params.httpverb == 'post' ? 'POST' : 'GET';
			var callbackSuccess = callback == null ? params.eventOnSuccess : callback;
			var callbackError = callback == null ? params.eventOnError : callback;
			
			$.ajax({
				method: method,
				url: params.url
			}).done(content => {
				$(params.target).html(content);
				self.checkCallback(callbackSuccess);
			}).fail(() => {
				self.checkCallback(callbackError);
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
			defaultLoaderSize: 'loader-2x',
			defaultLoaderMessage: 'Loading...'
		},
		formatLoader: function (target) {
			var htmlLoader = this.defaults.loaderTemplate.replace('[[DEFAULT_MSG]]', this.defaults.defaultLoaderMessage).replace('[[DEFAULT_SIZE]]', this.defaults.defaultLoaderSize);
			$(target).html(htmlLoader);
		},
		getParams: function (element) {
			var item = $(element);
			return {
				cache: item.data(this.attrCache),
				eventOnError: item.data(this.attrOnError),
				eventOnSuccess: item.data(this.attrOnSuccess),
				fn: item.data(this.attrFunction),
				httpverb: item.data(this.attrHttpVerb),
				onevent: item.data(this.attrOnEvent),
				target: item.data(this.attrTarget),
				url: item.data(this.attrUrl),
			};
		},
		init : function(item, options) {
			this.defaults = $.extend({}, $.fn.callerJS.defaults, options);

			this.callImmediate();

			this.setCallOnEvent();
		},
		setCallOnEvent: function () {
			var self = this;

			$('[data-' + self.attrOnEvent + ']').not('[data-' + self.attrOnEvent + '="load"]').each(function (index, item) {
				$(item).on($(item).data(self.attrOnEvent), function () { self.call(item) });
			});
		},
	};

	$.fn.callerJS = function () {
		var defaults = null;
		var callback = null;
		var method = arguments[0];

		if (typeof arguments[0] === 'object')
		{
			defaults = arguments[0];
		}
		else if (typeof arguments[1] === 'object')
		{
			defaults = arguments[1];
		}

		callback = defaults === null ? arguments[1] : arguments[2];

		return this.each(function() {
			if (method === 'call') {
				return pluginCallerJs.call(this, defaults, callback);
			} else if (typeof method === 'object' || !method) {
				// Default to 'init'
				return pluginCallerJs.init(this, defaults);
			} else {
				$.error('Method ' +  methodOrOptions + ' does not exist on jQuery.callerJS');
			}
		});
	};

	$.fn.callerJS.defaults = pluginCallerJs.defaults;
}(jQuery));

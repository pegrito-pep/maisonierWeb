export default {
	success: function (message, callback) {
		this.make(message, {
			type: 'success',
			bgcolor: '#5bd747'
		}, callback)
	},

	error: function (message, callback) {
		this.make(message, {
			type: 'error'
		}, callback)
	},

	make: function (message, config, callback) {
		notif(Object.assign({}, {
			type: "info",
			msg: message,
			timeout: 3000,
			callback
		}, config))
	}
}

export default class wmap {
	constructor(options = {
		plugins: []
	}) {
		options.plugins.forEach((plugin) => {
			this.register(plugin);
		});
	}
	
	scan(options = {
		
	}) {
		console.log("Boom scan")
		return ["192.168.0.12", "192.168.0.15"]
	}
	
	register(plugin) {
		if(["name", "type", "exec"].every((key) => { return key in plugin; })) throw new Error("Invalid plugin. See the doc!");

		switch(plugin.type) {
			case "function":
				if(this[plugin.name]) throw new Error("There's a function with that name.");
				this[plugin.name] = plugin.exec;
			break;
			
			case "preFunction":
				if(!this[plugin.name]) throw new Error("There's no function with that name.");
				var oldFunction = this[plugin.name];

				this[plugin.name] = (options) => {
					plugin.exec(options);
					let result = oldFunction.apply(this, options);
					return result;
				}
			break;
			
			case "postFunction":
				if(!this[plugin.name]) throw new Error("There's no function with that name.");
				var oldFunction = this[plugin.name];

				this[plugin.name] = (options) => {
					let result = oldFunction.apply(this, options);
					plugin.exec(result);
					return result;
				}
			break;

			default:
				throw new Error("Plugin type not recognized. See the doc!");
			break;
		}
	}
}
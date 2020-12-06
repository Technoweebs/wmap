import wmap from "./src/wmap";
window.wmap = wmap;
window.wmapTest = new wmap({ plugins: [{
	name: "portscan",
	type: "function",
	exec: (options) => {
		console.log("OUYOU PORT SCAN")
	}
}] })
export default wmap;
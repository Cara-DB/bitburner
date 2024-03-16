/** @param {NS} ns */
export async function main(ns) {
  const servers = ns.getPurchasedServers();
  const ramNeeded = ns.getScriptRam("test.js");
  const target = ns.args[0]
  for (let i = 0; i in servers; i++) {
    let ram = ns.getServerMaxRam(servers[i]);
    ns.killall(servers[i]);
    ns.scp("test.js", servers[i]);
    let num = parseInt(ram / ramNeeded);
    ns.exec("test.js", servers[i], num, target);
  }
}
/** @param {NS} ns */
export async function main(ns) {
  const servers = ns.getPurchasedServers();
  const target = ns.args[0];
  for (let i in servers) {
    ns.killall(servers[i]);
    let sram = Math.floor(ns.getServerMaxRam(servers[i]) / ns.getScriptRam("simpleHack.js"));
    ns.scp("simpleHack.js", servers[i]);
    ns.exec("simpleHack.js", servers[i], sram, target);
  }
}
/** @param {NS} ns */
export async function main(ns) {
  const servers = ns.getPurchasedServers();
  const target = "joesguns";
  for (let i in servers) {
    ns.killall(servers[i]);
    let sram = Math.floor(ns.getServerMaxRam(servers[i]) / ns.getScriptRam("early-hack-template.js"));
    ns.scp("early-hack-template.js", servers[i]);
    ns.exec("early-hack-template.js", servers[i], sram, target);
  }
}
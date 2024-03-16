/** @param {NS} ns */
export async function main(ns) {
  const targets = [
    "crush-fitness",
    "johnson-ortho",
    "computek",
    "the-hub",
    "netlink"
  ];
  const servers = ns.getPurchasedServers();
  for (let i in servers) {
    ns.killall(servers[i]);
    let eachRam = Math.floor(ns.getServerMaxRam(servers[i]) / targets.length);
    let hackRam = Math.floor(eachRam * 0.1);
    let growRam = Math.floor(eachRam * 0.7);
    let weakenRam = Math.floor(eachRam * 0.2);
    ns.scp("hack.js", servers[i]);
    ns.scp("grow.js", servers[i]);
    ns.scp("weaken.js", servers[i]);
    for (let e in targets) {
      ns.exec("hack.js", servers[i], (Math.floor(hackRam / 1.70)), targets[e]);
      ns.exec("grow.js", servers[i], (Math.floor(growRam / 3.75)), targets[e]);
      await ns.sleep(1000);
      ns.exec("grow.js", servers[i], (Math.floor(growRam / 3.75)), targets[e]);
      ns.exec("weaken.js", servers[i], (Math.floor(weakenRam / 1.75)), targets[e]);
    }
    await ns.sleep(5000);
  }
}
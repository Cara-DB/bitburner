/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  const servers = ns.getPurchasedServers();
  targets = targets.split("\r\n");
  for (let i in targets) {
    ns.killall(servers[i]);
    ns.scp("bserver.js", servers[i]);
    ns.scp("grow.js", servers[i]);
    ns.scp("weaken.js", servers[i]);
    ns.scp("jgrow.js", servers[i]);
    ns.scp("jhack.js", servers[i]);
    ns.scp("jweaken.js", servers[i]);
    let count = Math.floor(ns.getServerMaxRam(servers[i]) / 50000);
    if (count > 1) {
      for (let e = 0; e < count; e++) {
        ns.exec("bserver.js", servers[i], 1, targets[i], 50000, (count));
      }
    }
    else {
      ns.exec("bserver.js", servers[i], 1, targets[i], ns.getServerMaxRam(servers[i]), 1);
    }
  }
}
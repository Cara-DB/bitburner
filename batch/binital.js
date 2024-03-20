/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  const servers = ns.getPurchasedServers();
  targets = targets.split("\r\n");
  if (targets.length > 25) {
    const secondTarget = targets.slice(25);
    targets = targets.slice(0, 25);
  }
  let t = 0
  for (let i in servers) {
    if (t > targets.length - 1) {
      t = 0;
    }
    ns.killall(servers[i]);
    ns.scp("batch/bserver.js", servers[i]);
    ns.scp("grow.js", servers[i]);
    ns.scp("weaken.js", servers[i]);
    ns.scp("jgrow.js", servers[i]);
    ns.scp("jhack.js", servers[i]);
    ns.scp("jweaken.js", servers[i]);
    let count = Math.floor(ns.getServerMaxRam(servers[i]) / 200000);
    if (count > 1) {
      for (let e = 0; e < (count / 2); e++) {
        if (t > targets.length - 1) {
          t = 0;
        }
        ns.exec("batch/bserver.js", servers[i], 1, targets[t], 200000);
        await ns.sleep(20);
        ns.exec("batch/bserver.js", servers[i], 1, secondTarget[i], 200000);
      }
    }
    else {
      ns.exec("batch/bserver.js", servers[i], 1, targets[t], ns.getServerMaxRam(servers[i]), 1);
    }
    t++;
  }
}
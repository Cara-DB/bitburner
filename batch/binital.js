/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  const servers = ns.getPurchasedServers();
  targets = targets.split("\r\n");
  let secondTarget;
  if (targets.length > 25) {
    const split = Math.floor(targets.length / 2);
    secondTarget = targets.slice(split);
    targets = targets.slice(0, split);
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
    if (count > 2) {
      let ram = Math.floor(ns.getServerMaxRam(servers[i]) / 2);
      if (t > targets.length - 1) {
        t = 0;
      }
      ns.exec("batch/bserver.js", servers[i], 1, targets[t], ram);
      await ns.sleep(20);
      ns.exec("batch/bserver.js", servers[i], 1, secondTarget[t], ram);
    }
    else {
      ns.exec("batch/bserver.js", servers[i], 1, targets[t], ns.getServerMaxRam(servers[i]), 1);
    }
    t++;
  }
}
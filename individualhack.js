/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.read("targets.txt");
  const servers = ns.getPurchasedServers();
  targets = targets.split("\r\n");
  let t = 0
  for (let i in servers) {
    if (t > targets.length -1) {
      t = 0;
    }
    ns.killall(servers[i]);
    let ram = ns.getServerMaxRam(servers[i])
    let hackRam = Math.floor(ram * 0.1);
    let growRam = Math.floor(ram * 0.7);
    let weakenRam = Math.floor(ram * 0.2);
    ns.scp("hack.js", servers[i]);
    ns.scp("grow.js", servers[i]);
    ns.scp("weaken.js", servers[i]);
    ns.exec("hack.js", servers[i], (Math.floor(hackRam / 1.70)), targets[t]);
    ns.exec("grow.js", servers[i], (Math.floor(growRam / 3.75)), targets[t]);
    await ns.sleep(500);
    ns.exec("grow.js", servers[i], (Math.floor(growRam / 3.75)), targets[t]);
    ns.exec("weaken.js", servers[i], (Math.floor(weakenRam / 1.75)), targets[t]);
    t++;
  }
}
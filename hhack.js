/** @param {NS} ns */
export async function main(ns) {
  const targets = [
    "nectar-net",
    "hong-fang-tea",
    "joesguns",
  ];
  const host = ns.getHostname();
  ns.killall(host);
  let eachRam = Math.floor(ns.getServerMaxRam(host) / targets.length);
  ns.tprint(eachRam);
  let hackRam = Math.floor(eachRam * 0.1);
  let growRam = Math.floor(eachRam * 0.7);
  let weakenRam = Math.floor(eachRam * 0.2);
  ns.scp("hack.js", host);
  ns.scp("grow.js", host);
  ns.scp("weaken.js", host);
  for (let e in targets) {
    ns.exec("hack.js", host, (Math.floor(hackRam / 1.70)), targets[e]);
    ns.exec("grow.js", host, (Math.floor(growRam / 1.75)), targets[e]);
    ns.exec("weaken.js", host, (Math.floor(weakenRam / 1.75)), targets[e]);
  }
}
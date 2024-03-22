/** @param {NS} ns */
export async function main(ns) {
  //let targets = ns.read("targets.txt");
  //targets = targets.split("\r\n");
  const host = ns.getHostname();
  const target = ns.args[0];
  ns.killall(host);
  //let eachRam = Math.floor(ns.getServerMaxRam(host) / (targets.length)) + 10;
  let eachRam = ns.getServerMaxRam(host) - 8;
  let hackRam = Math.floor(eachRam * 0.1);
  if (hackRam === 0) {
    hackRam = 1;
  }
  let growRam = Math.floor((eachRam * 0.6) / 1.75);
  let weakenRam = Math.floor((eachRam * 0.2) / 1.75);
  /*
  for (let e in targets) {
    ns.exec("hack.js", host, (Math.floor(hackRam / 1.70)), targets[e]);
    ns.exec("grow.js", host, (Math.floor(growRam / 1.75)), targets[e]);
    ns.exec("weaken.js", host, (Math.floor(weakenRam / 1.75)), targets[e]);
  }
  */
  ns.exec("hack.js", host, hackRam, target);
  ns.exec("grow.js", host, growRam, target);
  ns.exec("weaken.js", host, weakenRam, target);
}
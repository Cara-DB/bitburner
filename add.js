/** @param {NS} ns */
export async function main(ns) {
  let hostname = ns.args[0];
  ns.scp("jgrow.js", hostname);
  ns.exec("jgrow.js", hostname, 4);
}
/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const time = ns.args[1];
  await ns.sleep(time);
  await ns.hack(target);
}

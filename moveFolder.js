/** @param {NS} ns */
export async function main(ns) {
  ns.tail();
  const origin = ns.args[0];
  const destination = ns.args[1];
  const host = ns.getHostname();
  let files = ns.ls(host, origin);
  ns.tprint(files);
  for (let i in files) {
    let file = destination;
    file += files[i].split("/").pop();
    ns.mv(host, files[i], file);
  }
}
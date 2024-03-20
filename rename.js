/** @param {NS} ns */
export async function main(ns) {
  let members = ns.gang.getMemberNames();
  for (let i in members) {
    let num = members.indexOf(members[i]) + 1;
    ns.gang.renameMember(members[i], "member-" + num);
  }
}
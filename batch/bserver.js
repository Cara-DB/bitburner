/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const server = ns.getHostname();
  let ram = ns.args[1] - 100;
  let running = false;
  let growRam = Math.floor(ram * 0.7);
  let weakenRam = Math.floor(ram * 0.3);
  let g = 0;
  let w = 0;
  ns.disableLog("ALL");
  while (true) {
    if (running === false) {
      g = 0;
      w = 0;
      g = ns.exec("grow.js", server, (Math.floor(growRam / 1.80)), target);
      w = ns.exec("weaken.js", server, (Math.floor(weakenRam / 1.75)), target);
      while (g === 0) {
        g = ns.exec("grow.js", server, (Math.floor(growRam / 1.80)), target);
        await ns.sleep(20);
      }
      while (w === 0) {
        w = ns.exec("weaken.js", server, (Math.floor(weakenRam / 1.75)), target);
        await ns.sleep(20);
      }
      ns.print(g, " & ", w);
      ns.print("Growing Server...");
      running = true;
    }
    if (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
      && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
      if (running) {
        ns.kill(g);
        ns.kill(w);
        ns.print("Left Growth Stage!");
      }
      let o = 0;
      while (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
        && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
        // Calculations for the cycle
        let weakent = ns.getWeakenTime(target);
        let growt = weakent - ns.getGrowTime(target);
        let hackt = weakent - ns.getHackTime(target);
        let hackMoney = ns.getServerMaxMoney(target) / 2;
        let threads = Math.floor(ns.hackAnalyzeThreads(target, hackMoney)) + 2;
        let levelIncrease = ns.hackAnalyzeSecurity(threads, target);
        let decrease = (hackMoney / ns.getServerMoneyAvailable(target)) + 1;
        let growthThreads = Math.floor(ns.growthAnalyze(target, decrease) * 2);
        let weakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (growthThreads * 0.004)) / 0.005));
        let hweakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (levelIncrease * 0.004)) / 0.005));
        let ramNeeded = (ns.getScriptRam("jgrow.js") * growthThreads) + (ns.getScriptRam("jhack.js") * threads) + (ns.getScriptRam("jweaken.js") * weakenThreads);
        if (o < 100 && (ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / 2 >= ramNeeded) {
          ns.print("Running Cycles...");
          let usedRam = ramNeeded;
          while (ram - usedRam >= ramNeeded) {
            ns.exec("jgrow.js", server, growthThreads, target, (growt - 50));
            ns.exec("jhack.js", server, threads, target, (hackt - 200));
            ns.exec("jweaken.js", server, weakenThreads, target, 0);
            ns.exec("jweaken.js", server, hweakenThreads, target, 100);
            o++;
            await ns.sleep(60);
            usedRam += ramNeeded;
          }
          let sleepTime = weakent + (o * 60) - 500; // Sleeps while cycles are running
          await ns.sleep(sleepTime);
          ns.print("Cycles Finished!");
          o = 0;
        }
        running = false;
        await ns.sleep(20);
      }
    }
    await ns.sleep(20);
  }
}

/** @param {NS} ns */
export async function main(ns) {
  const target = ns.args[0];
  const server = ns.getHostname();
  const ram = ns.args[1];
  const count = ns.args[2];
  let running = false;
  let growRam = Math.floor(ram * 0.7);
  let weakenRam = Math.floor(ram * 0.2);
  let runScripts = true;
  let srunning = ns.args[2];
  let g = NaN;
  let w = NaN;
  let g1 = NaN;
  let toKill = []
  while (true) {
    if (running === false) {
      g = ns.exec("grow.js", server, (Math.floor(growRam / 3.75)), target);
      w = ns.exec("weaken.js", server, (Math.floor(weakenRam / 1.75)), target);
      g1 = ns.exec("grow.js", server, (Math.floor(growRam / 3.75)), target);
      running = true;
    }
    if (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
      && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
      if (running) {
        if (ns.isRunning(g)) {
          ns.kill(g);
          ns.kill(w);
          ns.kill(g1);
          running = false;
        }
      }
      let i = 0;
      while (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)
        && ns.getServerSecurityLevel(target) === ns.getServerMinSecurityLevel(target)) {
        let weakent = ns.getWeakenTime(target);
        let growt = weakent - ns.getGrowTime(target);
        let hackt = weakent - ns.getHackTime(target);
        let hackMoney = ns.getServerMaxMoney(target) / count;
        let threads = Math.floor(ns.hackAnalyzeThreads(target, hackMoney)); //1 billion
        let levelIncrease = ns.hackAnalyzeSecurity(threads, target);
        let decrease = (1000000000 / ns.getServerMoneyAvailable(target)) + 1;
        let growthThreads = Math.floor(ns.growthAnalyze(target, decrease));
        let weakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (growthThreads * 0.004)) / 0.05));
        let hweakenThreads = Math.floor(((ns.getServerSecurityLevel(target) + (levelIncrease * 0.004)) / 0.05));
        let ramNeeded = (ns.getScriptRam("jgrow.js") * growthThreads) + (ns.getScriptRam("jhack.js") * threads) + (ns.getScriptRam("jweaken.js") * weakenThreads);
        while ((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) >= ramNeeded) {
          toKill.push(ns.exec("jgrow.js", server, growthThreads, target, (growt - 100)));
          toKill.push(ns.exec("jhack.js", server, threads, target, (hackt - 400)));
          toKill.push(ns.exec("jweaken.js", server, weakenThreads, target, 0));
          toKill.push(ns.exec("jweaken.js", server, hweakenThreads, target, 200));
          await ns.sleep(100);
        }
        if (ns.getServerMoneyAvailable(target) < (ns.getServerMaxMoney(target)/2)) {
          ns.kill(...toKill);
        }
        runScripts = true;
        running = false;
        await ns.sleep(1000);
      }
      await ns.sleep(1000);
    }
    await ns.sleep(100);
  }

}

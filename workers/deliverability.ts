import { prisma } from "../lib/prisma";
import dns from "dns/promises";

export async function analyzeDomainHealth(job: any) {
  const { domainId } = job.data;
  const domain = await prisma.sendingDomain.findUnique({ where: { id: domainId } });
  if (!domain) return;
  try {
    const records = await dns.resolveTxt(`_dmarc.${domain.domain}`);
    const ok = records.some((rec) => rec.join('').includes('v=DMARC1'));
    await prisma.sendingDomain.update({
      where: { id: domainId },
      data: { healthScore: ok ? 1.0 : 0.2 },
    });
  } catch {
    await prisma.sendingDomain.update({
      where: { id: domainId },
      data: { healthScore: 0.1 },
    });
  }
}

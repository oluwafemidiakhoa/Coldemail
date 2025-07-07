export async function warmupProcessor(job: any) {
  const { domainId } = job.data;
  console.log(`[warm-up] Pretend sending warm‑up emails for domain ${domainId}`);
}

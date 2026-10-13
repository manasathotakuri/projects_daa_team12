const jobsBody = document.getElementById("jobsBody");
const errorBox = document.getElementById("error");
const stepsBox = document.getElementById("steps");
const scheduleBox = document.getElementById("schedule");
const statusBadge = document.getElementById("status");
let nextId = 1;

const sampleJobs = [
  { id: "a", deadline: 2, profit: 100 },
  { id: "b", deadline: 1, profit: 19 },
  { id: "c", deadline: 2, profit: 27 },
  { id: "d", deadline: 1, profit: 25 },
  { id: "e", deadline: 3, profit: 15 }
];

function addJobRow(job = { id: `J${nextId++}`, deadline: 2, profit: 10 }) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input class="id-input" aria-label="Job ID" maxlength="8" value="${escapeHtml(job.id)}"></td>
    <td><input aria-label="Deadline" type="number" min="1" step="1" value="${job.deadline}"></td>
    <td><input aria-label="Profit" type="number" min="0" step="1" value="${job.profit}"></td>
    <td><button type="button" class="remove" aria-label="Remove job">Remove</button></td>`;
  row.querySelector(".remove").addEventListener("click", () => row.remove());
  jobsBody.appendChild(row);
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}
function loadSample() {
  jobsBody.innerHTML = "";
  nextId = 1;
  sampleJobs.forEach(addJobRow);
  clearResults();
}
function readJobs() {
  const rows = [...jobsBody.querySelectorAll("tr")];
  if (!rows.length) throw new Error("Add at least one job.");
  const jobs = rows.map((row, index) => {
    const inputs = row.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const deadlineText = inputs[1].value;
    const profitText = inputs[2].value;
    if (!id) throw new Error(`Job ${index + 1} needs an ID.`);
    if (deadlineText === "" || !Number.isSafeInteger(Number(deadlineText)) || Number(deadlineText) < 1) {
      throw new Error(`Job ${id}: deadline must be a positive integer.`);
    }
    if (profitText === "" || !Number.isSafeInteger(Number(profitText)) || Number(profitText) < 0) {
      throw new Error(`Job ${id}: profit must be a non-negative integer.`);
    }
    return { id, deadline: Number(deadlineText), profit: Number(profitText), originalIndex: index };
  });
  const ids = jobs.map(job => job.id.toLowerCase());
  if (new Set(ids).size !== ids.length) throw new Error("Each job ID must be unique.");
  return jobs;
}
function clearResults() {
  errorBox.textContent = "";
  stepsBox.className = "steps empty";
  stepsBox.textContent = "Your algorithm steps will appear here.";
  scheduleBox.className = "schedule empty";
  scheduleBox.textContent = "No schedule yet.";
  document.getElementById("totalProfit").textContent = "—";
  document.getElementById("jobsScheduled").textContent = "—";
  document.getElementById("slotsUsed").textContent = "—";
  statusBadge.textContent = "Ready";
  statusBadge.className = "status";
}
function runAlgorithm() {
  clearResults();
  try {
    const jobs = readJobs();
    const sorted = [...jobs].sort((a, b) => b.profit - a.profit || a.deadline - b.deadline || a.originalIndex - b.originalIndex);
    const maxDeadline = Math.min(Math.max(...jobs.map(job => job.deadline)), jobs.length);
    const slots = Array(maxDeadline).fill(null);
    let totalProfit = 0;
    const steps = [];

    sorted.forEach((job, index) => {
      let placedAt = -1;
      const lastSlot = Math.min(job.deadline, maxDeadline);
      for (let slot = lastSlot - 1; slot >= 0; slot--) {
        if (slots[slot] === null) {
          slots[slot] = job;
          placedAt = slot;
          totalProfit += job.profit;
          break;
        }
      }
      if (placedAt >= 0) {
        steps.push({ accepted: true, job, detail: `Scheduled in time slot ${placedAt + 1}, the latest free slot before deadline ${job.deadline}. Profit +${job.profit}.` });
      } else {
        steps.push({ accepted: false, job, detail: `No free slot exists on or before deadline ${job.deadline}; skip this job.` });
      }
    });
    renderSteps(steps);
    renderSchedule(slots);
    document.getElementById("totalProfit").textContent = totalProfit;
    document.getElementById("jobsScheduled").textContent = slots.filter(Boolean).length;
    document.getElementById("slotsUsed").textContent = slots.length;
    statusBadge.textContent = "Completed";
    statusBadge.className = "status done";
  } catch (error) {
    errorBox.textContent = error.message;
  }
}
function renderSteps(steps) {
  stepsBox.className = "steps";
  stepsBox.innerHTML = "";
  steps.forEach((step, index) => {
    const article = document.createElement("article");
    article.className = `step ${step.accepted ? "accepted" : "rejected"}`;
    const number = document.createElement("div");
    number.className = "step-number";
    number.textContent = index + 1;
    const content = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${step.accepted ? "✓ Scheduled" : "✕ Skipped"}: Job ${step.job.id} (deadline ${step.job.deadline}, profit ${step.job.profit})`;
    const detail = document.createElement("p");
    detail.textContent = step.detail;
    content.append(title, detail);
    article.append(number, content);
    stepsBox.appendChild(article);
  });
}
function renderSchedule(slots) {
  scheduleBox.className = "schedule";
  scheduleBox.innerHTML = "";
  slots.forEach((job, index) => {
    const slot = document.createElement("div");
    slot.className = `slot ${job ? "filled" : ""}`;
    const label = document.createElement("span");
    label.className = "slot-num";
    label.textContent = `Time slot ${index + 1}`;
    const value = document.createElement("strong");
    value.textContent = job ? job.id : "Empty";
    const meta = document.createElement("small");
    meta.textContent = job ? `Profit: ${job.profit}` : "No job assigned";
    slot.append(label, value, meta);
    scheduleBox.appendChild(slot);
  });
}
document.getElementById("sampleBtn").addEventListener("click", loadSample);
document.getElementById("addBtn").addEventListener("click", () => { addJobRow(); clearResults(); });
document.getElementById("runBtn").addEventListener("click", runAlgorithm);
document.getElementById("resetBtn").addEventListener("click", () => { jobsBody.innerHTML = ""; addJobRow(); clearResults(); });
document.getElementById("copyPromptBtn").addEventListener("click", async () => {
  const prompt = document.querySelector(".prompt").textContent.trim();
  try {
    await navigator.clipboard.writeText(prompt);
    document.getElementById("copyPromptBtn").textContent = "Copied!";
  } catch {
    window.prompt("Copy this AI visualization prompt:", prompt);
  }
});
loadSample();

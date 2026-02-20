
const fileInput = document.getElementById("file");
const drop = document.getElementById("drop");
const chooseBtn = document.getElementById("chooseBtn");
const fileMeta = document.getElementById("fileMeta");
const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");

const results = document.getElementById("results");
const resultsSub = document.getElementById("resultsSub");
const gradeBadge = document.getElementById("gradeBadge");

const scoreVal = document.getElementById("scoreVal");
const issuesVal = document.getElementById("issuesVal");
const gaugePath = document.getElementById("gaugePath");

const checksList = document.getElementById("checksList");

const nameVal = document.getElementById("nameVal");
const emailVal = document.getElementById("emailVal");
const phoneVal = document.getElementById("phoneVal");
const linkedinVal = document.getElementById("linkedinVal");
const githubVal = document.getElementById("githubVal");
const aboutVal = document.getElementById("aboutVal");

const skillsChips = document.getElementById("skillsChips");
const skillsEmpty = document.getElementById("skillsEmpty");

const sugList = document.getElementById("sugList");
const sugEmpty = document.getElementById("sugEmpty");

const xpVal = document.getElementById("xpVal");
const eduVal = document.getElementById("eduVal");

const signals = document.getElementById("signals");
const previewVal = document.getElementById("previewVal");

const toast = document.getElementById("toast");

let selectedFile = null;

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.classList.remove("show"), 2400);
}

function fmtBytes(bytes){
  const units=["B","KB","MB","GB"];
  let v=bytes, i=0;
  while(v>=1024 && i<units.length-1){ v/=1024; i++; }
  return `${v.toFixed(i===0?0:1)} ${units[i]}`;
}

function setFile(f){
  selectedFile = f || null;
  if(!selectedFile){
    fileMeta.textContent = "";
    analyzeBtn.disabled = true;
    resetBtn.disabled = true;
    return;
  }
  fileMeta.textContent = `${selectedFile.name} • ${fmtBytes(selectedFile.size)}`;
  analyzeBtn.disabled = false;
  resetBtn.disabled = false;
}

function clearUI(){
  resultsSub.textContent = "Upload your resume and click Analyze.";
  gradeBadge.textContent = "—";
  scoreVal.textContent = "—";
  issuesVal.textContent = "—";
  setGauge(0);

  checksList.innerHTML = "";

  nameVal.textContent = "—";
  emailVal.textContent = "—";
  phoneVal.textContent = "—";
  linkedinVal.textContent = "—";
  githubVal.textContent = "—";
  aboutVal.textContent = "—";

  skillsChips.innerHTML = "";
  skillsEmpty.style.display = "block";
  skillsEmpty.textContent = "—";

  sugList.innerHTML = "";
  sugEmpty.style.display = "block";
  sugEmpty.textContent = "—";

  xpVal.textContent = "—";
  eduVal.textContent = "—";

  signals.innerHTML = "";
  previewVal.textContent = "—";
}

function linkify(url){
  if(!url) return "—";
  let href = url;
  if(!href.startsWith("http")) href = "https://" + href;
  return `<a href="${href}" target="_blank" rel="noreferrer">${url}</a>`;
}

function setGauge(score){
  // Semicircle path length ~314 (set in CSS)
  const total = 314;
  const pct = Math.max(0, Math.min(100, score));
  const offset = total - (total * (pct/100));
  gaugePath.style.strokeDasharray = total;
  gaugePath.style.strokeDashoffset = offset;

  // Provide a gradient without needing defs in SVG:
  gaugePath.style.stroke = "url(#none)";
  gaugePath.style.stroke = "rgba(42,195,138,.95)"; // default
  if(pct < 60) gaugePath.style.stroke = "rgba(255,79,109,.95)";
  else if(pct < 75) gaugePath.style.stroke = "rgba(246,192,76,.95)";
  else gaugePath.style.stroke = "rgba(42,195,138,.95)";
}

function renderChecks(checks){
  checksList.innerHTML = "";
  for(const c of (checks || [])){
    const row = document.createElement("div");
    row.className = "checkRow";

    const left = document.createElement("div");
    left.innerHTML = `
      <div class="checkLabel">${c.label}</div>
      <div class="checkNote">${c.note || ""}</div>
      <div class="progress"><div style="width:${Math.max(0, Math.min(100, c.score))}%"></div></div>
    `;

    const pill = document.createElement("div");
    pill.className = `pill ${c.status}`;
    pill.textContent = `${c.score}/100`;

    row.appendChild(left);
    row.appendChild(pill);
    checksList.appendChild(row);
  }
}

function renderSignals(obj){
  signals.innerHTML = "";
  const labels = {
    pages:"Pages",
    word_count:"Words",
    avg_chars_per_page:"Avg chars/page",
    likely_scanned_pdf:"Scanned?",
    possible_columns:"Columns?",
    bullet_count:"Bullets",
    date_mentions:"Dates found",
    char_count:"Characters",
    extractor:"Extractor",
    pymupdf_available:"PyMuPDF",
  };
  const order = ["pages","word_count","avg_chars_per_page","likely_scanned_pdf","possible_columns","bullet_count","date_mentions","char_count","extractor","pymupdf_available"];
  const entries = Object.entries(obj || {}).sort((a,b)=> order.indexOf(a[0]) - order.indexOf(b[0]));

  for(const [k,v] of entries){
    const card = document.createElement("div");
    card.className = "sig";
    card.innerHTML = `<div class="a">${labels[k] || k}</div><div class="b">${typeof v === "boolean" ? (v ? "Yes" : "No") : v}</div>`;
    signals.appendChild(card);
  }
}

chooseBtn.addEventListener("click", ()=> fileInput.click());

drop.addEventListener("dragover", (e)=>{ e.preventDefault(); drop.classList.add("drag"); });
drop.addEventListener("dragleave", ()=> drop.classList.remove("drag"));
drop.addEventListener("drop", (e)=>{
  e.preventDefault();
  drop.classList.remove("drag");
  const f = e.dataTransfer.files?.[0];
  if(!f) return;
  const ok = f.name.toLowerCase().endsWith(".pdf") || f.name.toLowerCase().endsWith(".docx");
  if(!ok){ showToast("Upload PDF or DOCX only."); return; }
  setFile(f);
});

fileInput.addEventListener("change", ()=>{
  const f = fileInput.files?.[0];
  if(!f) return;
  const ok = f.name.toLowerCase().endsWith(".pdf") || f.name.toLowerCase().endsWith(".docx");
  if(!ok){
    showToast("Upload PDF or DOCX only.");
    fileInput.value = "";
    setFile(null);
    return;
  }
  setFile(f);
});

resetBtn.addEventListener("click", ()=>{
  fileInput.value = "";
  setFile(null);
  clearUI();
  showToast("Reset done.");
});

async function analyze(){
  if(!selectedFile) return;
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "Analyzing…";
  resultsSub.textContent = "Analyzing… extracting text and running checks.";

  try{
    const fd = new FormData();
    fd.append("file", selectedFile);

    const res = await fetch("/api/analyze", { method:"POST", body: fd });
    const data = await res.json();
    if(!res.ok) throw new Error(data?.detail || "Analyze failed");

    // scroll down (your request)
    results.scrollIntoView({ behavior: "smooth", block: "start" });

    const d = data.dashboard;
    scoreVal.textContent = d.score;
    issuesVal.textContent = d.issues;
    gradeBadge.textContent = `${d.grade} • ${d.ats_friendly ? "ATS Friendly" : "Not ATS Friendly"}`;
    setGauge(d.score);

    renderChecks(d.checks);

    // Structured
    const s = data.structured;
    nameVal.textContent = s.name || "—";

    const email = s.contacts?.emails?.[0] || "";
    emailVal.innerHTML = email ? `<a href="mailto:${email}">${email}</a>` : "—";

    phoneVal.textContent = s.contacts?.phones?.[0] || "—";

    const li = s.contacts?.linkedin?.[0] || "";
    linkedinVal.innerHTML = li ? linkify(li) : "—";

    const gh = s.contacts?.github?.[0] || "";
    githubVal.innerHTML = gh ? linkify(gh) : "—";

    aboutVal.textContent = s.about || "—";

    // Skills
    skillsChips.innerHTML = "";
    const skills = s.skills || [];
    if(skills.length){
      skillsEmpty.style.display = "none";
      for(const sk of skills.slice(0, 44)){
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = sk;
        skillsChips.appendChild(chip);
      }
    }else{
      skillsEmpty.style.display = "block";
      skillsEmpty.textContent = "No skills detected.";
    }

    // Suggestions
    sugList.innerHTML = "";
    const sugs = d.suggestions || [];
    if(sugs.length){
      sugEmpty.style.display = "none";
      for(const it of sugs){
        const li = document.createElement("li");
        li.textContent = it;
        sugList.appendChild(li);
      }
    }else{
      sugEmpty.style.display = "block";
      sugEmpty.textContent = "No suggestions — looks strong.";
    }

    // Experience/Projects (prefer experience; fallback to projects)
    const xp = s.experience || s.projects || "—";
    xpVal.textContent = xp || "—";
    eduVal.textContent = s.education || "—";

    renderSignals(d.signals);
    previewVal.textContent = s.raw_preview || "—";

    resultsSub.textContent = `Done • ${d.ats_friendly ? "ATS-friendly" : "Not ATS-friendly"} • ${d.score}/100`;
    showToast("Analysis complete.");
  }catch(err){
    console.error(err);
    showToast(err.message || "Something went wrong.");
    resultsSub.textContent = "Error: could not analyze this file.";
  }finally{
    analyzeBtn.disabled = !selectedFile;
    analyzeBtn.textContent = "Analyze";
  }
}

analyzeBtn.addEventListener("click", analyze);

clearUI();

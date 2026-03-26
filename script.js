/* 
   CYBERCHECK — script.js
   Quiz Logic, Animations, Interactions
 */

// ── DARK MODE ───
const darkToggle = document.getElementById("darkToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("cybercheck-theme");

function applyTheme(dark) {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  darkToggle.textContent = dark ? "☀️" : "🌙";
  darkToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
}

// Apply saved or system preference
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(!isDark);
  localStorage.setItem("cybercheck-theme", !isDark ? "dark" : "light");
});

// ── NAVBAR ───
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navLinkItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  updateActiveNav();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-link")) {
    navLinks.classList.remove("open");
  }
});

function updateActiveNav() {
  const sections = ["home", "about", "tips", "quiz-section"];
  let current = "home";
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  navLinkItems.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
}

// ── TYPING ANIMATION (Hero Phone) ───────────────────────────────
const phrases = [
  "sakit kepala tiba-tiba...",
  "jantung berdegup kencang...",
  "capek terus setiap hari...",
  "sakit perut sebelah kiri...",
  "sesak nafas waktu tidur...",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeEffect() {
  const phrase = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = phrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
  } else {
    typingEl.textContent = phrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === phrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1600);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 90);
}
typeEffect();

// ── SCROLL ANIMATIONS (Info Cards) ──────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(
          () => entry.target.classList.add("visible"),
          parseInt(delay),
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".info-card")
  .forEach((card) => observer.observe(card));

// ── QUIZ DATA ────────────────────────────────────────────────────
const questions = [
  {
    text: "Ketika kamu merasakan sakit kepala, seberapa sering kamu langsung mencari penyebabnya di Google?",
  },
  {
    text: "Setelah membaca artikel kesehatan online, apakah kamu merasa gejala yang disebutkan ada pada dirimu?",
  },
  {
    text: "Apakah kamu merasa lebih cemas setelah mencari gejala kesehatan di internet daripada sebelumnya?",
  },
  {
    text: "Seberapa sering kamu memeriksa gejala fisik yang sama lebih dari sekali dalam satu hari?",
  },
  {
    text: "Apakah kamu pernah tidak bisa tidur karena memikirkan penyakit yang kamu temukan saat googling?",
  },
  {
    text: "Saat merasakan sesuatu yang tidak biasa di tubuhmu, seberapa cepat kamu membuka Google atau WebMD?",
  },
  {
    text: "Apakah kamu lebih percaya hasil pencarian Google daripada saran dokter atau tenaga medis?",
  },
  {
    text: "Apakah kamu pernah menghindari aktivitas karena takut dengan penyakit yang kamu temukan online?",
  },
  {
    text: "Seberapa sering kamu mencari gejala kesehatan di media sosial (TikTok, Instagram, YouTube)?",
  },
  {
    text: "Apakah kamu sering meyakinkan teman atau keluargamu bahwa mereka mengidap penyakit berdasarkan gejala yang kamu baca online?",
  },
  {
    text: "Setelah merasa lebih baik secara fisik, apakah kamu tetap mencari informasi tentang gejala yang sudah hilang?",
  },
  {
    text: "Apakah kamu pernah membatalkan atau menunda tugas kuliah karena terlalu fokus mencari informasi kesehatan online?",
  },
  {
    text: "Seberapa sering kamu mencari second opinion medis dari internet setelah berkonsultasi dengan dokter?",
  },
  {
    text: "Apakah kamu merasa pencarian kesehatan online membuatmu lebih paham kondisi tubuhmu, atau justru lebih bingung?",
  },
  {
    text: "Apakah kamu merasa sulit untuk berhenti membaca artikel atau forum kesehatan meski sudah sangat cemas?",
  },
  {
    text: "Seberapa sering kamu meminta orang terdekat untuk meyakinkanmu bahwa kamu baik-baik saja setelah googling?",
  },
  {
    text: "Apakah aktivitas mencari gejala di internet menghabiskan lebih dari 30 menit waktumu dalam sehari?",
  },
  {
    text: "Seberapa sering kamu merasa gejala baru muncul setelah kamu membaca tentang penyakit tertentu online?",
  },
  {
    text: "Apakah kamu merasa perlu untuk memverifikasi kondisi kesehatanmu lewat internet meski dokter sudah bilang kamu sehat?",
  },
  {
    text: "Secara keseluruhan, apakah kebiasaan mencari informasi kesehatan online membuatmu lebih khawatir tentang kesehatanmu?",
  },
];

const options = [
  { label: "Tidak Pernah", emoji: "😊", value: 0 },
  { label: "Kadang-kadang", emoji: "🤔", value: 1 },
  { label: "Sering", emoji: "😰", value: 2 },
];

const results = {
  low: {
    icon: "🌱",
    label: "Risiko Rendah",
    title: "Kamu Sudah Cukup Sehat Digital!",
    desc: "Kabar baiknya: kamu punya keseimbangan yang baik dalam menggunakan internet untuk informasi kesehatan. Kamu tidak terlalu bergantung pada Dr. Google, dan itu hal yang luar biasa! Tetap pertahankan kebiasaan baikmu.",
    tips: [
      "Pertahankan kebiasaan konsultasi ke dokter saat benar-benar dibutuhkan",
      "Tetap bijak dalam memilih sumber informasi kesehatan yang terpercaya",
      "Bagikan kebiasaan positifmu ke teman-teman di sekitarmu",
      "Tetap aware terhadap perubahan yang mungkin terjadi di masa stres tinggi",
    ],
    class: "risk-low",
    ringPct: 0.25,
  },
  medium: {
    icon: "🌤",
    label: "Risiko Sedang",
    title: "Ada Beberapa Pola yang Perlu Diperhatikan",
    desc: "Kamu sesekali terjebak dalam pencarian gejala online yang bisa memicu kecemasan. Ini sangat umum di kalangan mahasiswa! Yang penting, kamu sudah sadar — dan kesadaran adalah langkah pertama menuju perubahan.",
    tips: [
      "Coba terapkan aturan 'tunggu 24 jam' sebelum googling gejala baru",
      "Batasi pencarian kesehatan hanya dari sumber resmi (Kemenkes, WHO)",
      "Coba teknik grounding saat kamu mulai merasa cemas",
      "Pertimbangkan untuk berbicara dengan konselor kampus jika kecemasan meningkat",
      "Tandai jam-jam tertentu sebagai 'zone bebas googling'",
    ],
    class: "risk-medium",
    ringPct: 0.55,
  },
  high: {
    icon: "🌧",
    label: "Risiko Tinggi",
    title: "Oke, Kamu Perlu Sedikit Bantuan — dan Itu Tidak Apa-Apa",
    desc: "Kebiasaanmu mencari gejala online sudah cukup intens dan mungkin sudah memengaruhi kualitas hidupmu. Tapi ingat — ini bukan diagnosis, dan kamu bisa mengubah pola ini. Banyak orang berhasil keluar dari siklus ini dengan bantuan yang tepat.",
    tips: [
      "Pertimbangkan untuk menemui konselor atau psikolog kampus — gratis dan rahasia",
      "Coba blokir situs-situs kesehatan tertentu menggunakan aplikasi site blocker",
      "Mulai journaling perasaan kecemasanmu daripada menyalurkannya ke pencarian online",
      "Praktikkan teknik pernapasan 4-7-8 saat dorongan untuk googling muncul",
      "Hubungi Into The Light Indonesia: 119 ext 8 jika kecemasan sudah mengganggu tidur",
    ],
    class: "risk-high",
    ringPct: 0.85,
  },
};

// ── QUIZ STATE ───────────────────────────────────────────────────
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// ── QUIZ FUNCTIONS ───────────────────────────────────────────────
function scrollToQuiz() {
  document
    .getElementById("quiz-section")
    .scrollIntoView({ behavior: "smooth" });
}

function startQuiz() {
  document.getElementById("quizIntro").classList.add("hidden");
  document.getElementById("quizQuestions").classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("questionText").textContent =
    `${currentQuestion + 1}. ${q.text}`;
  document.getElementById("questionCounter").textContent =
    `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
  const pct = Math.round((currentQuestion / questions.length) * 100);
  document.getElementById("progressPercent").textContent = `${pct}%`;
  document.getElementById("progressBar").style.width = `${pct}%`;

  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";

  options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className =
      "option-btn" + (answers[currentQuestion] === idx ? " selected" : "");
    btn.innerHTML = `
      <div class="option-icon">${opt.emoji}</div>
      <span>${opt.label}</span>
    `;
    btn.addEventListener("click", () => selectOption(idx));
    grid.appendChild(btn);
  });

  // Animate card
  const card = document.getElementById("questionCard");
  card.style.animation = "none";
  void card.offsetHeight;
  card.style.animation = "fadeSlideUp 0.4s ease both";

  // Nav buttons
  document.getElementById("prevBtn").disabled = currentQuestion === 0;
  const isLast = currentQuestion === questions.length - 1;
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.textContent = isLast ? "Lihat Hasil →" : "Selanjutnya →";
  nextBtn.onclick = isLast ? showResult : nextQuestion;
}

function selectOption(idx) {
  answers[currentQuestion] = idx;
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.classList.toggle("selected", i === idx);
  });
}

function nextQuestion() {
  if (answers[currentQuestion] === null) {
    shakeCard();
    showToast("Pilih salah satu jawaban dulu, ya! 😊");
    return;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function shakeCard() {
  const card = document.getElementById("questionCard");
  card.style.animation = "none";
  void card.offsetHeight;
  card.style.animation = "shake 0.4s ease";
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
      background: #1c2b25; color: white; padding: 12px 24px; border-radius: 100px;
      font-size: 0.9rem; font-family: 'DM Sans', sans-serif; font-weight: 500;
      z-index: 9999; box-shadow: 0 8px 32px rgba(0,0,0,0.2); transition: all 0.3s ease;
      opacity: 0; pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 2500);
}

function showResult() {
  if (answers[currentQuestion] === null) {
    shakeCard();
    showToast("Pilih salah satu jawaban dulu, ya! 😊");
    return;
  }

  // Check all answered
  const unanswered = answers.findIndex((a) => a === null);
  if (unanswered !== -1) {
    currentQuestion = unanswered;
    renderQuestion();
    showToast(`Pertanyaan ${unanswered + 1} belum dijawab!`);
    return;
  }

  const total = answers.reduce((sum, a) => sum + options[a].value, 0);
  const maxScore = questions.length * 2;
  const pct = total / maxScore;

  let level;
  if (pct < 0.35) level = "low";
  else if (pct < 0.65) level = "medium";
  else level = "high";

  const r = results[level];
  document.getElementById("quizQuestions").classList.add("hidden");
  const resultEl = document.getElementById("quizResult");
  resultEl.className = `quiz-result ${r.class}`;
  resultEl.classList.remove("hidden");

  document.getElementById("resultIcon").textContent = r.icon;
  document.getElementById("resultLabel").textContent = r.label;
  document.getElementById("resultTitle").textContent = r.title;
  document.getElementById("resultDesc").textContent = r.desc;
  document.getElementById("scoreText").textContent =
    `${Math.round(pct * 100)}%`;

  const tipsHtml = `<h4>💡 Saran Untukmu</h4><ul>${r.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  document.getElementById("resultTips").innerHTML = tipsHtml;

  // Animate ring
  setTimeout(() => {
    const circumference = 314;
    document.getElementById("ringFill").style.strokeDashoffset =
      circumference - circumference * r.ringPct;
  }, 300);

  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function retakeQuiz() {
  currentQuestion = 0;
  answers = new Array(questions.length).fill(null);
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizQuestions").classList.remove("hidden");
  renderQuestion();
  document
    .getElementById("quiz-section")
    .scrollIntoView({ behavior: "smooth" });
}

function closeResult() {
  document.getElementById("quizResult").classList.add("hidden");
  document.getElementById("quizIntro").classList.remove("hidden");
}

// ── SHAKE KEYFRAME (injected) ────────────────────────────────────
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(styleSheet);

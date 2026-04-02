// Copy button for code blocks
export function initCodeCopy() {
  document.querySelectorAll("pre code").forEach((block) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "복사";
    btn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(block.textContent);
      btn.textContent = "완료!";
      setTimeout(() => (btn.textContent = "복사"), 1500);
    });
    block.parentElement.appendChild(btn);
  });
}

// Simple password gate for dashboard
export function initPasswordGate(correctHash) {
  const saved = sessionStorage.getItem("lk-auth");
  if (saved === correctHash) return true;

  const pass = prompt("비밀번호를 입력하세요");
  if (!pass) {
    document.body.innerHTML =
      '<p style="text-align:center;margin-top:40vh;color:#8a8a92">접근이 거부되었습니다.</p>';
    return false;
  }

  const hash = Array.from(pass).reduce(
    (h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0,
    0
  );
  if (String(hash) === correctHash) {
    sessionStorage.setItem("lk-auth", correctHash);
    return true;
  }

  document.body.innerHTML =
    '<p style="text-align:center;margin-top:40vh;color:#8a8a92">비밀번호가 틀렸습니다.</p>';
  return false;
}

// PDF export
export function initPdfExport() {
  const btn = document.getElementById("export-pdf");
  if (btn) {
    btn.addEventListener("click", () => window.print());
  }
}

// ─── Presentation Mode (opens standalone slides HTML) ───

export function initPresentationMode() {
  // Derive the slides URL from the current page path.
  // e.g. /courses/2026-digital-media-visual-1/chop-audio-reactive
  //   -> /courses/2026-digital-media-visual-1/slides/chop-audio-reactive
  const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "");
  const parts = path.split("/");
  const slug = parts.pop();
  const base = parts.join("/");
  const slidesUrl = `${base}/slides/${slug}.html`;

  // Check if slides file exists before showing the button
  fetch(slidesUrl, { method: "HEAD" }).then((res) => {
    if (!res.ok) return;

    // Add the presentation button
    const presBtn = document.createElement("button");
    presBtn.className = "pres-enter-btn no-print";
    presBtn.innerHTML = "▶ 프레젠테이션";
    presBtn.title = "프레젠테이션 슬라이드 열기 (P)";
    presBtn.addEventListener("click", () => window.open(slidesUrl, "_blank"));
    document.body.appendChild(presBtn);

    // P key shortcut
    document.addEventListener("keydown", (e) => {
      if (e.key === "p" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        window.open(slidesUrl, "_blank");
      }
    });
  }).catch(() => {
    // No slides file — no button
  });
}

// Init all
export function init() {
  initCodeCopy();
  initPdfExport();

  // Auto-init presentation mode if lecture page
  if (document.querySelector(".lecture-page section[id]")) {
    initPresentationMode();
  }
}

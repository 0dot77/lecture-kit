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

// ─── Share / Short Link ───

export function initShareButton() {
  if (document.querySelector(".share-btn")) return;

  const btn = document.createElement("button");
  btn.className = "share-btn no-print";
  btn.type = "button";
  btn.innerHTML =
    '<span class="sig-led sig-led-blue sig-led-pulse"></span><span>공유</span>';
  btn.title = "단축 링크 만들기";
  btn.setAttribute("aria-label", "이 페이지의 단축 링크 만들기");
  btn.addEventListener("click", openShareModal);
  document.body.appendChild(btn);
}

function openShareModal() {
  const url = window.location.href;

  const backdrop = document.createElement("div");
  backdrop.className = "share-modal-backdrop";
  backdrop.innerHTML = `
    <div class="share-modal" role="dialog" aria-modal="true" aria-label="단축 링크 공유">
      <button class="share-modal-close" type="button" aria-label="닫기">×</button>
      <div class="sig-label" style="margin-bottom: 0.5rem;">Share this page</div>
      <h3 style="font-size: 1.15rem; font-weight: 600; margin-bottom: 1rem;">단축 링크</h3>

      <div class="sig-label" style="font-size: 0.65rem;">현재 주소</div>
      <div class="share-link-display" data-role="long"></div>

      <div data-role="short-wrap" style="display:none;">
        <div class="sig-label" style="font-size: 0.65rem;">단축 주소 · 학생들이 이 주소를 입력하면 됩니다</div>
        <div class="share-link-display share-short-link" data-role="short"></div>
      </div>

      <button class="share-action-btn" type="button" data-role="action">단축 링크 생성</button>
      <p class="share-hint" data-role="hint">TinyURL 공개 단축 서비스를 사용합니다</p>
    </div>
  `;

  const longEl = backdrop.querySelector('[data-role="long"]');
  longEl.textContent = url;

  const close = () => {
    document.removeEventListener("keydown", onKey);
    backdrop.remove();
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };
  document.addEventListener("keydown", onKey);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop || e.target.closest(".share-modal-close")) close();
  });

  document.body.appendChild(backdrop);

  const action = backdrop.querySelector('[data-role="action"]');
  const shortEl = backdrop.querySelector('[data-role="short"]');
  const shortWrap = backdrop.querySelector('[data-role="short-wrap"]');
  const hint = backdrop.querySelector('[data-role="hint"]');

  action.addEventListener("click", async () => {
    if (action.dataset.state === "short-ready") {
      try {
        await navigator.clipboard.writeText(shortEl.textContent);
        const before = action.textContent;
        action.textContent = "복사 완료!";
        setTimeout(() => (action.textContent = before), 1500);
      } catch {
        hint.textContent = "복사 실패 — 직접 선택해서 복사하세요";
      }
      return;
    }

    action.disabled = true;
    action.textContent = "생성 중…";
    hint.style.color = "";
    hint.textContent = "단축 서비스 응답을 기다리는 중…";

    try {
      const short = await shortenUrl(url);
      shortEl.textContent = short;
      shortWrap.style.display = "block";
      action.textContent = "단축 링크 복사";
      action.dataset.state = "short-ready";
      action.disabled = false;
      hint.textContent = "이 주소를 칠판이나 채팅에 공유하세요";
    } catch (err) {
      hint.style.color = "var(--color-accent-red)";
      hint.textContent = "단축 링크 생성 실패: " + (err.message || "네트워크 오류");
      action.textContent = "다시 시도";
      action.disabled = false;
    }
  });
}

async function shortenUrl(url) {
  // TinyURL — public, CORS-enabled, no auth.
  const res = await fetch(
    "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url)
  );
  if (!res.ok) throw new Error("HTTP " + res.status);
  const text = (await res.text()).trim();
  if (!/^https?:\/\/tinyurl\.com\//i.test(text)) {
    throw new Error(text || "응답이 단축 URL 형식이 아닙니다");
  }
  return text;
}

// Init all
export function init() {
  initCodeCopy();
  initPdfExport();
  initShareButton();

  // Auto-init presentation mode if lecture page
  if (document.querySelector(".lecture-page section[id]")) {
    initPresentationMode();
  }
}

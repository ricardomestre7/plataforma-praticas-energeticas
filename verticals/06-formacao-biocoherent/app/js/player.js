/**
 * IRIA KNOWLEDGE CONTAINERS - SOVEREIGN VIDEO PLAYER CORE
 * Autor: Mestre Ricardo Rogério Pereira | Safe Creative #2610157331452
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.VERTICAL_DATA;
  if (!data) {
    console.error("Dados da vertical não encontrados.");
    return;
  }

  // Elementos DOM
  const domVerticalTitle = document.getElementById("vertical-title");
  const domVerticalTag = document.getElementById("vertical-tag");
  const domVerticalCode = document.getElementById("vertical-code");
  const domLessonPill = document.getElementById("current-lesson-code");
  const domLessonTitle = document.getElementById("current-lesson-title");
  const domLessonDuration = document.getElementById("current-lesson-duration");
  const domLessonDesc = document.getElementById("current-lesson-description");
  const domVideo = document.getElementById("main-video-element");
  const domAccordion = document.getElementById("modules-accordion");
  const domProgressBar = document.getElementById("progress-fill");
  const domProgressText = document.getElementById("progress-percent");
  const domMaterialsList = document.getElementById("materials-list");
  const domNotesContent = document.getElementById("clinical-notes-content");

  // Estado
  let currentLesson = null;
  const completedLessons = new Set(JSON.parse(localStorage.getItem(`completed_${data.id}`) || "[]"));

  // Inicializar cabeçalho
  if (domVerticalTitle) domVerticalTitle.innerText = data.title;
  if (domVerticalTag) domVerticalTag.innerText = data.category;
  if (domVerticalCode) domVerticalCode.innerText = data.code;

  // Renderizar módulos e aulas no Accordion
  function renderCurriculum() {
    domAccordion.innerHTML = "";
    let totalLessonsCount = 0;

    data.modules.forEach((mod, modIdx) => {
      const modEl = document.createElement("div");
      modEl.className = "module-group" + (modIdx === 0 ? " open" : "");

      const headerEl = document.createElement("div");
      headerEl.className = "module-header";
      headerEl.innerHTML = `
        <div class="module-title-wrap">
          <span class="module-num">Módulo ${mod.order}</span>
          <span class="module-name">${mod.title.replace(/^Módulo \d+:\s*/, "")}</span>
        </div>
        <span class="module-toggle-icon">▼</span>
      `;
      headerEl.addEventListener("click", () => {
        modEl.classList.toggle("open");
      });

      const listEl = document.createElement("div");
      listEl.className = "lesson-list";

      mod.lessons.forEach((les) => {
        totalLessonsCount++;
        const isCompleted = completedLessons.has(les.id);
        const itemEl = document.createElement("div");
        itemEl.className = `lesson-item ${isCompleted ? "completed" : ""}`;
        itemEl.dataset.lessonId = les.id;

        itemEl.innerHTML = `
          <div class="lesson-item-left">
            <div class="lesson-check">✓</div>
            <div class="lesson-item-info">
              <span class="lesson-item-title">${les.title}</span>
              <span class="lesson-item-duration">${les.duration}</span>
            </div>
          </div>
        `;

        itemEl.addEventListener("click", (e) => {
          if (e.target.classList.contains("lesson-check")) {
            toggleLessonComplete(les.id);
          } else {
            selectLesson(les);
          }
        });

        listEl.appendChild(itemEl);
      });

      modEl.appendChild(headerEl);
      modEl.appendChild(listEl);
      domAccordion.appendChild(modEl);
    });

    updateProgress(totalLessonsCount);
  }

  // Selecionar Aula
  function selectLesson(lesson) {
    currentLesson = lesson;

    // Atualizar UI da Aula
    domLessonPill.innerText = lesson.id;
    domLessonTitle.innerText = lesson.title;
    domLessonDuration.innerHTML = `⏱️ ${lesson.duration}`;
    domLessonDesc.innerText = lesson.description;

    // Vídeo Source
    if (lesson.videoUrl) {
      domVideo.src = lesson.videoUrl;
      domVideo.load();
    }

    // Atualizar Materiais
    if (domMaterialsList) {
      domMaterialsList.innerHTML = "";
      if (lesson.materials && lesson.materials.length > 0) {
        lesson.materials.forEach((mat) => {
          const matItem = document.createElement("div");
          matItem.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; margin-bottom: 8px;";
          matItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.2rem;">📄</span>
              <div>
                <div style="font-weight: 600; font-size: 0.88rem; color: #fff;">${mat.name}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${mat.size} • Ficha Técnica Oficial</div>
              </div>
            </div>
            <a href="${mat.url}" download class="btn-ics-trigger" style="font-size: 0.75rem; padding: 5px 12px; text-decoration: none;">Download</a>
          `;
          domMaterialsList.appendChild(matItem);
        });
      } else {
        domMaterialsList.innerHTML = `<p style="color: #64748b; font-size: 0.85rem;">Nenhum material adicional para esta lição.</p>`;
      }
    }

    // Atualizar Notas Clínicas
    if (domNotesContent) {
      domNotesContent.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.05); border-left: 3px solid #10b981; padding: 14px; border-radius: 6px; font-size: 0.9rem; line-height: 1.6; color: #e2e8f0;">
          <strong>🎯 Diretriz Clínica do Mestre:</strong><br/>
          ${lesson.clinicalNotes || "Mantenha a atenção focada na respiração e na postura terapêutica neutra durante a aplicação deste conteúdo."}
        </div>
      `;
    }

    // Highlight no Sidebar
    document.querySelectorAll(".lesson-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.lessonId === lesson.id);
    });
  }

  // Alternar Conclusão da Aula
  function toggleLessonComplete(lessonId) {
    if (completedLessons.has(lessonId)) {
      completedLessons.delete(lessonId);
    } else {
      completedLessons.add(lessonId);
    }
    localStorage.setItem(`completed_${data.id}`, JSON.stringify([...completedLessons]));
    
    // Atualizar classes
    document.querySelectorAll(`[data-lesson-id="${lessonId}"]`).forEach((el) => {
      el.classList.toggle("completed", completedLessons.has(lessonId));
    });

    let totalLessons = 0;
    data.modules.forEach(m => totalLessons += m.lessons.length);
    updateProgress(totalLessons);

    if (window.docketCoerencia) {
      window.docketCoerencia.atualizarProgressoAulas(completedLessons.size, totalLessons);
    }
  }

  // Barra de Progresso
  function updateProgress(totalLessons) {
    const completedCount = completedLessons.size;
    const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    if (domProgressBar) domProgressBar.style.width = `${pct}%`;
    if (domProgressText) domProgressText.innerText = `${pct}% Concluído (${completedCount}/${totalLessons})`;
  }

  // Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-content-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // Modal ICS
  const modalOverlay = document.getElementById("ics-modal-overlay");
  const btnTriggerICS = document.getElementById("btn-trigger-ics");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const domIcsScore = document.getElementById("ics-score-display-val");
  const btnEmitirCertificado = document.getElementById("btn-emitir-cert");
  const certContainer = document.getElementById("cert-container");

  if (btnTriggerICS) {
    btnTriggerICS.addEventListener("click", () => {
      if (window.docketCoerencia) {
        const score = window.docketCoerencia.calcularICS();
        if (domIcsScore) domIcsScore.innerText = score + "%";
      }
      modalOverlay.classList.add("open");
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", () => {
      modalOverlay.classList.remove("open");
    });
  }

  if (btnEmitirCertificado) {
    btnEmitirCertificado.addEventListener("click", () => {
      const cert = window.docketCoerencia.gerarCertificadoSoberano();
      certContainer.innerHTML = `
        <div style="margin-top: 15px; padding: 18px; background: #070b14; border: 1px solid #10b981; border-radius: 10px; font-size: 0.82rem; line-height: 1.6; color: #cbd5e1;">
          <div style="font-weight: 800; font-size: 0.95rem; color: #10b981; text-transform: uppercase; margin-bottom: 6px;">📜 Certificado de Coerência Sistémica Emitido</div>
          <p><strong>Titular:</strong> ${cert.aluno}</p>
          <p><strong>Formação:</strong> ${cert.curso} (${cert.codigoVertical})</p>
          <p><strong>Carga Horária:</strong> ${cert.horas} horas curriculares</p>
          <p><strong>Índice ICS:</strong> <span style="color: #10b981; font-weight: 700;">${cert.icsFinal}%</span> (Resiliência Ótima)</p>
          <p><strong>Assinatura Criptográfica:</strong> <code>${cert.tokenSoberano}</code></p>
          <p><strong>Registro Oficial:</strong> ${cert.safeCreative}</p>
          <p style="margin-top: 6px; font-size: 0.74rem; color: #64748b;">${cert.chancela}</p>
        </div>
      `;
    });
  }

  // Atalhos de Teclado
  window.addEventListener("keydown", (e) => {
    if (["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (domVideo.paused) domVideo.play();
      else domVideo.pause();
    } else if (e.code === "ArrowRight") {
      domVideo.currentTime += 5;
    } else if (e.code === "ArrowLeft") {
      domVideo.currentTime = Math.max(0, domVideo.currentTime - 5);
    } else if (e.code === "KeyM") {
      domVideo.muted = !domVideo.muted;
    }
  });

  // Inicializar
  renderCurriculum();
  if (data.modules.length > 0 && data.modules[0].lessons.length > 0) {
    selectLesson(data.modules[0].lessons[0]);
  }
});

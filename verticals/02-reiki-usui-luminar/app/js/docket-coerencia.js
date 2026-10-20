/**
 * IRIA KNOWLEDGE CONTAINERS - DOCKET DE COERÊNCIA SISTÊMICA (ICS)
 * Algoritmo e Validador Soberano de Prática Clínica e Pedagógica
 * Autor: Mestre Ricardo Rogério Pereira | Safe Creative #2610157331452
 */

class DocketCoerencia {
  constructor() {
    this.storageKey = "iria_ics_metrics_" + (window.VERTICAL_DATA ? window.VERTICAL_DATA.id : "default");
    this.metrics = this.loadMetrics();
  }

  loadMetrics() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Storage inacessível, usando padrão:", e);
    }
    return {
      ritmoRespiratorio: 6.0, // rpm (0.1 Hz ideal)
      estabilidadeVagal: 84, // %
      coerenciaBiocampo: 88, // %
      presencaClinica: 92,   // %
      aulasConcluidas: 0,
      totalAulas: 8,
      icsGlobal: 88
    };
  }

  saveMetrics() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.metrics));
    } catch (e) {
      console.error("Erro ao salvar métricas:", e);
    }
  }

  calcularICS(params = {}) {
    if (params.ritmoRespiratorio !== undefined) this.metrics.ritmoRespiratorio = parseFloat(params.ritmoRespiratorio);
    if (params.estabilidadeVagal !== undefined) this.metrics.estabilidadeVagal = parseFloat(params.estabilidadeVagal);
    if (params.coerenciaBiocampo !== undefined) this.metrics.coerenciaBiocampo = parseFloat(params.coerenciaBiocampo);
    if (params.presencaClinica !== undefined) this.metrics.presencaClinica = parseFloat(params.presencaClinica);

    // Desvio ideal de frequência respiratória em torno de 6 rpm (0.1 Hz)
    const desvioRespiratorio = Math.abs(this.metrics.ritmoRespiratorio - 6.0);
    const scoreRespiratorio = Math.max(0, 100 - (desvioRespiratorio * 15));

    // Média ponderada canónica do ICS Lumina
    const ics = (
      (scoreRespiratorio * 0.25) +
      (this.metrics.estabilidadeVagal * 0.30) +
      (this.metrics.coerenciaBiocampo * 0.25) +
      (this.metrics.presencaClinica * 0.20)
    );

    this.metrics.icsGlobal = Math.round(ics);
    this.saveMetrics();
    return this.metrics.icsGlobal;
  }

  atualizarProgressoAulas(concluidas, total) {
    this.metrics.aulasConcluidas = concluidas;
    this.metrics.totalAulas = total;
    this.saveMetrics();
  }

  gerarCertificadoSoberano(nomeAluno = "Terapeuta Integrativo") {
    const dataEmissao = new Date().toISOString();
    const payload = `${nomeAluno}|${window.VERTICAL_DATA.code}|${this.metrics.icsGlobal}%|SafeCreative-2610157331452|${dataEmissao}`;
    
    // Hash SHA-256 simplificado / assinatura soberana
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const sovereignToken = "LUM-" + Math.abs(hash).toString(16).toUpperCase() + "-2610";

    return {
      aluno: nomeAluno,
      curso: window.VERTICAL_DATA.title,
      codigoVertical: window.VERTICAL_DATA.code,
      horas: window.VERTICAL_DATA.hoursTotal,
      icsFinal: this.metrics.icsGlobal,
      emissao: new Date().toLocaleDateString("pt-PT"),
      tokenSoberano: sovereignToken,
      safeCreative: "Safe Creative #2610157331452",
      chancela: "Mestre Ricardo Rogério Pereira | Cylinder Global Academy"
    };
  }
}

window.docketCoerencia = new DocketCoerencia();

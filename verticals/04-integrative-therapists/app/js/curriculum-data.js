/**
 * IRIA KNOWLEDGE CONTAINERS - VERTICAL IRIA INTEGRATIVE THERAPISTS
 * Autor: Mestre Ricardo Rogério Pereira | Safe Creative #2610157331452
 */

window.VERTICAL_DATA = {
  id: "04-integrative-therapists",
  code: "IRIA-INT",
  title: "IRIA Integrative Therapists",
  subtitle: "Comunidade Internacional de Terapeutas & Prática Clínica Soberana",
  category: "Deontologia, Consultório & Comunidade Global",
  accentColor: "#06b6d4",
  hoursTotal: 45,
  registration: "Safe Creative #2610157331452",
  instructor: {
    name: "Mestre Ricardo Rogério Pereira",
    role: "Presidente do Conselho Pedagógico IRIA & Cylinder Global Academy",
    location: "Ovar, Portugal"
  },
  modules: [
    {
      id: "iria-mod-1",
      order: 1,
      title: "Módulo 1: Prática Clínica Soberana & Deontologia Europeia",
      description: "Estruturação ética do consultório, conformidade RGPD/GDPR, soberania terapêutica e consentimento informado.",
      lessons: [
        {
          id: "INT-01",
          order: 1,
          title: "O Terapeuta Soberano no Cenário Global",
          duration: "25 min",
          videoUrl: "videos/int-01.mp4",
          description: "Posicionamento profissional, independência técnica, limites de atuação e valorização da profissão no espaço europeu e internacional.",
          materials: [
            { name: "Codigo_Deontologico_IRIA.pdf", url: "materiais/Codigo_Deontologico_IRIA.pdf", size: "1.6 MB" },
            { name: "Modelo_Prontuario_RGPD_Europeu.pdf", url: "materiais/Modelo_Prontuario_RGPD_Europeu.pdf", size: "890 KB" }
          ],
          clinicalNotes: "O sigilo e o respeito à autonomia do interagente são pilares sagrados da prática soberana."
        },
        {
          id: "INT-02",
          order: 2,
          title: "Anamnese Integrativa de 360 Graus",
          duration: "30 min",
          videoUrl: "videos/int-02.mp4",
          description: "Metodologia de escuta ativa, histórico biográfico, mapa somatossensorial e rastreio de fatores de estresse ocultos.",
          materials: [
            { name: "Ficha_Anamnese_360_IRIA.pdf", url: "materiais/Ficha_Anamnese_360_IRIA.pdf", size: "1.4 MB" }
          ],
          clinicalNotes: "Escuta sem julgamento: 70% da eficácia clínica decorre da qualidade de presença durante a anamnese."
        }
      ]
    },
    {
      id: "iria-mod-2",
      order: 2,
      title: "Módulo 2: Intervisão Clínica e Mentoria de Casos Complexos",
      description: "Estudos de caso reais, desfechos clínicos e governança terapêutica em equipe multidisciplinar.",
      lessons: [
        {
          id: "INT-03",
          order: 1,
          title: "Mesa Redonda: Gestão de Crises e Desregulações Agudas",
          duration: "38 min",
          videoUrl: "videos/int-03.mp4",
          description: "Abordagem coordenada em intercorrências emocionais e sintomas de desintoxicação biológica pós-intervenção.",
          materials: [
            { name: "Guia_Intervisao_Casos_Complexos.pdf", url: "materiais/Guia_Intervisao_Casos_Complexos.pdf", size: "2.1 MB" }
          ],
          clinicalNotes: "Sempre manter canal de suporte seguro e referenciar profissionais médicos quando indicado."
        }
      ]
    }
  ]
};

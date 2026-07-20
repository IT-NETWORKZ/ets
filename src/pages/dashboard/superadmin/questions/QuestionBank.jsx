import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineArrowDownTray, HiOutlineArrowUpTray, HiOutlineDocumentCheck,
  HiOutlineCheckCircle, HiOutlineTrash, HiOutlineGlobeAlt,
} from "react-icons/hi2";
import DashboardLayout from "../../../../dashboard/DashboardLayout";
import SectionCard from "../../../../dashboard/widgets/SectionCard";
import { Badge } from "../../../../dashboard/widgets/Misc";
import { SUPERADMIN_NAV } from "../superadminNav";
import { QUESTION_PATTERNS } from "../../admin/questions/questionPatterns";
import PatternFields from "../../admin/questions/PatternFields";
import "../../../../dashboard/DashboardShared.css";
import "../../admin/questions/QuestionBank.css";
import "./SuperadminQuestionBank.css";

const TENANTS = [
  "All Tenants (Global Pool)", "TechPrep Institute", "Nagpur Skill Academy",
  "Bright Future Coaching", "Vidarbha Exam Board",
];

const EMPTY_DRAFT = {
  subject: "", topic: "", difficulty: "Moderate", marks: "1", negMarks: "0", language: "English",
  questionText: "",
  options: [{ id: 1, text: "" }, { id: 2, text: "" }, { id: 3, text: "" }, { id: 4, text: "" }],
  correctOption: null, correctOptions: [],
  tfAnswer: null,
};

export default function SuperadminQuestionBank() {
  const [tenant, setTenant] = useState(TENANTS[0]);
  const [excelFile, setExcelFile] = useState(null);
  const [pattern, setPattern] = useState("single");
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [saved, setSaved] = useState([]);
  const [justSaved, setJustSaved] = useState(false);

  const patch = (p) => setDraft((d) => ({ ...d, ...p }));

  function handleSave(e) {
    e.preventDefault();
    if (!draft.questionText.trim()) return;
    setSaved((s) => [{ id: Date.now(), pattern, tenant, ...draft }, ...s]);
    setDraft(EMPTY_DRAFT);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

  const removeSaved = (id) => setSaved((s) => s.filter((q) => q.id !== id));
  const activePattern = QUESTION_PATTERNS.find((p) => p.id === pattern);

  return (
    <DashboardLayout
      role="superadmin" roleLabel="Superadmin Console" roleColor="#7c5cff"
      navItems={SUPERADMIN_NAV} userName="R. Kulkarni" userMeta="Superadmin · Full Access"
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="dashpage__heading">Global Question Bank</h1>
        <p className="dashpage__subheading">
          Manage the master question pool across every tenant, or scope your additions to a single organisation.
        </p>
      </motion.div>

      {/* ---- Tenant scope selector (superadmin-only) ---- */}
      <SectionCard title="Tenant Scope" subtitle="Choose who these questions belong to" delay={0.02}>
        <div className="sqbscope">
          <HiOutlineGlobeAlt className="sqbscope__icon" />
          <select className="sqbscope__select" value={tenant} onChange={(e) => setTenant(e.target.value)}>
            {TENANTS.map((t) => <option key={t}>{t}</option>)}
          </select>
          <Badge tone={tenant === TENANTS[0] ? "info" : "neutral"}>
            {tenant === TENANTS[0] ? "Visible to all organisations" : "Visible to this tenant only"}
          </Badge>
        </div>
      </SectionCard>

      {/* ---- Bulk upload via Excel ---- */}
      <SectionCard title="Bulk Upload via Excel" subtitle="Fastest way to add a large question set" delay={0.05}>
        <div className="qexcel">
          <a href="#" className="qexcel__sample" onClick={(e) => e.preventDefault()}>
            <HiOutlineArrowDownTray /> Download Sample Excel
          </a>
          <label className="qexcel__drop">
            <HiOutlineArrowUpTray />
            <span>{excelFile ? excelFile.name : "Click to choose a .xls / .xlsx file, or drag it here"}</span>
            <input
              type="file" accept=".xls,.xlsx" hidden
              onChange={(e) => setExcelFile(e.target.files[0] || null)}
            />
          </label>
          <button type="button" className="qexcel__submit" disabled={!excelFile}>
            <HiOutlineDocumentCheck /> Upload &amp; Validate
          </button>
        </div>
      </SectionCard>

      {/* ---- Manually-written question builder (7 patterns) ---- */}
      <SectionCard title="Write a Question Manually" subtitle="Choose a pattern, then fill in its fields" delay={0.12}>
        <div className="qpatterns">
          {QUESTION_PATTERNS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={"qpattern" + (pattern === p.id ? " qpattern--active" : "")}
              onClick={() => setPattern(p.id)}
            >
              <p.icon />
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <form className="qform" onSubmit={handleSave}>
          <div className="qform__common">
            <label className="qfield">
              <span className="qfield__label">Subject</span>
              <input type="text" placeholder="e.g. Quantitative Aptitude" value={draft.subject} onChange={(e) => patch({ subject: e.target.value })} />
            </label>
            <label className="qfield">
              <span className="qfield__label">Topic</span>
              <input type="text" placeholder="e.g. Time & Work" value={draft.topic} onChange={(e) => patch({ topic: e.target.value })} />
            </label>
            <label className="qfield">
              <span className="qfield__label">Difficulty</span>
              <select value={draft.difficulty} onChange={(e) => patch({ difficulty: e.target.value })}>
                <option>Basic</option><option>Moderate</option><option>Hard</option><option>Advanced</option>
              </select>
            </label>
            <label className="qfield">
              <span className="qfield__label">Marks</span>
              <input type="number" min="0" step="0.5" value={draft.marks} onChange={(e) => patch({ marks: e.target.value })} />
            </label>
            <label className="qfield">
              <span className="qfield__label">Negative Marks</span>
              <input type="number" min="0" step="0.25" value={draft.negMarks} onChange={(e) => patch({ negMarks: e.target.value })} />
            </label>
            <label className="qfield">
              <span className="qfield__label">Language</span>
              <select value={draft.language} onChange={(e) => patch({ language: e.target.value })}>
                <option>English</option><option>Hindi</option><option>Marathi</option>
              </select>
            </label>
          </div>

          <div className="qform__pattern">
            <span className="qform__patterntag"><activePattern.icon /> {activePattern.label}</span>
            <span className="qform__patternhint">{activePattern.hint}</span>
          </div>

          <PatternFields pattern={pattern} draft={draft} setDraft={setDraft} />

          <div className="qform__footer">
            <button type="submit" className="qform__save">Save to {tenant === TENANTS[0] ? "Global Pool" : tenant}</button>
            <AnimatePresence>
              {justSaved && (
                <motion.span
                  className="qform__savedtag"
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                >
                  <HiOutlineCheckCircle /> Added to question bank
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </form>
      </SectionCard>

      {/* ---- Live preview of what's been written this session ---- */}
      {saved.length > 0 && (
        <SectionCard title={`Added This Session (${saved.length})`} delay={0.18}>
          <div className="qsavedlist">
            {saved.map((q) => {
              const meta = QUESTION_PATTERNS.find((p) => p.id === q.pattern);
              return (
                <motion.div className="qsaveditem" key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <meta.icon className="qsaveditem__icon" />
                  <div className="qsaveditem__body">
                    <div className="qsaveditem__text">{q.questionText}</div>
                    <div className="qsaveditem__meta">
                      {meta.label} · {q.subject || "No subject"} · {q.difficulty} · {q.marks} mark(s) · {q.tenant}
                    </div>
                  </div>
                  <button type="button" className="qiconbtn" onClick={() => removeSaved(q.id)}><HiOutlineTrash /></button>
                </motion.div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </DashboardLayout>
  );
}

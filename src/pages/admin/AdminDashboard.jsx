/*
TheraPro Admin Dashboard - Single-file React component (AdminDashboard.jsx)

Notes for the beginner:
- This component uses Tailwind CSS for styling. Install and configure Tailwind in your project first.
- Optional dependencies used for nicer UX: framer-motion, recharts, lucide-react. Install them (commands in the setup guide in the chat message).
- This file is intentionally designed to be readable and commented so you can learn how pieces fit together.

What it contains:
- Sidebar + Topbar layout
- Therapist creation form (modal)
- Child profile creation form (modal)
- Assign children -> therapist flow (modal)
- Simple bar chart (children per therapist) using recharts
- Local state persistence to localStorage so you can try it without a backend

Drop this file into `src/components/AdminDashboard.jsx` and import it into your App.
*/

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"
import SidebarLayout from "../../components/AdminSidebarLayout"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Menu,
  User,
  LayoutDashboard,
  Users,
  Settings,
  Calendar as CalendarIcon,
  Search as SearchIcon,
  Plus,
  LogOut,
  Check,
  X,
} from "lucide-react";

// Utility to generate simple IDs (for demo only)
const uid = (prefix = "id") => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

// SAMPLE INITIAL DATA (so dashboard shows something immediately)
const SAMPLE_THERAPISTS = [
  { id: "t1", name: "Karen Baker", email: "karen@therapro.test" },
  { id: "t2", name: "Ryan Harris", email: "ryan@therapro.test" },
];

const SAMPLE_CHILDREN = [
  { id: "c1", name: "Ethan Patterson", age: 9, diagnosis: "ADHD", assignedTo: "t1" },
  { id: "c2", name: "Zoe Kelly", age: 7, diagnosis: "Autism", assignedTo: "t2" },
  { id: "c3", name: "Caleb Garrett", age: 10, diagnosis: "Intellectual Disability", assignedTo: null },
];

export default function AdminDashboard() {
  // --- data states ---
  const [therapists, setTherapists] = useState(() => {
    try {
      const raw = localStorage.getItem("therapro_therapists");
      return raw ? JSON.parse(raw) : SAMPLE_THERAPISTS;
    } catch (e) {
      return SAMPLE_THERAPISTS;
    }
  });

  const [children, setChildren] = useState(() => {
    try {
      const raw = localStorage.getItem("therapro_children");
      return raw ? JSON.parse(raw) : SAMPLE_CHILDREN;
    } catch (e) {
      return SAMPLE_CHILDREN;
    }
  });

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTherapistView, setSelectedTherapistView] = useState(null);

  // form states (simple — no form lib)
  const [therapistForm, setTherapistForm] = useState({ name: "", email: "" });
  const [childForm, setChildForm] = useState({ name: "", age: "", diagnosis: "" });

  const [assignState, setAssignState] = useState({ therapistId: "", childIds: [] });

  // persist to localStorage so the demo is easier to play with
  useEffect(() => {
    localStorage.setItem("therapro_therapists", JSON.stringify(therapists));
  }, [therapists]);

  useEffect(() => {
    localStorage.setItem("therapro_children", JSON.stringify(children));
  }, [children]);

  // --- CRUD-like helpers (client-side only) ---
  function createTherapist({ name, email }) {
    const newItem = { id: uid("t"), name: name.trim(), email: email.trim() };
    setTherapists((s) => [newItem, ...s]);
    setTherapistForm({ name: "", email: "" });
    setShowTherapistModal(false);
  }

  function createChild({ name, age, diagnosis }) {
    const newItem = {
      id: uid("c"),
      name: name.trim(),
      age: Number(age) || null,
      diagnosis: diagnosis.trim(),
      assignedTo: null,
    };
    setChildren((s) => [newItem, ...s]);
    setChildForm({ name: "", age: "", diagnosis: "" });
    setShowChildModal(false);
  }

  function assignChildrenToTherapist(therapistId, childIds) {
    setChildren((prev) =>
      prev.map((ch) => (childIds.includes(ch.id) ? { ...ch, assignedTo: therapistId } : ch))
    );
    setAssignState({ therapistId: "", childIds: [] });
    setShowAssignModal(false);
  }

  // derived data for chart: children count per therapist
  const chartData = useMemo(() => {
    return therapists.map((t) => ({ name: t.name, children: children.filter((c) => c.assignedTo === t.id).length }));
  }, [therapists, children]);

  // helpers for the small lists
  function childrenForTherapist(therapistId) {
    return children.filter((c) => c.assignedTo === therapistId);
  }

  function unassignedChildren() {
    return children.filter((c) => !c.assignedTo);
  }

  // small deletion helpers (demo) — in a real app you'd confirm first
  function removeTherapist(id) {
    // unassign children first
    setChildren((prev) => prev.map((c) => (c.assignedTo === id ? { ...c, assignedTo: null } : c)));
    setTherapists((prev) => prev.filter((t) => t.id !== id));
    if (selectedTherapistView === id) setSelectedTherapistView(null);
  }

  function removeChild(id) {
    setChildren((prev) => prev.filter((c) => c.id !== id));
  }

  // --- small accessible search state ---
  const [search, setSearch] = useState("");
  const filteredTherapists = therapists.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SidebarLayout>
    <div className="min-h-screen text-gray-900 flex">

      

      {/* MAIN AREA */}
      <div className="flex-1 p-6">
        {/* TOPBAR */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 w-full">
            <div className="relative max-w-md flex-1">
              <input
                aria-label="Search therapists"
                placeholder="Search therapists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <SearchIcon size={16} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowAssignModal(true)} className="px-4 py-2 rounded-lg bg-white border">
                Assign
              </button>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">UA</div>
                <div className="text-sm">Unknown User</div>
                <button className="ml-4 p-2 rounded-md hover:bg-gray-100">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Lists and forms */}
          <section className="lg:col-span-2 space-y-6">
            <Card title={`Therapists (${therapists.length})`}>
              <div className="space-y-3">
                {filteredTherapists.map((t) => (
                  <div key={t.id} className="flex items-center justify-between bg-white rounded-xl p-3 border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-semibold">{t.name.split(" ")[0][0] || "T"}</div>
                      <div>
                        <div className="font-medium">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTherapistView(t.id)}
                        className="px-3 py-1 rounded-full border text-sm"
                      >
                        View ({childrenForTherapist(t.id).length})
                      </button>
                      <button onClick={() => removeTherapist(t.id)} title="Remove" className="px-2 py-1 rounded-md border">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button onClick={() => setShowTherapistModal(true)} className="px-4 py-2 rounded-lg bg-green-50">
                    + Add therapist
                  </button>
                </div>
              </div>
            </Card>

            <Card title={`Children (${children.length})`}>
              <div className="space-y-3">
                {children.map((c) => (
                  <div key={c.id} className="flex items-center justify-between bg-white rounded-xl p-3 border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center font-semibold">{c.name.split(" ")[0][0] || "C"}</div>
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.age} yrs • {c.diagnosis} • {c.assignedTo ? therapists.find((t)=>t.id===c.assignedTo)?.name : 'Unassigned'}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => removeChild(c.id)} className="px-2 py-1 rounded-md border">Remove</button>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button onClick={() => setShowChildModal(true)} className="px-4 py-2 rounded-lg bg-green-50">
                    + Add child
                  </button>
                </div>
              </div>
            </Card>

            {/* Selected therapist detail */}
            {selectedTherapistView && (
              <Card title="Therapist details">
                <div>
                  <div className="font-semibold">{therapists.find((t) => t.id === selectedTherapistView)?.name}</div>
                  <div className="text-sm text-gray-500 mb-3">{therapists.find((t) => t.id === selectedTherapistView)?.email}</div>
                  <div className="text-sm font-medium">Assigned children</div>
                  <ul className="mt-2 space-y-2">
                    {childrenForTherapist(selectedTherapistView).map((c) => (
                      <li key={c.id} className="bg-white p-2 rounded-md border flex items-center justify-between">
                        <span>{c.name} · {c.age} yrs</span>
                        <span className="text-xs text-gray-500">{c.diagnosis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </section>

          {/* RIGHT: Analytics / Calendar */}
          <aside className="space-y-6">
            <Card title="Assignments overview">
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                    <XAxis dataKey="name" hide={false} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="children" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-xs text-gray-500">Shows number of children assigned to each therapist.</div>
            </Card>

            <Card title="Quick actions">
              <div className="flex flex-col gap-2">
                <button onClick={() => { setShowTherapistModal(true); }} className="w-full p-2 rounded-lg border">Add Therapist</button>
                <button onClick={() => { setShowChildModal(true); }} className="w-full p-2 rounded-lg border">Add Child</button>
                <button onClick={() => { setShowAssignModal(true); }} className="w-full p-2 rounded-lg border">Assign children</button>
              </div>
            </Card>

            <Card title="Calendar">
              <div className="text-sm text-gray-600">(Placeholder) Add a small calendar or integrate a date-picker here.</div>
            </Card>
          </aside>
        </main>
      </div>

      {/* ---------- MODALS ---------- */}
      <AnimatePresence>
        {showTherapistModal && (
          <Modal dismiss={() => setShowTherapistModal(false)} title="Add Therapist">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!therapistForm.name || !therapistForm.email) return alert("Please add name and email");
                createTherapist(therapistForm);
              }}
            >
              <label className="block mb-2 text-sm">Name</label>
              <input className="w-full p-2 rounded-md border mb-3" value={therapistForm.name} onChange={(e) => setTherapistForm({ ...therapistForm, name: e.target.value })} />

              <label className="block mb-2 text-sm">Email</label>
              <input type="email" className="w-full p-2 rounded-md border mb-3" value={therapistForm.email} onChange={(e) => setTherapistForm({ ...therapistForm, email: e.target.value })} />

              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setShowTherapistModal(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white">Add</button>
              </div>
            </form>
          </Modal>
        )}

        {showChildModal && (
          <Modal dismiss={() => setShowChildModal(false)} title="Create Child profile">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!childForm.name) return alert("Please add the child's name");
                createChild(childForm);
              }}
            >
              <label className="block mb-2 text-sm">Name</label>
              <input className="w-full p-2 rounded-md border mb-3" value={childForm.name} onChange={(e) => setChildForm({ ...childForm, name: e.target.value })} />

              <label className="block mb-2 text-sm">Age</label>
              <input type="number" className="w-full p-2 rounded-md border mb-3" value={childForm.age} onChange={(e) => setChildForm({ ...childForm, age: e.target.value })} />

              <label className="block mb-2 text-sm">Diagnosis / Notes</label>
              <input className="w-full p-2 rounded-md border mb-3" value={childForm.diagnosis} onChange={(e) => setChildForm({ ...childForm, diagnosis: e.target.value })} />

              <div className="flex gap-2 justify-end mt-4">
                <button type="button" onClick={() => setShowChildModal(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white">Create</button>
              </div>
            </form>
          </Modal>
        )}

        {showAssignModal && (
          <Modal dismiss={() => setShowAssignModal(false)} title="Assign children to therapist">
            <div>
              <label className="block mb-2 text-sm">Select therapist</label>
              <select
                value={assignState.therapistId}
                onChange={(e) => setAssignState((s) => ({ ...s, therapistId: e.target.value }))}
                className="w-full p-2 rounded-md border mb-3"
              >
                <option value="">-- pick --</option>
                {therapists.map((t) => (
                  <option value={t.id} key={t.id}>{t.name}</option>
                ))}
              </select>

              <label className="block mb-2 text-sm">Pick children</label>
              <div className="max-h-40 overflow-auto border rounded-md p-2 mb-3">
                {children.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 p-1">
                    <input
                      type="checkbox"
                      checked={assignState.childIds.includes(c.id)}
                      onChange={(e) => {
                        setAssignState((s) => ({
                          ...s,
                          childIds: e.target.checked ? [...s.childIds, c.id] : s.childIds.filter((id) => id !== c.id),
                        }));
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.diagnosis}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAssignModal(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                <button
                  onClick={() => {
                    if (!assignState.therapistId || assignState.childIds.length === 0) return alert("Pick a therapist and at least one child");
                    assignChildrenToTherapist(assignState.therapistId, assignState.childIds);
                  }}
                  className="px-4 py-2 rounded-md bg-green-600 text-white"
                >
                  Assign
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
    </SidebarLayout>
  );
}

// -------- Components used inside the file --------

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      {title && <h3 className="font-semibold mb-3">{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

function NavItem({ label, icon, open = true }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
      <div className="text-gray-600">{icon}</div>
      <span className={`${open ? "" : "hidden"}`}>{label}</span>
    </div>
  );
}

function Modal({ children, dismiss, title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center"
    >
      <div onClick={dismiss} className="absolute inset-0 bg-black/30" />
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="bg-white rounded-2xl p-6 z-50 w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">{title}</h4>
          <button onClick={dismiss} aria-label="Close" className="p-2 rounded-md hover:bg-gray-100"><X size={16} /></button>
        </div>
        <div>{children}</div>
      </motion.div>
    </motion.div>
  );
}

// small helper icon for list
function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M8 6h13"></path>
      <path d="M8 12h13"></path>
      <path d="M8 18h13"></path>
      <path d="M3 6h.01"></path>
      <path d="M3 12h.01"></path>
      <path d="M3 18h.01"></path>
    </svg>
    
  );
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getDatabase, ref, get, set, update, remove, push, onValue, serverTimestamp as rtdbServerTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyANMc19iCyG_zLnmevLn9xYFjOxJpEiwz4",
  authDomain: "pcp-form-4a4cb.firebaseapp.com",
  projectId: "pcp-form-4a4cb",
  storageBucket: "pcp-form-4a4cb.firebasestorage.app",
  messagingSenderId: "263854348596",
  appId: "1:263854348596:web:71e106b2be1965f6062d61",
  measurementId: "G-0V02769MQ2",
  databaseURL: "https://pcp-form-4a4cb-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Compatibility layer: keeps the existing UI API while all data is stored in RTDB.
function normalizeSegments(parts){
  const p=parts.filter(v=>v!==undefined&&v!==null&&String(v)!=="").map(String);
  // Old Firestore subcollection forms/{id}/responses -> RTDB /responses/{id}
  if(p[0]==="forms" && p.length>=3 && p[2]==="responses") return ["responses",p[1],...p.slice(3)];
  return p;
}
function pathOf(parts){ return normalizeSegments(parts).join("/"); }
function doc(_db,...parts){ return {kind:"doc",parts:normalizeSegments(parts),path:pathOf(parts)}; }
function collection(_db,...parts){ return {kind:"collection",parts:normalizeSegments(parts),path:pathOf(parts)}; }
function collectionGroup(_db,name){ return collection(_db,name); }
function snapFor(key,value){ return {id:key,exists:()=>value!==null&&value!==undefined,data:()=>value,val:()=>value}; }
async function getDoc(r){ const s=await get(ref(db,r.path)); return snapFor(r.parts.at(-1),s.val()); }
async function getDocs(r){
  const s=await get(ref(db,r.path)); const value=s.val()||{};
  const docs=Object.entries(value).map(([k,v])=>snapFor(k,v));
  return {docs,size:docs.length,empty:docs.length===0,forEach:(fn)=>docs.forEach(fn)};
}
async function setDoc(r,data,opts={}){ if(opts.merge){ const old=(await get(ref(db,r.path))).val()||{}; await set(ref(db,r.path),deepMerge(old,data)); } else await set(ref(db,r.path),data); }
async function updateDoc(r,data){ await update(ref(db,r.path),data); }
async function deleteDoc(r){ await remove(ref(db,r.path)); }
async function addDoc(r,data){ const n=push(ref(db,r.path)); await set(n,data); return {id:n.key,path:`${r.path}/${n.key}`}; }
function serverTimestamp(){ return rtdbServerTimestamp(); }
function onSnapshot(r,cb,err){ return onValue(ref(db,r.path),s=>{ const value=s.val(); if(r.kind==="collection"){const docs=Object.entries(value||{}).map(([k,v])=>snapFor(k,v));cb({docs,size:docs.length,empty:docs.length===0,forEach:fn=>docs.forEach(fn)});}else cb(snapFor(r.parts.at(-1),value)); },err); }
function query(r){ return r; } function where(){return null} function orderBy(){return null} function limit(){return null}
async function getCountFromServer(r){ const q=await getDocs(r); return {data:()=>({count:q.size})}; }
function deepMerge(a,b){ if(!b||typeof b!=="object"||Array.isArray(b))return b; const out={...(a||{})}; for(const[k,v]of Object.entries(b)) out[k]=(v&&typeof v==="object"&&!Array.isArray(v))?deepMerge(out[k],v):v; return out; }

// One theme controller for every page, including the admin console.
function applyTheme(theme){
  const t=theme==="light"?"light":"dark";
  document.documentElement.dataset.theme=t;
  if(document.body) document.body.classList.toggle("light",t==="light");
  localStorage.setItem("pcp-theme",t);
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>{b.textContent=t==="light"?"☀  LIGHT":"☾  DARK"; b.setAttribute("aria-label",`Switch to ${t==="light"?"dark":"light"} theme`)});
}
function toggleTheme(){ applyTheme((localStorage.getItem("pcp-theme")||"dark")==="light"?"dark":"light"); }
function mountThemeControl(){
  applyTheme(localStorage.getItem("pcp-theme")||"dark");
  if(document.body?.classList.contains("admin-body") && !document.querySelector("[data-theme-toggle]")){
    const host=document.querySelector(".side-foot")||document.querySelector(".top-actions");
    if(host){const b=document.createElement("button");b.type="button";b.className="btn theme-control";b.dataset.themeToggle="";host.prepend(b);b.addEventListener("click",toggleTheme);applyTheme(localStorage.getItem("pcp-theme")||"dark");}
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(b=>{ if(!b.dataset.themeBound){b.dataset.themeBound="1";b.addEventListener("click",toggleTheme);} });
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",mountThemeControl); else mountThemeControl();

export { app,auth,db,onAuthStateChanged,signInWithEmailAndPassword,signOut,sendPasswordResetEmail,collection,collectionGroup,doc,getDoc,getDocs,addDoc,setDoc,updateDoc,deleteDoc,query,where,orderBy,limit,serverTimestamp,getCountFromServer,onSnapshot,applyTheme,toggleTheme };

import { auth, db, onAuthStateChanged, signOut } from './firebase.js';
import { ref, get, update, set } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js';
const $=id=>document.getElementById(id);
const stateRef=ref(db,'siteSettings/general');
const live=$('goLive'), maintenance=$('goMaintenance'), editor=$('maintEditor'), msg=$('msg'), diag=$('statusDiagnostics');
let user=null, busy=false;
function message(text,error=false){msg.textContent=text;msg.style.color=error?'#b42318':'#08764a'; if(error){diag.hidden=false;diag.textContent=text;}else{diag.hidden=true;diag.textContent='';}}
function render(data){const isMaintenance=data.releaseState==='maintenance';for(const id of ['topState','bigState']){const el=$(id);el.textContent=isMaintenance?'MAINTENANCE':'LIVE';el.className='status-chip '+(isMaintenance?'maintenance':'live');}live.classList.toggle('active',!isMaintenance);maintenance.classList.toggle('active',isMaintenance);$('maintTitle').value=data.maintenanceTitle||'WEBSITE SEDANG DALAM MAINTENANCE';$('maintMessage').value=data.maintenanceDescription||'Kami sedang melakukan pemeliharaan sistem.';$('maintUntil').value=data.maintenanceUntil||'';}
async function load(){const snap=await get(stateRef);if(!snap.exists()){message('Konfigurasi siteSettings/general belum ada. Tombol LIVE dapat membuatnya.',true);return;}render(snap.val()||{});}
function lock(value){busy=value;live.disabled=value;maintenance.disabled=value;$('confirmMaint').disabled=value;}
async function save(next,expected){if(busy)return;if(!user){message('Sesi admin tidak aktif. Login ulang.',true);return;}lock(true);message('Menyimpan status ke Firebase…');try{const snap=await get(stateRef);if(snap.exists())await update(stateRef,next);else await set(stateRef,next);const verified=(await get(stateRef)).val();if(verified?.releaseState!==expected)throw Error('Verifikasi gagal: database belum mengembalikan '+expected);render(verified);editor.classList.remove('open');message('Berhasil: website '+expected.toUpperCase()+' (terverifikasi dari database).');}catch(e){console.error('PCP status update failed',e);message('Gagal mengubah status: '+e.message+' | UID: '+(user?.uid||'belum login')+' | Database: pcp-form-4a4cb-default-rtdb. Pastikan Rules RTDB sudah Publish dan akun punya akses tulis.',true);}finally{lock(false);}}
// Attach handlers before Firebase initializes so clicks always show useful feedback.
live.addEventListener('click',()=>save({releaseState:'live',released:true,enabled:false,maintenanceUntil:'',updatedAt:Date.now(),updatedBy:user?.uid||''},'live'));
maintenance.addEventListener('click',()=>{if(!user){message('Login admin terlebih dahulu.',true);return;}editor.classList.add('open');$('maintTitle').focus();});
$('cancelMaint').addEventListener('click',()=>editor.classList.remove('open'));
$('confirmMaint').addEventListener('click',()=>save({releaseState:'maintenance',released:false,enabled:true,maintenanceTitle:$('maintTitle').value.trim()||'WEBSITE SEDANG DALAM MAINTENANCE',maintenanceDescription:$('maintMessage').value.trim()||'Kami sedang melakukan pemeliharaan sistem.',maintenanceUntil:$('maintUntil').value||'',updatedAt:Date.now(),updatedBy:user?.uid||''},'maintenance'));
$('logout')?.addEventListener('click',async()=>{await signOut(auth);location.replace('./index.html');});
onAuthStateChanged(auth,async u=>{user=u;if(!u){location.replace('./index.html');return;}try{await load();}catch(e){message('Gagal membaca status: '+e.message+' | UID: '+u.uid,true);}});

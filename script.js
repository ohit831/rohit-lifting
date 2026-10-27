const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const exercises = [
 {name:"Barbell Bench Press",muscle:"Chest",sets:"4 × 6–10",cue:"Keep shoulder blades stable, wrists stacked, and lower under control.",img:"photo-1534438327276-14e5300c3a48"},
 {name:"Incline Dumbbell Press",muscle:"Chest",sets:"3 × 8–12",cue:"Use a comfortable incline and avoid bouncing at the bottom.",img:"photo-1583454110551-21f2fa2afe61"},
 {name:"Lat Pulldown",muscle:"Back",sets:"3 × 8–12",cue:"Pull elbows toward your ribs; don't swing your torso.",img:"photo-1534367610401-9f5ed68180aa"},
 {name:"Seated Cable Row",muscle:"Back",sets:"3 × 8–12",cue:"Keep your chest tall and finish by drawing shoulder blades back.",img:"photo-1581009146145-b5ef050c2e1e"},
 {name:"Goblet Squat",muscle:"Legs",sets:"3 × 8–12",cue:"Brace your core, keep feet planted, and use a pain-free depth.",img:"photo-1579758629938-03607ccdbaba"},
 {name:"Romanian Deadlift",muscle:"Legs",sets:"3 × 8–10",cue:"Hinge at the hips, keep the weight close, and maintain a neutral back.",img:"photo-1517836357463-d25dfeac3438"},
 {name:"Dumbbell Shoulder Press",muscle:"Shoulders",sets:"3 × 8–12",cue:"Keep ribs down and press without forcing a painful range.",img:"photo-1534438327276-14e5300c3a48"},
 {name:"Dumbbell Lateral Raise",muscle:"Shoulders",sets:"3 × 12–15",cue:"Raise with control and stop around shoulder height.",img:"photo-1583454110551-21f2fa2afe61"},
 {name:"Dumbbell Curl",muscle:"Arms",sets:"3 × 10–12",cue:"Keep elbows near your sides; avoid using body momentum.",img:"photo-1581009146145-b5ef050c2e1e"},
 {name:"Cable Triceps Pushdown",muscle:"Arms",sets:"3 × 10–15",cue:"Keep elbows steady and control the return.",img:"photo-1534367610401-9f5ed68180aa"},
 {name:"Plank",muscle:"Core",sets:"3 × 30–60 sec",cue:"Keep a straight line from head to heels and breathe steadily.",img:"photo-1517836357463-d25dfeac3438"},
 {name:"Dead Bug",muscle:"Core",sets:"3 × 8–10 / side",cue:"Keep lower back gently anchored and move slowly.",img:"photo-1579758629938-03607ccdbaba"}
];
const imgUrl = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=75`;
function renderExercises(){
 const query = ($("#exerciseSearch").value||"").toLowerCase();
 const muscle = $("#muscleFilter").value;
 const filtered = exercises.filter(e => (e.name+" "+e.muscle).toLowerCase().includes(query) && (muscle==="all"||e.muscle===muscle));
 $("#exerciseGrid").innerHTML = filtered.length ? filtered.map(e=>`<article class="exercise-card"><div class="exercise-photo"><img loading="lazy" src="${imgUrl(e.img)}" alt="${e.name} exercise reference"><span class="muscle-tag">${e.muscle}</span></div><div class="exercise-info"><h3>${e.name}</h3><p>${e.cue}</p><div class="exercise-meta"><span>${e.sets}</span><span>FORM FIRST ↗</span></div></div></article>`).join("") : `<p class="muted">No exercises found. Try another search.</p>`;
}
$("#exerciseSearch").addEventListener("input",renderExercises);
$("#muscleFilter").addEventListener("change",renderExercises);
renderExercises();

const plans = {
 "Day 1 — Chest + Triceps":["Bench press — 4 × 6–10","Incline dumbbell press — 3 × 8–12","Cable fly — 3 × 12–15","Triceps pushdown — 3 × 10–15"],
 "Day 2 — Back + Biceps":["Lat pulldown — 4 × 8–12","Seated row — 3 × 8–12","Romanian deadlift — 3 × 8–10","Dumbbell curl — 3 × 10–12"],
 "Day 3 — Legs + Shoulders":["Squat or leg press — 4 × 6–10","Leg curl — 3 × 10–15","Calf raise — 3 × 12–15","Shoulder press — 3 × 8–12"],
 "Day 4 — Chest + Triceps":["Incline press — 4 × 8–12","Machine chest press — 3 × 10–12","Lateral raise — 3 × 12–15","Overhead triceps extension — 3 × 10–12"],
 "Day 5 — Back + Biceps":["Chest-supported row — 4 × 8–12","Pulldown — 3 × 10–12","Face pull — 3 × 12–15","Hammer curl — 3 × 10–12"],
 "Day 6 — Legs + Shoulders":["Leg press — 4 × 10–12","Romanian deadlift — 3 × 8–10","Leg extension — 3 × 12–15","Lateral raise — 3 × 12–15"],
 "Day 7 — Rest / Recovery":["Easy walk or light mobility","Eat and hydrate well","Prioritize sleep and recovery"]
};
function showDay(){const day=$("#daySelect").value;$("#dayPlan").innerHTML=`<h3>${day}</h3><ul>${plans[day].map(x=>`<li>${x}</li>`).join("")}</ul>`}
$("#daySelect").addEventListener("change",showDay);showDay();
const dateKey=()=>new Date().toISOString().slice(0,10);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function write(key,val){localStorage.setItem(key,JSON.stringify(val))}
function weekStart(){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return d.toISOString().slice(0,10)}
function updateWorkoutStats(){
 const logs=read("rl_workouts",[]),start=weekStart(),count=logs.filter(x=>x.date>=start).length;
 $("#weeklyCount").textContent=count;$("#consistency").textContent=Math.min(100,Math.round(count/6*100))+"%";$("#weeklyBar").style.width=Math.min(100,count/6*100)+"%";
}
$("#completeWorkout").addEventListener("click",()=>{const day=$("#daySelect").value;if(day.startsWith("Day 7")){$("#workoutFeedback").textContent="Rest day selected — recovery counts too.";return}const logs=read("rl_workouts",[]);logs.push({day,date:dateKey()});write("rl_workouts",logs);updateWorkoutStats();$("#workoutFeedback").textContent="Workout logged on this device. Great work!";});
updateWorkoutStats();

function updateMeals(){const checks=$$("#mealList input"),n=checks.filter(c=>c.checked).length;$("#mealCount").innerHTML=`${n} <em>/ ${checks.length}</em>`;$("#mealBar").style.width=(n/checks.length*100)+"%";write("rl_meals",checks.filter(c=>c.checked).map(c=>c.value))}
const savedMeals=read("rl_meals",[]);$$("#mealList input").forEach(c=>{c.checked=savedMeals.includes(c.value);c.addEventListener("change",updateMeals)});updateMeals();
$("#calorieTarget").addEventListener("change",e=>write("rl_calories",Number(e.target.value)));
$("#proteinTarget").addEventListener("change",e=>write("rl_protein",Number(e.target.value)));
$("#calorieTarget").value=read("rl_calories",2850);$("#proteinTarget").value=read("rl_protein",145);

$("#logDate").value=dateKey();
function renderProgress(){const logs=read("rl_progress",[]).sort((a,b)=>b.date.localeCompare(a.date));$("#progressList").innerHTML=logs.length?logs.slice(0,10).map(x=>`<div class="history-item"><div><strong>${x.weight} kg</strong><p>${x.date}${x.note?" · "+escapeHtml(x.note):""}</p></div><span>BODY LOG</span></div>`).join(""):`<p class="muted">Your saved entries will appear here.</p>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("#progressForm").addEventListener("submit",e=>{e.preventDefault();const logs=read("rl_progress",[]);logs.push({date:$("#logDate").value,weight:Number($("#weightInput").value),note:$("#noteInput").value.trim()});write("rl_progress",logs);$("#progressFeedback").textContent="Progress saved on this device.";$("#weightInput").value="";$("#noteInput").value="";renderProgress()});
$("#clearProgress").addEventListener("click",()=>{if(confirm("Delete all saved progress logs from this browser?")){write("rl_progress",[]);renderProgress()}});
renderProgress();

const chatReplies=[
 {keys:["workout","split","plan"],reply:"A simple split is chest + triceps, back + biceps, legs + shoulders, then repeat if recovery is good. Start with controlled technique and leave 1–3 reps in reserve on most sets."},
 {keys:["protein","diet","food","meal","calorie"],reply:"Build meals around a protein source, carbs, vegetables or fruit, and enough healthy fats. Your calorie and protein targets should fit your body and goal; change them gradually and track results."},
 {keys:["form","technique","deadlift","squat","bench"],reply:"Use a load you can control, move through a comfortable range, and avoid sharp pain. Record a set from the side or ask a qualified coach to check technique."},
 {keys:["rest","sleep","recovery","sore"],reply:"Recovery is part of training. Aim for consistent sleep, hydration and rest between hard sessions. If pain is sharp, worsening or persistent, stop that movement and seek qualified advice."},
 {keys:["beginner","start","new"],reply:"Start with 2–4 manageable sessions each week, learn basic movement patterns, and increase reps or load slowly. Consistency and technique matter more than max weight."}
];
function addMessage(text,who){const el=document.createElement("div");el.className="message "+who;el.textContent=text;$("#chatMessages").appendChild(el);$("#chatMessages").scrollTop=$("#chatMessages").scrollHeight}
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();const text=$("#chatInput").value.trim();if(!text)return;addMessage(text,"user");$("#chatInput").value="";const lower=text.toLowerCase();const found=chatReplies.find(r=>r.keys.some(k=>lower.includes(k)));const reply=found?found.reply:"I’m running in demo mode, so I can answer common training, form, recovery and nutrition questions. For a real AI conversation, connect a backend API securely—never put a private API key in this browser code.";setTimeout(()=>addMessage(reply,"bot"),250)});

$("#year").textContent=new Date().getFullYear();
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));
$$('#nav a').forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));

// Demo-only local profile. Never use this for real passwords or sensitive accounts.
const dialog=$("#authDialog");let signup=false;
function setAuthMode(){ $("#authTitle").innerHTML=signup?'Create your <span>account</span>':'Welcome <span>back</span>';$("#authName").style.display=signup?"block":"none";$("#authName").required=signup;$("#authSubmit").textContent=signup?"Create demo account":"Sign in";$("#switchAuth").textContent=signup?"Already have an account? Sign in":"New here? Create an account"}
setAuthMode();
$("#authButton").addEventListener("click",()=>{const user=read("rl_user",null);if(user){if(confirm(`Signed in as ${user.name||user.email} in demo mode. Sign out?`)){localStorage.removeItem("rl_user");$("#authButton").textContent="Login / Sign up"}return}dialog.showModal()});
$("#closeAuth").addEventListener("click",()=>dialog.close());
$("#switchAuth").addEventListener("click",()=>{signup=!signup;$("#authFeedback").textContent="";setAuthMode()});
$("#authForm").addEventListener("submit",e=>{e.preventDefault();const email=$("#authEmail").value.trim().toLowerCase(),password=$("#authPassword").value;let users=read("rl_users",{});if(signup){if(users[email]){$("#authFeedback").textContent="An account already exists in this browser.";return}users[email]={name:$("#authName").value.trim(),password};write("rl_users",users)}else if(!users[email]||users[email].password!==password){$("#authFeedback").textContent="Demo account not found or password doesn't match. Create an account first.";return}const user={name:users[email].name||email.split("@")[0],email};write("rl_user",user);$("#authButton").textContent=`Hi, ${user.name}`;$("#authFeedback").textContent="Demo sign-in successful.";setTimeout(()=>dialog.close(),500)});
const existingUser=read("rl_user",null);if(existingUser)$("#authButton").textContent=`Hi, ${existingUser.name}`;

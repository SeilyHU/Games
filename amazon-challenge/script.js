// ==========================================================
// PREGUNTAS PROVISIONALES
// Cuando esté lista la exposición, aquí cambiaremos títulos,
// categorías y preguntas para que todo salga de lo expuesto.
// ==========================================================
const questions = [
  {"cat": "HISTORIA DE AMAZON Y AWS", "value": 100, "q": "¿En qué año fue fundada Amazon?", "a": ["2000", "1994", "2006", "1998"], "correct": 1},
  {"cat": "HISTORIA DE AMAZON Y AWS", "value": 200, "q": "¿Qué vendía Amazon cuando comenzó?", "a": ["Computadoras", "Ropa", "Libros", "Celulares"], "correct": 2},
  {"cat": "HISTORIA DE AMAZON Y AWS", "value": 300, "q": "¿En qué año se lanzaron los primeros servicios de AWS?", "a": ["1995", "2010", "2006", "2000"], "correct": 2},
  {"cat": "HISTORIA DE AMAZON Y AWS", "value": 400, "q": "¿Quién fue el fundador de Amazon?", "a": ["Bill Gates", "Steve Jobs", "Andy Jassy", "Jeff Bezos"], "correct": 3},
  {"cat": "HISTORIA DE AMAZON Y AWS", "value": 500, "q": "¿Cuál fue una de las principales razones por las que surgió AWS?", "a": ["Crear redes sociales", "Vender computadoras", "Desarrollar videojuegos", "Ofrecer infraestructura tecnológica a otras empresas"], "correct": 3},
  {"cat": "SERVICIOS DE AWS", "value": 100, "q": "¿Qué servicio se usa para guardar fotos, videos y documentos estáticos?", "a": ["Amazon EC2", "Amazon S3", "AWS Lambda", "Amazon Route 53"], "correct": 1},
  {"cat": "SERVICIOS DE AWS", "value": 200, "q": "¿Cuál es la principal función de Amazon EC2?", "a": ["Crear máquinas virtuales en la nube", "Enviar correos masivos", "Gestionar dominios web", "Guardar copias de seguridad en frío"], "correct": 0},
  {"cat": "SERVICIOS DE AWS", "value": 300, "q": "¿Qué característica define a AWS Lambda?", "a": ["Necesita servidores encendidos 24/7 administrados por el usuario", "Permite ejecutar código sin administrar servidores", "Es un motor de base de datos relacional", "Requiere mantenimiento manual de hardware"], "correct": 1},
  {"cat": "SERVICIOS DE AWS", "value": 400, "q": "¿Para qué sirve AWS IAM?", "a": ["Procesar pagos con tarjeta", "Distribuir contenido multimedia", "Administrar usuarios y permisos", "Monitorear la temperatura de servidores"], "correct": 2},
  {"cat": "SERVICIOS DE AWS", "value": 500, "q": "¿Qué servicio de AWS ayuda a distribuir contenido para que las páginas carguen más rápido?", "a": ["Amazon RDS", "Amazon CloudFront", "Amazon EC2", "AWS IAM"], "correct": 1},
  {"cat": "COMPUTACIÓN EN LA NUBE", "value": 100, "q": "¿Qué significa AWS?", "a": ["Amazon Web Services", "Advanced Web System", "Amazon Wireless Server", "Application Web Software"], "correct": 0},
  {"cat": "COMPUTACIÓN EN LA NUBE", "value": 200, "q": "¿Qué es la computación en la nube?", "a": ["Guardar todo únicamente en una memoria USB", "Utilizar recursos informáticos a través de Internet", "Trabajar sin servidores", "Instalar programas únicamente en una computadora"], "correct": 1},
  {"cat": "COMPUTACIÓN EN LA NUBE", "value": 300, "q": "¿Cuál de los siguientes es un modelo de servicio en la nube?", "a": ["HTML", "HTTP", "IaaS", "CSS"], "correct": 2},
  {"cat": "COMPUTACIÓN EN LA NUBE", "value": 400, "q": "¿Cuáles son los tres modelos de despliegue de nube mencionados en la exposición?", "a": ["Local, internacional y universal", "Pública, privada e híbrida", "Física, digital y virtual", "Gratuita, comercial y empresarial"], "correct": 1},
  {"cat": "COMPUTACIÓN EN LA NUBE", "value": 500, "q": "¿Qué característica permite aumentar o disminuir recursos tecnológicos según la demanda?", "a": ["Compresión", "Escalabilidad", "Maquetación", "Encriptación"], "correct": 1},
  {"cat": "AWS EN LA PRÁCTICA Y COSTOS", "value": 100, "q": "¿Qué lenguaje de programación se utilizó para la aplicación web publicada en AWS?", "a": ["Java", "C++", "PHP", "Python"], "correct": 2},
  {"cat": "AWS EN LA PRÁCTICA Y COSTOS", "value": 200, "q": "¿Qué sistema operativo se utilizó en la instancia EC2 del ejemplo práctico?", "a": ["Windows 11", "Ubuntu", "macOS", "Android"], "correct": 1},
  {"cat": "AWS EN LA PRÁCTICA Y COSTOS", "value": 300, "q": "¿Qué programas se instalaron para ejecutar la aplicación PHP en EC2?", "a": ["Apache2 y PHP", "Photoshop y Excel", "Docker y Android Studio", "Word y PowerPoint"], "correct": 0},
  {"cat": "AWS EN LA PRÁCTICA Y COSTOS", "value": 400, "q": "¿Qué significa el modelo de pago por uso de AWS?", "a": ["Pagar siempre una cuota fija sin importar el consumo", "Pagar únicamente cuando se compra un servidor físico", "Pagar según los recursos y servicios utilizados", "Todos los servicios son gratuitos"], "correct": 2},
  {"cat": "AWS EN LA PRÁCTICA Y COSTOS", "value": 500, "q": "¿Qué puerto se habilitó para permitir el acceso HTTP a la aplicación PHP publicada en EC2?", "a": ["21", "22", "80", "3306"], "correct": 2}
];

let teams = Array.from({length:6},(_,i)=>({id:i+1,score:0,steals:2}));
let currentTeam = 1;
let used = new Set();
let currentQuestionIndex = null;
let timerId = null;
let timeLeft = 15;
let questionLocked = false;
let stealingTeam = null;
let stealTimeLeft = 8;

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function startGame(){
  resetState();
  renderBoard();
  renderScoreboard();
  showScreen("gameScreen");
}
function resetState(){
  teams=Array.from({length:6},(_,i)=>({id:i+1,score:0,steals:2}));
  currentTeam=1;used=new Set();currentQuestionIndex=null;stealingTeam=null;
  clearInterval(timerId);
}
function renderScoreboard(){
  const box=document.getElementById("scoreboard");
  if(!box)return;
  box.innerHTML=teams.map(t=>`
    <div class="score ${t.id===currentTeam?"current":""}">
      <div class="score-top"><span>GRUPO ${t.id}</span><span class="score-fires">${'<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 16c3.5 0 5.5-2.5 5.5-5.4 0-2.5-1.5-4-2-5-.5 2-1.5 2.5-2 2.5C9 5 7 3 7 0 5 2 2.5 5 2.5 10.6 2.5 13.5 4.5 16 8 16z"/><path d="M8 15c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.8-1-2.5 0 1-1 1.5-1.5 1.5 0-1.5-1-2-1-3-1 1.5-1.5 2.5-1.5 4 0 1.5 1 2.5 2.5 2.5z" fill="currentColor"/></svg>'.repeat(t.steals)}${"○".repeat(2-t.steals)}</span></div>
      <div class="score-points">${t.score} <small>pts</small></div>
    </div>`).join("");
  document.getElementById("turnBanner").innerHTML=`Turno del <strong>Grupo ${currentTeam}</strong> — elijan una categoría y puntaje`;
}
const ICONS={};
function categoryIcon(cat){
  if(cat.includes("HISTORIA"))return '<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="15" r="1"/><circle cx="13" cy="15" r="1"/><path d="M0 1h2l2.4 10.4a2 2 0 0 0 2 1.6h7a2 2 0 0 0 2-1.6L17 4H3"/></svg>';
  if(cat.includes("SERVICIOS"))return '<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.406 13.342A5.53 5.53 0 0 1 4 11a5.5 5.5 0 0 1 10.72-1.747A3.5 3.5 0 1 1 13.5 16H5a5 5 0 0 1-.594-2.658Z"/></svg>';
  if(cat.includes("COMPUTACIÓN"))return '<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><path d="M1 8h14M8 1a12 12 0 0 1 0 14M8 1a12 12 0 0 0 0 14"/></svg>';
  return '<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="12" height="9" rx="1"/><path d="M0 13h16l-1 2H1z"/></svg>';
}
function renderBoard(){
  const cats=[...new Set(questions.map(q=>q.cat))];
  document.getElementById("board").innerHTML=cats.map(cat=>{
    const items=questions.map((q,i)=>({...q,i})).filter(q=>q.cat===cat);
    return `<div class="category card"><h3>${categoryIcon(cat)} ${cat}</h3>${items.map(q=>`
      <button class="value-btn" ${used.has(q.i)?"disabled":""} onclick="openQuestion(${q.i})">${q.value}</button>`).join("")}</div>`;
  }).join("");
}
function openQuestion(index){
  if(used.has(index))return;
  currentQuestionIndex=index;questionLocked=false;timeLeft=15;
  const q=questions[index];
  document.getElementById("questionCategory").textContent=q.cat;
  document.getElementById("questionValue").textContent=`${q.value} PUNTOS`;
  document.getElementById("playingGroup").textContent=`Responde Grupo ${currentTeam}`;
  document.getElementById("questionText").textContent=q.q;
  document.getElementById("answers").innerHTML=q.a.map((x,i)=>`
    <button class="answer" onclick="normalAnswer(${i})"><b>${"ABCD"[i]}.</b>${x}</button>`).join("");
  showScreen("questionScreen");
  startNormalTimer();
}
function startNormalTimer(){
  clearInterval(timerId);updateNormalTimer();
  timerId=setInterval(()=>{
    timeLeft--;updateNormalTimer();
    if(timeLeft<=0){clearInterval(timerId);openSteal("⌛ El tiempo del Grupo "+currentTeam+" terminó.");}
  },1000);
}
function updateNormalTimer(){
  const el=document.getElementById("timer");el.textContent=timeLeft;
  el.classList.toggle("warning",timeLeft<=5);el.classList.toggle("danger",timeLeft<=3);
}
function normalAnswer(index){
  if(questionLocked)return;
  questionLocked=true;clearInterval(timerId);
  const q=questions[currentQuestionIndex];
  if(index===q.correct){
    teams[currentTeam-1].score+=q.value;used.add(currentQuestionIndex);
    showFeedback("✓","RESPUESTA CORRECTA",`¡Grupo ${currentTeam} gana ${q.value} puntos!`,q);
  }else{
    questionLocked=false;
    openSteal(`✕ El Grupo ${currentTeam} seleccionó una respuesta incorrecta.`);
  }
}
function openSteal(reason){
  clearInterval(timerId);questionLocked=true;
  document.getElementById("stealReason").textContent=reason;
  const eligible=teams.filter(t=>t.id!==currentTeam && t.steals>0);
  document.getElementById("stealGroups").innerHTML=eligible.length
    ? eligible.map(t=>`<button class="steal-group" onclick="selectStealingTeam(${t.id})">Grupo ${t.id}<br><small>${t.steals} robo${t.steals===1?"":"s"} disponible${t.steals===1?"":"s"}</small></button>`).join("")
    : `<p class="subtitle">Ningún grupo tiene robos disponibles.</p>`;
  showScreen("stealScreen");
}
function selectStealingTeam(teamId){
  stealingTeam=teamId;
  teams[teamId-1].steals--; // se consume al aceptar la oportunidad
  const q=questions[currentQuestionIndex];
  stealTimeLeft=8;questionLocked=false;
  document.getElementById("stealQuestionValue").textContent=`${Math.ceil(q.value/2)} PUNTOS EN JUEGO`;
  document.getElementById("stealingGroup").textContent=`Grupo ${teamId} intenta el robo`;
  document.getElementById("stealQuestionText").textContent=q.q;
  document.getElementById("stealAnswers").innerHTML=q.a.map((x,i)=>`
    <button class="answer" onclick="stealAnswer(${i})"><b>${"ABCD"[i]}.</b>${x}</button>`).join("");
  showScreen("stealQuestionScreen");
  startStealTimer();
}
function startStealTimer(){
  clearInterval(timerId);updateStealTimer();
  timerId=setInterval(()=>{
    stealTimeLeft--;updateStealTimer();
    if(stealTimeLeft<=0){
      clearInterval(timerId);questionLocked=true;used.add(currentQuestionIndex);
      const q=questions[currentQuestionIndex];
      showFeedback("⌛","TIEMPO DE ROBO AGOTADO",`El Grupo ${stealingTeam} no respondió a tiempo. No se otorgan puntos.`,q);
    }
  },1000);
}
function updateStealTimer(){document.getElementById("stealTimer").textContent=stealTimeLeft;}
function stealAnswer(index){
  if(questionLocked)return;
  questionLocked=true;clearInterval(timerId);
  const q=questions[currentQuestionIndex];used.add(currentQuestionIndex);
  if(index===q.correct){
    const pts=Math.ceil(q.value/2);teams[stealingTeam-1].score+=pts;
    showFeedback("●","¡ROBO EXITOSO!",`El Grupo ${stealingTeam} gana ${pts} puntos.`,q);
  }else{
    showFeedback("✕","ROBO FALLIDO",`El Grupo ${stealingTeam} no acertó. No se otorgan puntos.`,q);
  }
}
function skipSteal(){
  clearInterval(timerId);used.add(currentQuestionIndex);
  showFeedback("!","SIN ROBO","Ningún grupo tomó la oportunidad de robo.",questions[currentQuestionIndex]);
}
function showFeedback(icon,title,message,q){
  document.getElementById("feedbackIcon").innerHTML=
    icon==="✓"?'<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><path d="m4.5 8 2.5 2.5L11.5 6"/></svg>':
    icon==="⌛"?'<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><path d="M8 4v4l3 2"/></svg>':
    icon==="✕"?'<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="7"/><path d="m5.5 5.5 5 5m0-5-5 5"/></svg>':
    icon==="●"?'<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 16c3.5 0 5.5-2.5 5.5-5.4 0-2.5-1.5-4-2-5-.5 2-1.5 2.5-2 2.5C9 5 7 3 7 0 5 2 2.5 5 2.5 10.6 2.5 13.5 4.5 16 8 16z"/><path d="M8 15c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.8-1-2.5 0 1-1 1.5-1.5 1.5 0-1.5-1-2-1-3-1 1.5-1.5 2.5-1.5 4 0 1.5 1 2.5 2.5 2.5z" fill="currentColor"/></svg>':
    '<svg class="bi-icon " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h2l7-4v12l-7-4H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2ZM5 10l2 5h2l-2-5M12 6a2 2 0 0 1 0 4"/></svg>';
  document.getElementById("feedbackKicker").textContent=`${q.cat} • ${q.value} PUNTOS`;
  document.getElementById("feedbackTitle").textContent=title;
  document.getElementById("feedbackMessage").textContent=message;
  document.getElementById("correctAnswerBox").innerHTML=`Respuesta correcta: <strong>${"ABCD"[q.correct]}. ${q.a[q.correct]}</strong>`;
  showScreen("feedbackScreen");
}
function continueGame(){
  if(used.size>=questions.length){finishGame();return;}
  currentTeam=currentTeam%6+1;
  currentQuestionIndex=null;stealingTeam=null;questionLocked=false;
  renderBoard();renderScoreboard();showScreen("gameScreen");
}
function finishGame(){
  clearInterval(timerId);
  const ranking=[...teams].sort((a,b)=>b.score-a.score);
  document.getElementById("winnerTitle").textContent=`¡Grupo ${ranking[0].id} gana!`;
  document.getElementById("winnerScore").textContent=`${ranking[0].score} puntos`;
  document.getElementById("ranking").innerHTML=ranking.map((t,i)=>`
    <div class="rank"><span>${i===0?"1.º":i===1?"2.º":i===2?"3.º":i+1+"."} Grupo ${t.id}</span><strong>${t.score} pts</strong></div>`).join("");
  showScreen("resultScreen");
}
function confirmReset(){if(confirm("¿Seguro que deseas reiniciar toda la partida?"))resetGame();}
function resetGame(){clearInterval(timerId);resetState();showScreen("welcomeScreen");}

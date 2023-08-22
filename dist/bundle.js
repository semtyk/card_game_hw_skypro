/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var t={491:(t,e,s)=>{const{Timer:i}=s(241);e.B=i},241:(t,e)=>{class s{constructor(t={}){const{label:e,startTimestamp:s,endTimestamp:i,currentStartTimestamp:r,pauseCount:a,accumulatedMs:n}=t,m=s>=0&&s<Date.now()?s:void 0,c=m>=0&&i>0&&i>m?i:void 0,o=r>=m&&(!c||r<c)?r:m,d=s>=0&&!(void 0!==r)&&a>0;this._label=e||"",this._startTimestamp=m,this._currentStartTimestamp=d?void 0:o,this._endTimestamp=c,this._pauseCount=a||0,this._accumulatedMs=n||0}getLabel(){return this._label}isStarted(){return this._startTimestamp>=0}isPaused(){return this.isStarted()&&void 0===this._currentStartTimestamp}isStopped(){return this._endTimestamp>0}isRunning(){return this.isStarted()&&!this.isPaused()&&!this.isStopped()}start(){return this.isStarted()&&!this.isStopped()||(this.clear(),this._startTimestamp=Date.now(),this._currentStartTimestamp=this._startTimestamp),this}pause(){return this.isPaused()||!this.isStarted()||this.isStopped()||(this._pauseCount+=1,this._accumulatedMs+=Date.now()-this._currentStartTimestamp,this._currentStartTimestamp=void 0),this}resume(){return!this.isPaused()||this.isStopped()||(this._currentStartTimestamp=Date.now()),this}stop(){return this.isStarted()?(this._endTimestamp=Date.now(),this):this}ms(){return this.isStarted()?this.isPaused()?this._accumulatedMs:(this._endTimestamp||Date.now())-this._currentStartTimestamp+this._accumulatedMs:0}pauseMs(){return this.isStarted()?(this._endTimestamp||Date.now())-this._startTimestamp-this.ms():0}_getTime(t){const e=Math.floor(t/1e3),s=Math.floor(e/60),i=Math.floor(s/60);return{ms:t%1e3,s:e%60,m:s%60,h:i%24,d:Math.floor(i/24)}}time(){return this._getTime(this.ms())}pauseTime(){return this._getTime(this.pauseMs())}pauseCount(){return this._pauseCount}startedAt(){return this._startTimestamp}stoppedAt(){return this._endTimestamp}format(t="%label%d d, %h h, %m m, %s s, %ms ms"){const e=this.time();return t.replace("%label",this._label?`${this._label}: `:"").replace("%ms",e.ms).replace("%s",e.s).replace("%m",e.m).replace("%h",e.h).replace("%d",e.d)}clear(){return this._startTimestamp=void 0,this._currentStartTimestamp=void 0,this._endTimestamp=void 0,this._accumulatedMs=0,this._pauseCount=0,this}serialize(){return JSON.stringify({startTimestamp:this._startTimestamp,currentStartTimestamp:this._currentStartTimestamp,endTimestamp:this._endTimestamp,accumulatedMs:this._accumulatedMs,pauseCount:this._pauseCount,label:this._label})}static deserialize(t){return new s(JSON.parse(t))}static benchmark(t){if("function"!=typeof t)throw new Error("Timer.benchmark expects a function");const e=new s({label:t.name}).start();return t(),e.stop()}}e.Timer=s},836:(t,e,s)=>{"use strict";function i(t){for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}return t}s.d(e,{r:()=>r}),t=s.hmd(t);const r=t=>{let e=[];for(let t=1;t<37;t++)e.push(`card-item${t}`);switch(e=i(e),t){case"1":e=e.slice(0,3);break;case"2":e=e.slice(0,6);break;case"3":e=e.slice(0,9)}return e=e.concat(e),i(e),e};t.exports={shuffle:i}}},e={};function s(i){var r=e[i];if(void 0!==r)return r.exports;var a=e[i]={id:i,loaded:!1,exports:{}};return t[i](a,a.exports,s),a.loaded=!0,a.exports}s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.hmd=t=>((t=Object.create(t)).children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};(()=>{"use strict";s.d(i,{n:()=>n});var t=s(836);const e=(t,e,s)=>{const i=`\n                                    <div class="end-game-box">\n                <div class=${t?"win-smille-img":"loose-smille-img"}></div>\n                <h1 class="end-game-text">${t?"Вы выиграли!":"Вы проиграли!"}</h1>\n                <h2 class="end-time-text">Затраченное время:</h2>\n                <div class="game-time">${s.format(Number(s.format("%m"))<10?"0%m":"%m")}${s.format(Number(s.format("%s"))<10?".0%s":".%s")}</div>\n                <button class="reset-game-button reset-game-button__bottom">Играть снова</button>\n                                    </div>`;e.innerHTML=e.innerHTML+i,document.getElementById("game").classList.add("game__transparent"),document.querySelector(".reset-game-button__bottom").addEventListener("click",(()=>{n()}))};var r=s(491);let a="";const n=()=>{document.getElementById("app").innerHTML='\n    <div class="start-select-box">\n                <h1 class="difficult-text">Выбери сложность</h1>\n                <section class="difficult-checkbox">\n                    <div class="difficult-item" data-index=\'1\'>1</div>\n                    <div class="difficult-item" data-index=\'2\'>2</div>\n                    <div class="difficult-item" data-index=\'3\'>3</div>\n                </section>\n                <button class="start-game-button">Старт</button>\n            </div>\n    ';const s=document.querySelectorAll(".difficult-item");for(const t of s)t.addEventListener("click",(()=>{for(const t of s)t.classList.remove("difficult-item-select");t.classList.add("difficult-item-select"),a=t.dataset.index,console.log(a)}));document.querySelector(".start-game-button").addEventListener("click",(()=>{a&&function(s){const i=document.getElementById("app");let a=null,m=null,c=!0;const o=(0,t.r)(s),d=new r.B,l=`\n    <div id='game'>\n    <header class="header">\n            <div class="timer">\n                <div class='timer-prm'>\n                    <p class='timer-prm-text'>min</p>\n                    <h2 class='current-time current-time-minute'>00</h2>\n                </div>\n                <div class='timer-prm'>\n                    <p class='timer-prm-text'>sek</p>\n                    <h2 class='current-time current-time-sec'>.00</h2>\n                </div>\n            </div>\n            <button class="reset-game-button" id="startNewGameButton">Начать заново</button>\n        </header>\n        <section class="game-field">\n            ${o.map(((t,e)=>`<div class='card-item ${t}' data-index=${e}></div>`)).join("")}\n        </section>\n        </div>\n    `;i.innerHTML=l;const u=document.querySelector(".current-time-minute"),h=document.querySelector(".current-time-sec");d.start();const p=setInterval((()=>{u.innerHTML=d.format(Number(d.format("%m"))<10?"0%m":"%m"),h.innerHTML=d.format(Number(d.format("%s"))<10?".0%s":".%s")}),1e3),f=o.map(((t,e)=>`<div class='card-item' data-index=${e}></div>`)).join(""),v=setTimeout((()=>{document.querySelector(".game-field").innerHTML=f;const t=document.querySelectorAll(".card-item");for(const s of t)s.addEventListener("click",(()=>{if(c&&!s.classList.contains("checked-card")){const r=Number(s.dataset.index);s.classList.add("flip"),setTimeout((()=>{s.classList.add(`${o[r]}`),s.classList.remove("flip")}),200),null===a?a=r:r!==a&&(m=r,c=!1),null!==a&&null!==m&&(o[a]===o[m]?setTimeout((()=>{for(const t of document.querySelectorAll(`.${o[a]}`))t.classList.add("checked-card");a=null,m=null,c=!0,Array.from(t).every((t=>t.className.includes("checked-card")))&&(clearInterval(p),d.stop(),e(!0,i,d))}),500):setTimeout((()=>{clearInterval(p),d.stop(),e(!1,i,d)}),500))}}))}),5e3);document.getElementById("startNewGameButton").addEventListener("click",(()=>{clearTimeout(v),n()}))}(a)}))};n()})()})();
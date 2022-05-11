javascript:(function(){    
    var pagina = document.getElementsByClassName("stage-frame__redesign_broadcastFrame___RGd64")[0];
    
    var newDiv = document.createElement("div");
    newDiv.classList.add("cajota");

/*    pagina.innerHTML += "<div class='cajota'></div>";*/

    pagina.parentNode.insertBefore(newDiv, pagina.nextSibling);
    function addChat(){
        chatHTML = `<style>
                        #caja{
                            border-style: solid;            
                            width: 300px;
                            height: 400px;
                            padding: 5px;
                            word-wrap: break-word;
                            overflow: auto;
                            background-color: #28283a;
                            border-color: #4d4d70;
                            position: absolute;
                            z-index: 9;
                            resize: both;
                            font-family: "Poppins","Roboto",sans-serif;
                            color: #ffffffcc;            
                            /* background-image: radial-gradient(circle closest-corner , #28283a , #4e4e6e);  */
                            /* background-color: #f1f1f1;
                            border: 1px solid #d3d3d3;
                            text-align: center;  */
                        }

                        .mensaje{
                            font-family: "Poppins","Roboto",sans-serif;            
                        }

                        .nombre-usuario{
                            color: rgb(255, 153, 0);
                        }

                        .texto-mensaje{}

                        #cajaheader {
                            top: 0;
                            width: 100%;
                            /* padding: 10px;  */
                            cursor: move;
                            z-index: 10;
                            background-color: #4d4d70;            
                            position: sticky;                            
                            display: flex;
                            padding: 2px 0px;
                        }

                        #arrastrable{
                            width: 70%;
                            text-align: center;
                        }
                        
                        #emojitext{
                            width: 25%;
                            text-align: right;
                        }
                
                        #emoji{
                            display: inline-block;
                        }
                
                        #emoji:hover {
                            animation-name: rotate; 
                            animation-duration: 2s; 
                            animation-iteration-count: infinite;
                            animation-timing-function: linear;
                        }

                        @keyframes rotate {
                            from {transform: rotate(0deg);}
                            to {transform: rotate(360deg);}
                        }
                    </style>
                    <div id="caja">
                        <div id="cajaheader">
                            <div id="arrastrable">👉Arrastralo de aca👈</div>
                            <div id=emojitext>
                                <span id="emoji">🤓</span>👆
                            </div>                                
                        </div>     
                        <div id="mensajesdiv"></div>                   
                    </div>`;
                                
        document.getElementsByClassName("cajota")[0].innerHTML = chatHTML;  

        document.getElementById("caja").style.top = "200px";
        document.getElementById("caja").style.right = "0px";
    }
    addChat();

    /* Make the DIV element draggable: */
    dragElement(document.getElementById("caja"));
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from: */
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV: */
            elmnt.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            /* get the mouse cursor position at startup: */
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            /* call a function whenever the cursor moves: */
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            /* calculate the new cursor position: */
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            /* set the element's new position: */
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            /* stop moving when mouse button is released: */
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function inicializar_chat(){
        function mostrar_mensajes(){
            if (rep == max_rep){
                mensajes = new Array();
            }
        
            var caja_mensajes_class = "reaction__reaction___1LNsk";
            
            var contenido_mensajes_class = "reaction-body__redesign_reactionBody___2a9UP";
            
            var usuario_mensaje_class = "reaction-footer__redesign_reactionFooter___yeGFN";
            
            var caja_mensajes = document.getElementsByClassName(caja_mensajes_class);    
            
            /** itera sobre las cajas y muestra el contenido */
            for (var i = 0; i < caja_mensajes.length; i++){
                var usuario = caja_mensajes[i].getElementsByClassName(usuario_mensaje_class)[0].innerText;
                var texto = caja_mensajes[i].getElementsByClassName(contenido_mensajes_class)[0].innerText;
        
                var mensaje = usuario + ": " + texto; 
                
                if (!mensajes.includes(mensaje)){                    
                    /*console.log(mensaje);*/
                    mensajes.push(mensaje);               
                    mensajesdiv.innerHTML += `<div class="mensaje" >
                                            <span class="nombre-usuario">
                                                ${usuario}
                                            </span>
                                            :
                                            <span class="texto-mensaje">
                                                ${texto}
                                            </span>
                                        </div>`;
                    
                    var mensajes_divs = document.getElementsByClassName("mensaje");
                    if (auto_scroll){
                        mensajes_divs[mensajes_divs.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

                    }
                }        
            }    
        
            rep++;
        
            window.setTimeout( function () { mostrar_mensajes(); }, tiempo_espera ); 
        }

        var mensajesdiv = document.getElementById("mensajesdiv");

        var auto_scroll = true;

        var caja = document.getElementById("caja");

        caja.addEventListener("mouseenter", function(){
            auto_scroll = false;
            /*console.log("in");*/
        }, false);

        caja.addEventListener("mouseleave", function(){
            auto_scroll = true;
            /*console.log("out");*/
        }, false);

        
        
        var mensajes = new Array();
        
        /* para contar las repeticiones y cada x tiempo limpiar el array de mensajes */
        var rep = 0;
        
        const segundos_espera = 2;
        
        const tiempo_espera = 1000 * segundos_espera;
        
        const tiempo_limpiar = 60;
        
        const max_rep = tiempo_limpiar / segundos_espera;
        
        window.setTimeout( function () { mostrar_mensajes(); }, tiempo_espera ); 
    }

    inicializar_chat();
    
})();
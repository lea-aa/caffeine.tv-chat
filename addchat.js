javascript:(function(){
    if(typeof window.caja !== "undefined"){
		window.caja.style.visibility = "visible";
		return;
	}
    var pagina = document.getElementsByClassName("stage-frame__redesign_broadcastFrame___RGd64")[0];

    pagina.style.margin = "0";

    var alinear = document.getElementsByClassName("stage-frame__redesign_mainContent___2HuMa")[0];

    alinear.style.alignItems = "baseline";

    var newDiv = document.createElement("div");
    newDiv.classList.add("cajota");

/*    pagina.innerHTML += "<div class='cajota'></div>";*/

    pagina.parentNode.insertBefore(newDiv, pagina.nextSibling);
    function addChat(){
        chatHTML = `<style>
                        :root{
                            --color-letra: #ffffffcc;
                            --color-fondo: #28283a;
                            --color-bordes: #4d4d70;
                        }

                        #caja{
                            border-style: solid;
                            width: 300px;
                            height: 400px;
                            padding: 5px;
                            word-wrap: break-word;
                            overflow: auto;
                            background-color: var(--color-fondo);
                            border-color: var(--color-bordes);
                            position: absolute;
                            z-index: 50;
                            resize: both;
                            font-family: "Poppins","Roboto",sans-serif;
                            font-size: 12px;
                            font-weight: 500;
                            color: var(--color-letra);
                            /* background-image: radial-gradient(circle closest-corner , #28283a , #4e4e6e);  */
                            /* background-color: #f1f1f1;
                            border: 1px solid #d3d3d3;
                            text-align: center;  */
                            border-radius: 15px;
                            transition: border-color 0.5s ease-in-out, scrollbar-color 0.5s ease-in-out;
                        }

                        #caja{
                            scrollbar-color: var(--color-bordes) var(--color-fondo);
                            scrollbar-width: thin;
                        }
                        #caja:hover {
                            scrollbar-color: var(--color-bordes) hsl(240, 29%, 58%);
                            border-color: hsl(240, 29%, 58%);
                        }

                        /* WebKit and Chromiums */
                        #caja::-webkit-scrollbar {
                            width: 5px;
                            background-color: var(--color-fondo);
                            border-radius: 5px;
                        }
                        #caja::-webkit-scrollbar-thumb {
                            background: var(--color-bordes);
                            border-radius: 5px;
                        }
                        /* WebKit and Chromiums */
                        #caja:hover::-webkit-scrollbar {
                            background-color: hsl(240, 29%, 58%);
                        }
                        #caja:hover::-webkit-scrollbar-thumb {
                            background: var(--color-bordes);
                        }

                        .mensaje{
                            font-family: "Poppins","Roboto",sans-serif;
                            background-color: var(--color-fondo);
                            transition: all 0.5s ease-in-out;
                        }

                        .mensaje:hover{
                            filter: brightness(120%);
                            font-size: 15px;
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
                            z-index: 51;
                            background-color: var(--color-bordes);
                            position: sticky;
                            display: flex;
                            padding: 2px 0px;
                            border-radius: 8px;
                            font-size: 15px;
                        }

                        /* se puede cambiar el color de la derecha para hacer un cambio total de color
                            solo lo dejo por si despues se me da por hacerlo de dos colores pero ahora es redundante */
                        #cajaheader{
                            background: linear-gradient(to bottom, var(--color-bordes) 50%, hsl(240, 19%, 39%) 50%) top;
                            background-size: 200% 200%;
                            transition: .5s ease-out;
                        }

                        #cajaheader:hover {
                            background-position: bottom;
                            filter: brightness(120%);
                            font-size: 17px;
                        }

                        #arrastrable{
                            width: calc(100% - 70px);
                            text-align: center;
                        }

                        #emojitext{
                            width: 50px;
                            text-align: center;
                        }

                        #emoji{
                            display: inline-block;
                            cursor: pointer;
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

                        #cerrar {
                            width: 25px;
                            text-align: left;
                            cursor: pointer;
                        }
                    </style>
                    <div id="caja">
                        <div id="cajaheader">
                            <div id=emojitext>
                                <span id="emoji">🤓</span>👆
                            </div>
                            <div id="arrastrable">👇 el chat <span id="emoji">🤪</span></div>
                            <div id="cerrar">| x</div>
                        </div>
                        <div id="mensajesdiv"></div>
                    </div>`;

        document.getElementsByClassName("cajota")[0].innerHTML = chatHTML;

        var top_bar_height = document.getElementsByClassName("header__redesign_header___2usis header__stageHeader___Ln78k header__isHidden___q0y9f")[0].offsetHeight;

        var caja = document.getElementById("caja");
        caja.style.top = top_bar_height + 10 + "px";
        caja.style.left = pagina.offsetWidth + 10 + "px";

        caja.style.width = document.body.clientWidth - pagina.offsetWidth - 20 + "px";
        caja.style.height = pagina.offsetHeight - caja.offsetTop + "px";
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
            if (mensajes.length > max_mensajes_dup){                
                mensajes.shift();
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
                    mensajesdiv.innerHTML += `<hr style="margin: 0px; border: 1px solid #4d4d70;"/>
                                                <div class="mensaje" >
                                                    <span class="nombre-usuario" style="color: ${get_usuario_color(usuario)}">
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

            window.setTimeout( function () { mostrar_mensajes(); }, tiempo_espera );
        }

        function get_usuario_color(nombre_usuario){
            if(!(nombre_usuario in usuarios_colores)){
                usuarios_colores[nombre_usuario] = generar_color(nombre_usuario);
            }

            return usuarios_colores[nombre_usuario];
        }

        function generar_color(nombre_usuario){
            /* sacar el "hash" para que sea siempre random, dejarlo para que sea siempre el mismo color para ese usuario pero no se puede elegir */
            var lightColor='hsl('+generar_numero(nombre_usuario, "hash")+',100%,75%)';

            return lightColor;
        }

        function generar_numero(nombre_usuario, tipo = undefined){
            if (tipo == "hash"){
                return cyrb53(nombre_usuario) % 361;
            }
            else{
                return Math.floor(Math.random()*361);
            }
        }

        const cyrb53 = function(str, seed = 0) {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
            h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
            return 4294967296 * (2097151 & h2) + (h1>>>0);
        };

        var usuarios_colores = {};

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

        var boton_cerrar = document.getElementById("cerrar");

        boton_cerrar.addEventListener("click", function(){
            caja.style.visibility = "hidden";
        }, false);

        var boton_ayuda = document.getElementById("emojitext");

        boton_ayuda.addEventListener("click", function(){
            alert(`¿Cómo funciona el chat?\n
Cada 2 segundos revisa si hay un globito nuevo de chat y si hay, lo agrega a la lista. \n
Si la ventana del stream no esta visible en la pantalla (minimizada o hay otra ventana maximizada encima) los globitos no salen y los mensajes no van a quedar registrados.\n
\n
¿Qué se puede hacer con el chat?\n
Podés mover la ventanita arrastrandola desde la parte de arriba donde está el título "👇 el chat 🤪".\n
Con la X de arriba a la derecha podes cerrarlo y para abrirlo otra vez solo tenes que volver a tocar el marcador.\n
También podes cambiar el tamaño desde la esquina inferior derecha.\n
\n
Dato extra.\n
Cuando tenes el mouse por encima del chat, se desactiva el scroll automatico, te podes dar cuenta porque la barrita de scroll cambia de color.`)
            }, false);

        window.caja = caja;

        
        /* para contar las repeticiones y cada x tiempo limpiar el array de mensajes */
        
        /*const tiempo_limpiar = 60;
        
        var rep = 0;

        const max_rep = tiempo_limpiar / segundos_espera;*/
        
        
        var mensajes = new Array();
        
        const segundos_espera = 1;
        
        const tiempo_espera = 1000 * segundos_espera;
        
        /* para contar cuantos mensajes maximos a almacenar para evitar mostrarlo duplicado */
        const max_mensajes_dup = 10;

        window.setTimeout( function () { mostrar_mensajes(); }, tiempo_espera );
    }

    inicializar_chat();

})();
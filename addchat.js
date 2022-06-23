javascript:(function(){
    /*
        Version: 2022-06-23 20:55:02
        changed all localStorage variables for a single object with all the properties
    */
    const caffeine_url_regex = /www.caffeine\.tv\/./;
    const current_url = window.location.href ;

    if(!caffeine_url_regex.test(current_url)){
        alert("Hay que ejecutar el script mientras se ve un stream en www.caffeine.tv/nombredelstreamer");
        return;
    }

    if(typeof window.caja !== "undefined"){
		window.caja.style.visibility = "visible";
		return;
	}

    var reproductor;

    var newDiv = document.createElement("div");
    newDiv.classList.add("cajota");

    try {
        reproductor = document.getElementsByClassName("stage-frame__redesign_broadcastFrame___RGd64")[0];
        reproductor.style.margin = "0";
        reproductor.parentNode.insertBefore(newDiv, reproductor.nextSibling);
    } catch (error) {
        console.log(error);
        console.log("No se pudo encontrar el elemento reproductor");
        document.body.appendChild(newDiv);
    }

    try {
        var alinear = document.getElementsByClassName("stage-frame__redesign_mainContent___2HuMa")[0];

        alinear.style.alignItems = "baseline";
    } catch (error) {
        console.log(error);
        console.log("No se pudo encontrar el elemento para alinear el reproductor");
    }

    /**
     * store the chat config
     * fs: font size of chat messages
     * dT: default top of chat box, Y coord
     * dL: default left of chat box, X coord
     * dW: default width of chat box
     * dH: default height if chat box
     * pos_size: array of saves positions and size of chat box
     *      name: name of saved config
     *      t: top of chat box, Y coord
     *      l: left of chat box, X coord
     *      w: width of chat box
     *      h: height if chat box
    */
    var chat_config = JSON.parse(localStorage.getItem("chat_config")) ?? {};

    var font_size = chat_config.fs ?? 15;

    function addChat(){
        chatHTML = `<style>
                        :root{
                            --color-letra: #ffffffcc;
                            --color-fondo: #28283a;
                            --color-bordes: #4d4d70;
                            --font-size: ${font_size}px;
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
                            font-size: var(--font-size);
                        }

                        .mensaje:hover{
                            filter: brightness(120%);
                            font-size: calc(var(--font-size) * 1.2);
                        }

                        .mensaje a{
                            color: rgb(207, 148, 255);
                            text-decoration: none;
                        }

                        .mensaje a:hover {
                           text-decoration: underline !important;
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
                            display: flex;
                        }

                        #arrastrable{
                            text-align: center;
                            flex-grow: 1;
                        }

                        #emojitext{
                            width: max-content;
                            text-align: center;
                            margin-left: 5px;
                        }

                        #emoji{
                            cursor: pointer;
                        }

                        .emoji{
                            display: inline-block;
                        }

                        .emoji:hover {
                            animation-name: rotate;
                            animation-duration: 2s;
                            animation-iteration-count: infinite;
                            animation-timing-function: linear;
                        }

                        @keyframes rotate {
                            from {transform: rotate(0deg);}
                            to {transform: rotate(360deg);}
                        }

                        #botones-ventana {
                            width: max-content;
                            text-align: left;
                            cursor: pointer;
                            margin-right: 5px;
                        }

                        #cerrar{
                            transition: color 0.5s ease-in-out;

                        }

                        #cerrar:hover {
                            color: rgb(255, 88, 88);
                        }

                        .upvotes:not(:empty){
                            color:black;
                            background-color: rgb(255, 0, 255);
                            border-radius: 4px;
                            padding: 0px 4px;
                            font-weight: bold;
                        }
                        
                        #config-container{
                            position: sticky; 
                            height: 0; 
                            top: 32px;
                            z-index: 51;
                        }
                        
                        #config{    
                            background-color: var(--color-bordes);                
                            display: block;
                            padding: 0px 5px;
                            margin: 5px 0px;
                            border-radius: 8px;
                            font-size: 15px;                
                            transition: max-height 0.2s ease-out;
                            max-height: 0;
                            overflow: hidden;
                        }
                            
                        #config div{
                            padding: 5px 0px;
                            margin-left: 5px;
                        }
                        
                        button{
                            background-color: var(--color-fondo);
                            color: var(--color-letra);
                            border: 2px solid var(--color-letra);
                            border-radius: 5px;
                            cursor: pointer;
                        }
            
                        button:active{
                            background-color: var(--color-bordes);
                        }

                        #config_boton {
                            margin: 0px 5px;
                        }

                    </style>
                    <div id="caja">
                        <div id="cajaheader">
                            <div id=emojitext>
                                <span id="emoji" class="emoji">🤓</span>👆
                            </div>
                            <div id="arrastrable">👇 el chat <span class="emoji">🤪</span></div>
                            <div id="botones-ventana"><span class="emoji" id="config_boton"> ⚙ </span>|<span id="extraer"> 🔳 </span>|<span id="cerrar"> x </span></div>
                        </div>
                        <div id="config-container">
                            <div id="config">
                                <div>
                                    Tamaño de texto: <button id="aumentar_tamaño_texto">+</button> <button id="disminuir_tamaño_texto">-</button>
                                </div>
                                <div>
                                    <label for="guardar_posicion">Guardar posición de la ventana: </label>
                                    <input type="checkbox" name="guardar_posicion" id="guardar_posicion">
                                </div>
                            </div>
                        </div>
                        <div id="mensajesdiv"></div>
                    </div>`;

        document.getElementsByClassName("cajota")[0].innerHTML = chatHTML;

        var caja = document.getElementById("caja");

        if(chat_config.dL && chat_config.dT && 
        chat_config.dW && chat_config.dH){
            caja.style.left = chat_config.dL + "px";
            caja.style.top = chat_config.dT + "px";
            caja.style.width = chat_config.dW + "px";
            caja.style.height = chat_config.dH + "px";
        }
        else{
            const top_bar_height_class = "header__redesign_header___2usis";
            var top_bar_height = 56;
    
            try {
                document.getElementsByClassName(top_bar_height_class)[0].offsetHeight;
            } catch (error) {
                console.log(error);
                console.log("No se pudo encontrar el elemento top_bar (barra superior)");
            }
    
            var reproductor_width = 800, reproductor_height = 470;
    
            if (typeof reproductor != "undefined") {
                reproductor_height = reproductor.offsetHeight;
                reproductor_width = reproductor.offsetWidth;
            }
    
            caja.style.top = top_bar_height + 10 + "px";
            caja.style.left = reproductor_width + 10 + "px";
            caja.style.width = document.body.clientWidth - reproductor_width - 20 + "px";
            caja.style.height = reproductor_height - caja.offsetTop + "px";
        }

    }
    addChat();

    const save_config_checkbox = document.getElementById("guardar_posicion");

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

            if (save_config_checkbox.checked) {
                guardar_posiciones();
            }
        }
    }

    
    const caja_mensajes_class = "reaction__reaction___1LNsk";

    const contenido_mensajes_class = "reaction-body__redesign_reactionBody___2a9UP";

    const usuario_mensaje_class = "reaction-footer__redesign_reactionFooter___yeGFN";

    const upvotes_mensaje_class = "reaction-badge__redesign_count___767MF";

    const url_regex_checker = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

    function mostrar_mensajes(){
        if (mensajes.length > max_mensajes_dup){
            mensajes.shift();
        }

        var caja_mensajes = document.getElementsByClassName(caja_mensajes_class);

        /** itera sobre las cajas y muestra el contenido */
        for (var i = 0; i < caja_mensajes.length; i++){
            var usuario = caja_mensajes[i].getElementsByClassName(usuario_mensaje_class)[0].innerText;
            var texto = caja_mensajes[i].getElementsByClassName(contenido_mensajes_class)[0].innerText.replace("\n", " ");
            var upvotes = caja_mensajes[i].getElementsByClassName(upvotes_mensaje_class)[0].innerText;

            var mensaje = usuario + ":" + texto;

            if (!mensajes.includes(mensaje)){
                /*console.log(mensaje);*/
                mensajes.push(mensaje);

                var texto_con_url = texto;

                var texto_url_match = texto_con_url.match(url_regex_checker);

                if (texto_url_match != null) {
                    var url_matched = texto_url_match[0];

                    if(!/http(s)?:\/\//.test(url_matched)){
                        url_matched = "http://" + url_matched;
                    }

                    texto_con_url = texto_con_url.replace(texto_url_match[0], `<a href="${url_matched}" target="_blank">${texto_url_match[0]}</a>`);
                }

                var mensajeHtml = `<hr style="margin: 0px; border: 1px solid #4d4d70;"/>
                                    <div class="mensaje" >
                                        <span class="nombre-usuario" style="color: ${get_usuario_color(usuario)}">${usuario}</span>
                                        <span class="upvotes"></span>
                                        :
                                        <span class="texto-mensaje">${texto_con_url}</span>
                                    </div>`;
                mensajesdiv.innerHTML += mensajeHtml;

                var mensajes_divs = document.getElementsByClassName("mensaje");

                if (auto_scroll){
                    mensajes_divs[mensajes_divs.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                }

                if (typeof pop_out_chat != "undefined") {
                    var pop_out_chat_messajes_html = pop_out_chat.document.getElementById("mensajesdiv");
                    pop_out_chat_messajes_html.innerHTML += mensajeHtml;
                }
            }

            if(upvotes != ""){
                let mensajes_en_chat = document.getElementsByClassName("mensaje");
                for (let i = mensajes_en_chat.length - 1; i >= 0; i--) {
                    const element = mensajes_en_chat[i];
                    var usuario_en_chat = element.getElementsByClassName("nombre-usuario")[0].innerText;
                    var texto_en_chat = element.getElementsByClassName("texto-mensaje")[0].innerText;

                    if (usuario == usuario_en_chat && texto == texto_en_chat) {
                        element.getElementsByClassName("upvotes")[0].innerText = upvotes;
                        break;
                    }
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

    const guardar_posiciones = () => {
        const pos = caja.getBoundingClientRect();
        
        chat_config.dL = caja.offsetLeft;
        chat_config.dT = caja.offsetTop;
        chat_config.dW = pos.width;
        chat_config.dH = pos.height;

        guardar_config();
    };

    const reestablecer_posiciones = () => {
        chat_config.dL = null;
        chat_config.dT = null;
        chat_config.dW = null;
        chat_config.dH = null;

        guardar_config();
    };

    const guardar_config = () => {        
        localStorage.setItem("chat_config", JSON.stringify(chat_config));
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
Con el cuadrado al lado de la x podes sacar el chat a otra ventana pero por ahora no tiene el auto scroll.\n
También podes cambiar el tamaño desde la esquina inferior derecha.\n
Tocando el engranaje accedes a la configuración en la que por ahora se puede cambiar el tamaño del texto de los mensajes, tocandolo otra vez se vuelve a esconder el panel de configuración\n
\n
Dato extra.\n
Cuando tenes el mouse por encima del chat, se desactiva el scroll automatico, te podes dar cuenta porque la barrita de scroll cambia de color.`)
    }, false);

    var pop_out_chat;

    var boton_extraer = document.getElementById("extraer");

    boton_extraer.addEventListener("click", function(){
        pop_out_chat = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=600,top="+(screen.height-700)+",left="+(screen.width-500));
        pop_out_chat.document.body.innerHTML = document.getElementsByClassName("cajota")[0].innerHTML;
        pop_out_chat.document.getElementById("caja").style.top = "0";
        pop_out_chat.document.getElementById("caja").style.left = "0";
        pop_out_chat.document.getElementById("caja").style.width = "calc(100% - 16px)";
        pop_out_chat.document.getElementById("caja").style.height = "calc(100% - 16px)";
        pop_out_chat.document.body.style.background = "black";
    }, false);    

    var boton_aumentar_texto = document.getElementById("aumentar_tamaño_texto");
    boton_aumentar_texto.addEventListener("click", function(){
        var r  = document.querySelector(":root");
        if (font_size < 100) {
            font_size++;                    
            chat_config.fs = font_size;
            guardar_config();
        }
        r.style.setProperty("--font-size", font_size + "px");
    }, false);

    var boton_disminuir_texto = document.getElementById("disminuir_tamaño_texto");
    boton_disminuir_texto.addEventListener("click", function(){
        var r  = document.querySelector(":root");
        if (font_size > 0){
            font_size--;
            chat_config.fs = font_size;
            guardar_config();
        }
        r.style.setProperty("--font-size", font_size + "px");
    }, false);

    var boton_cofig = document.getElementById("config_boton");
    boton_cofig.addEventListener("click", function(){
        var config_div = document.getElementById("config");
        if (config_div.style.maxHeight){
            config_div.style.maxHeight = null;
        }
        else{
            config_div.style.maxHeight = config_div.scrollHeight + "px";
        }
    }, false);

    /* CheckBox guardar_posicion */   

    if(localStorage.getItem("guardar_posicion_checked")){
        save_config_checkbox.checked = true;
    }

    save_config_checkbox.addEventListener("change", element => {
        if (element.originalTarget.checked) {
            guardar_posiciones();        
        }
        else{
            reestablecer_posiciones();                      
        }
    }, false);

    const observer = new ResizeObserver(mutations => {
        if (save_config_checkbox.checked) {
            guardar_posiciones();
        }
    });

    observer.observe(caja);

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

    mostrar_mensajes();    

})();
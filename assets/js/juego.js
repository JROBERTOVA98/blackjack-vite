//Uso de patron modulo
(()=> {
    'use strict'

    let deck = [];
    const tipos =['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K' ];

    let puntosJugadores = [0,0];

    const btnPedir = document.getElementById('btnPedir'),
          btnDetener = document.getElementById('btnDetener'),
          btnNuevo = document.getElementById('btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          smalls = document.querySelectorAll('small');

    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i =0; i <numJugadores; i ++){
            puntosJugadores.push(0);
        }

        smalls.forEach (elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <=10; i++){
            for (let tipo of tipos) {
                deck.push (i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);
    }


    //FUNCION PARA PEDIR UNA CARTA
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas';
        }
         
        return deck.pop();
    }


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
                (valor === 'A') ? 11: 10
                : valor * 1;

    }

    //turno 0 = primer jugador
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;  
        imgCarta.classList.add('carta');
             
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGandor = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert ('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert ('Computadora Gana');
            } else if (puntosComputadora > 21) {
                alert ('Jugador Gana');
            } else {
                alert ('Computadora Gana')
            }
        }, 100);
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length -1 );

            
        } while ((puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21));
        determinarGandor();
        
        
    }
    //pedir carta

    btnPedir.addEventListener('click', ()=> {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);


        if (puntosJugador > 21) {
            console.warn('Lo siento, Perdise');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }


    });

    btnDetener.addEventListener('click', ()=> {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', ()=> {
        iniciarJuego();       
    });

    return {nuevoJuego: iniciarJuego};

})();







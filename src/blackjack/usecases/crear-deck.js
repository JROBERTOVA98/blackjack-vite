import _ from 'underscore';
/* const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K']; */
/**
 * Esta función crea un nuevo deck 
 * @param {Array<String>} tiposDeCarta - 
 * @param {Array<String>} tiposEspeciales - 
 * @returns {Array} retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    if (!tiposDeCarta || tiposDeCarta.length === 0) throw new Error ('TiposDeCarta es obligatorio');
    if (!tiposEspeciales || tiposEspeciales.length === 0) throw new Error ('tiposEspeciales es obligatorio');

    let deck = [];
    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tiposDeCarta ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tiposDeCarta ) {
        for( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    
    return deck;
}

//export default crearDeck;
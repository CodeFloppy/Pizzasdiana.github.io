let btDerecho   = document.querySelector('#btDerecho');
let btIzquierdo = document.querySelector('#btIzquierdo');
let num = 1;



function direction(dir){
    if(num + dir > 0){
        num += dir;

        console.log(num);

        petition(`https://pokeapi.co/api/v2/pokemon/${num}`);
    }
}

function petition(url){

    fetch(url,{
        method:'GET',
        headers:{'Content-type':'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(json =>{
        console.log(json);
        // loadData(json);
        return json;
    })
    .catch(err => console.log(err));
}

function addZeros(num){
    let chain = String();
    
    for(let i = 3; i >=  `${num}`.length; i--){
        chain += '0';
    }
    return chain + num;
}


function loadData(json){
    document.querySelector('#nombre').innerHTML = json.name;
    document.querySelector('#bxp').innerHTML = `${json.base_experience} bxp`;
    document.querySelector('#imgPokemon').innerHTML =  `<img src= ${json.sprites.other['official-artwork'].front_default} alt=""></img>`;


    fetch(`${json.types[0].type.url}`,{
        method:'GET',
        headers:{'Content-type':'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(resJson => {  
        // console.log(resJson);
        document.querySelector('#datos').innerHTML = `<p>N-${addZeros(json.id)} Pokemon ${resJson.names[5].name} Altura: ${json.height/10}m Peso: ${json.weight}kg</p>`;
        
    })
    .catch(err => console.log(err));

    //---------------------
    fetch(`${json.abilities[0].ability.url}`,{
        method:'GET',
        headers:{'Content-type':'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(resJson => {  
        // console.log(resJson);
        document.querySelector('#nomHabilidad').innerHTML = `Habilidad: ${resJson.names[5].name}`;
        document.querySelector('#infHabilidad').innerHTML = `${resJson.flavor_text_entries[21].flavor_text}`;
    })
    .catch(err => console.log(err));

    // -------------------
    fetch(`${json.moves[0].move.url}`,{
        method:'GET',
        headers:{'Content-type':'application/json;charset=UTF-8'}
    })
    .then(response => response.json())
    .then(resJson =>{
        // console.log(resJson);
        document.querySelector('#movimiento').innerHTML = `${resJson.names[5].name} <span class="golpe">${resJson.power}</span>`;
    })
    .catch(err => console.log(err));

}



// petition(`https://pokeapi.co/api/v2/pokemon/${num}`);


// new Promise((resolve, reject)=>{
//     setTimeout(() => resolve(1), 1000);
// })
// .then((resolve) => {
//     alert(resolve);
//     return resolve * 2;
// })
// .then((resolve) =>{
//     alert(resolve);
//     return resolve * 2;
// })
// .then((resolve) =>{
//     console.log(resolve);
// })

// console.log(petition('https://pokeapi.co/api/v2/pokemon/'));

function cuadradoPromesa(valor){

    return new Promise((resolve,reject)=>{

        if(typeof valor !== 'number'){
            reject(`el valor ${valor} no es un numero`);
        }else{
            setTimeout(() => {
                resolve({
                    valor: valor,
                    cuadrado: valor * valor
                });
            }, 0 | Math.random()*1000);
        }
        
    }); 
}

// cuadradoPromesa(1)

// .then(resp =>{
//     console.log('inicio de ejecusion');
//     console.log(resp);
//     return cuadradoPromesa(2);
// })
// .then(resp =>{
//     console.log(resp);
//     return cuadradoPromesa('3');
// })
// .then(resp =>{
//     console.log(resp);
//     console.log('fin de ejecusion');
// })
// .catch(err => console.error(`ha ocurrido un error en la ejecucion: ${err}`));

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li');
    let img = createNode('img');
    let span = createNode('span');
    img.src = author.picture.medium;
    span.innerHTML = `${author.name.first} ${author.name.last}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});

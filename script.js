function compararStrings(str1, str2) {
  // Compara as strings caractere a caractere
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  for (let i = 0; i < str1.length && i < str2.length; i++) {
    if (str1[i] < str2[i]) {
      return -1;
    } else if (str1[i] > str2[i]) {
      return 1;
    }
  }
  
  // Se todas as letras comparadas forem iguais, compara o tamanho das strings
  if (str1.length < str2.length) {
    return -1;
  } else if (str1.length > str2.length) {
    return 1;
  } else {
    return 0;
  }
}

class No {
    constructor(valor) {
      this.valor = valor;
      this.esquerda = null;
      this.direita = null;
      this.pai = null;
      this.nivel = 0;
      this.coordenada = {x: 0, y: 0};
    }
  
    distanciaAteRaiz() {
      let distancia = 0;
      let noAtual = this;
  
      while (noAtual !== null) {
        noAtual = noAtual.pai;
        distancia++;
      }
      console.log(distancia);
      return distancia - 1;
    }
  }
  
  class ArvoreBinaria {
    constructor() {
      this.raiz = null;
      this.n=0
    }
  
    adicionar(valor) {
      this.n += 1;
      const novoNo = new No(valor);
      if (this.raiz === null) {
        this.raiz = novoNo;
        this.raiz.coordenada = {x: 0, y: 0};
      } else {
        this.adicionarNo(this.raiz, novoNo);
      }
    }
  
    adicionarNo(raizAtual, novoNo) {
      if (compararStrings(novoNo.valor, raizAtual.valor)<0) {
        if (raizAtual.esquerda === null) {
          raizAtual.esquerda = novoNo;
          novoNo.nivel = raizAtual.nivel + 1;
          novoNo.pai = raizAtual;
          novoNo.coordenada.y = novoNo.nivel;
          novoNo.coordenada.x = raizAtual.coordenada.x*2 ;
        } else {
          this.adicionarNo(raizAtual.esquerda, novoNo);
        }
      } else {
        if (raizAtual.direita === null) {
          raizAtual.direita = novoNo;
          novoNo.nivel = raizAtual.nivel + 1;
          novoNo.pai = raizAtual;
          novoNo.coordenada.y = novoNo.nivel;
          novoNo.coordenada.x = raizAtual.coordenada.x*2 + 1; 
        } else {
          this.adicionarNo(raizAtual.direita, novoNo);
        }
      }
    }
    pesquisar(valor) {
        let noAtual = this.raiz;
        
        while (noAtual !== null) {
          if (compararStrings(valor, noAtual.valor)==0) {
            return noAtual;
          } else if (compararStrings(valor, noAtual.valor)<0) {
            noAtual = noAtual.esquerda;
          } else {
            noAtual = noAtual.direita;
          }
        }
        
        return null; // valor não encontrado na árvore
      }
      altura(noAtual = this.raiz) {
        if (noAtual === null) {
          return -1;
        }
        
        const alturaEsquerda = this.altura(noAtual.esquerda);
        const alturaDireita = this.altura(noAtual.direita);
        
        return Math.max(alturaEsquerda, alturaDireita) + 1;
      } 
      comprimentoInterno() {
        if (this.raiz === null) {
          return 0;
        }
      
        let somaComprimentos = 0;
        let nivelAtual = 0;
        let fila = [{ no: this.raiz, nivel: 0 }];
      
        while (fila.length > 0) {
          const { no, nivel } = fila.shift();
      
          if (nivelAtual !== nivel) {
            nivelAtual = nivel;
          }
      
          if (no.esquerda !== null) {
            fila.push({ no: no.esquerda, nivel: nivel + 1 });
            somaComprimentos += nivel + 1;
          }
      
          if (no.direita !== null) {
            fila.push({ no: no.direita, nivel: nivel + 1 });
            somaComprimentos += nivel + 1;
          }
        }
      
        return somaComprimentos;
      }
    
      pegarMinimo() {
      if(this.raiz === null) {
        return -1;
      }
      let noAtual = this.raiz;
      while (noAtual.esquerda !== null) {
        noAtual = noAtual.esquerda;
      }
      return noAtual;
    }
  
    pegarMaximo() {
      if(this.raiz === null) {
        return -1;
      }
      let noAtual = this.raiz;
      while (noAtual.direita !== null) {
        noAtual = noAtual.direita;
      }
      return noAtual;
    }

    sequenciaArvore(arvore) {
      let resultado = [];
      
      if (arvore.raiz === null) {
        return resultado;
      }
      
      let fila = [arvore.raiz];
      
      while (fila.length > 0) {
        let noAtual = fila.shift();
        resultado.push(noAtual);
        
        if (noAtual.esquerda !== null) {
          fila.push(noAtual.esquerda);
        }
        
        if (noAtual.direita !== null) {
          fila.push(noAtual.direita);
        }
      }
      
      return resultado;
    }
    emOrdem(no = this.raiz, resultado = "") {
      if (no !== null) {
        resultado = this.emOrdem(no.esquerda, resultado);
        resultado += no.valor + " → ";
        resultado = this.emOrdem(no.direita, resultado);
      }
      return resultado;
    }
    preOrdem(no = this.raiz, resultado = "") {
      if (no !== null) {
        resultado += no.valor + " → ";
        resultado = this.preOrdem(no.esquerda, resultado);
        resultado = this.preOrdem(no.direita, resultado);
      }
      return resultado;
    }
    posOrdem(no = this.raiz, resultado = "") {
      if (no !== null) {
        resultado = this.posOrdem(no.esquerda, resultado);
        resultado = this.posOrdem(no.direita, resultado);
        resultado += no.valor + " → ";
      }
      return resultado;
    }
    levelOrdem() {
      let resultado = [];
  
      function visita(no, nivel) {
        if (!no) {
          return;
        }
  
        if (!resultado[nivel]) {
          resultado[nivel] = [];
        }
  
        resultado[nivel].push(no.valor);
  
        visita(no.esquerda, nivel + 1);
        visita(no.direita, nivel + 1);
      }
  
      visita(this.raiz, 0);
  
      return resultado
        .map((nivel) => nivel.join(" → "))
        .filter((nivel) => nivel !== "")
        .join(" → ");
    }
    }
  //MAIN FUNCTION

  

function  transformarCoordenadas(origem,coordenada){
  if(coordenada.x ===0 && coordenada.y ===0 ){
    return origem;
  }
  let x1 = ((origem.x)/2**(coordenada.y)+((origem.x)/2**(coordenada.y-1))*(coordenada.x));
  let y1 = ((origem.y)+2*(origem.y)*(coordenada.y));
  
  return {x: x1, y: y1};
}
 function PegarCoordenadaDoPai(coordenada){
  let x= ((coordenada.x) - ((coordenada.x) % 2)) /2; 
  let y = coordenada.y-1;
  
  return {x: x, y: y};
 } 



let arvore = new ArvoreBinaria();
document.querySelector('.entrada').addEventListener('submit', (event) => {
  event.preventDefault();
  let val = document.querySelector('#meuInput').value;
  if(arvore.pesquisar(val) != null){
      return;
  }
  console.log(val);
  arvore.adicionar(val);
  var canvas = document.getElementById("canvas");
  largura=canvas.width;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green'
  ctx.font = '15px serif';
  sequencia_coord = arvore.sequenciaArvore(arvore);
  console.log(sequencia_coord);
  raio = 30;
  const origem = {x : largura/2,y : raio};
  //ctx.arc(origem.x, origem.y, raio, 0, Math.PI * 2, true); // Círculo exterior
  //ctx.strokeText(sequencia_coord[0].valor, origem.x-raio,origem.y );
  for(var i = 0; i<sequencia_coord.length;i++){
    let coordenadas_px = transformarCoordenadas(origem,sequencia_coord[i].coordenada)
    ctx.beginPath();
    ctx.moveTo(coordenadas_px.x+raio,coordenadas_px.y);
    ctx.arc(coordenadas_px.x, coordenadas_px.y, raio, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.strokeText(sequencia_coord[i].valor, coordenadas_px.x-raio,coordenadas_px.y )
    if(i == 0) continue;
    coordenada_pai = PegarCoordenadaDoPai(sequencia_coord[i].coordenada);
    let coordenada_pai_px = transformarCoordenadas(origem,coordenada_pai);
    ctx.moveTo(coordenadas_px.x,coordenadas_px.y);
    ctx.lineTo(coordenada_pai_px.x,coordenada_pai_px.y);
    ctx.stroke();
    //ctx.strokeText(sequencia_coord[i].valor, coordenadas_px.x-raio,coordenadas_px.y );
  }
  ctx.stroke();
});
const botoes = document.querySelectorAll('.meuBotao');
let resposta = document.querySelector('.resposta');
const tituloExibido = document.querySelector('.tituloResposta');
const minhaTela = document.querySelector('#minhaTela');
const botaoFechar = document.querySelector('#botaoFechar');


botoes.forEach(function(botao) {
  botao.addEventListener('click', function() {
    console.log(botao);
    minhaTela.style.display = 'block';
    document.querySelector('.botoesTravessia').style.display='none';
    const texto = botao.getAttribute('data-texto');
    switch (texto) {
      case 'Inserir':
        canvas.style.display='none';
        resposta.innerHTML = ` Insira um nome:`;
        document.querySelector('.entrada').style.display='inline';  
        break;
        case 'Tamanho da arvore':
        canvas.style.display='none';
        resposta.innerHTML = ` ${arvore.n} nós`;
        document.querySelector('.entrada').style.display='none';
        break;
        case 'Altura da arvore':
          canvas.style.display='none';
          resposta.innerHTML = `${arvore.altura()}`;
          document.querySelector('.entrada').style.display='none';
          break;
          case 'Menor Elemento':  
          canvas.style.display='none';
          resposta.innerHTML = `${arvore.pegarMinimo().valor}`;
          document.querySelector('.entrada').style.display='none';
          break;
          case 'Maior Elemento':  
            canvas.style.display='none';
            resposta.innerHTML = `${arvore.pegarMaximo().valor}`;
            document.querySelector('.entrada').style.display='none';
            break;
        case 'Comprimento Interno':  
          canvas.style.display='none';
          resposta.innerHTML = `${arvore.comprimentoInterno()}`;
          document.querySelector('.entrada').style.display='none';
          break;
        case 'Travessias':  
          canvas.style.display='none';
          resposta.innerHTML = '';
          document.querySelector('.botoesTravessia').style.display='flex';
          document.querySelector('.entrada').style.display='none';
          break;
    }
    tituloExibido.textContent = texto;
  });
});

botaoFechar.addEventListener('click', function() {
  minhaTela.style.display = 'none';
  canvas.style.display='inline'
});

const botoesTravs = document.querySelectorAll('.butaoTravessia');


botoesTravs.forEach(function(botao){
  botao.addEventListener('click', function() {
    const travessia =botao.getAttribute('data-texto');
    switch (travessia) {
      case 'Em Ordem':
        document.querySelector('.botoesTravessia').style.display='none';
        resposta.innerHTML = `${arvore.emOrdem()}`;
        break;
      case 'Pré-Ordem':
        document.querySelector('.botoesTravessia').style.display='none';
        resposta.innerHTML = `${arvore.preOrdem()}`;
        break;
      case 'Pós-Ordem':
        document.querySelector('.botoesTravessia').style.display='none';
        resposta.innerHTML = `${arvore.posOrdem()}`;
        break;
      case 'Level-Ordem':
        document.querySelector('.botoesTravessia').style.display='none';
        resposta.innerHTML = `${arvore.levelOrdem()}`;
        break;
    
      default:
        break;
    }  
    tituloExibido.textContent = travessia;
})
})


   
  
  
  
  
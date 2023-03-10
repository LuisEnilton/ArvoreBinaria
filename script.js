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
  
      return distancia - 1;
    }
  }
  
  class ArvoreBinaria {
    constructor() {
      this.raiz = null;
    }
  
    adicionar(valor) {
      const novoNo = new No(valor);
      if (this.raiz === null) {
        this.raiz = novoNo;
        this.raiz.coordenada = {x: 0, y: 0};
      } else {
        this.adicionarNo(this.raiz, novoNo);
      }
    }
  
    adicionarNo(raizAtual, novoNo) {
      if (novoNo.valor < raizAtual.valor) {
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
          if (valor === noAtual.valor) {
            return noAtual;
          } else if (valor < noAtual.valor) {
            noAtual = noAtual.esquerda;
          } else {
            noAtual = noAtual.direita;
          }
        }
        
        return null; // valor não encontrado na árvore
      }
    pegarMinimo() {
      let noAtual = this.raiz;
      while (noAtual.esquerda !== null) {
        noAtual = noAtual.esquerda;
      }
      return noAtual;
    }
  
    pegarMaximo() {
      let noAtual = this.raiz;
      while (noAtual.direita !== null) {
        noAtual = noAtual.direita;
      }
      return noAtual;
    }
  }


let arvore = new ArvoreBinaria();
function inserirNo(no,coordenada){
    let y = coordenada.y;
    console.log(document.querySelector(`.nivel${y}`));
    if(document.querySelector(`.nivel${y}`)==null){
        nivel = criarNivel(y)
    }else{
        nivel = document.querySelector(`.nivel${y}`);
    }
    nivel.appendChild(no);
}

function criarNivel(y) {
    const nivel = document.createElement('div');
    let gap =100/2**(y);
    nivel.className = `nivel nivel${y}`;
    nivel.style.gridTemplateColumns =`repeat(${2**(y)},20px)`;
    nivel.style.gridTemplateRows =`repeat(1)`;
    console.log(gap)
    nivel.style.columnGap = `${gap}%`;
    document.body.appendChild(nivel);
    return nivel;

}
function criarNode(val) {
    const node = document.createElement('div');
    node.className = 'node';
    node.innerHTML=`${val}`;
    return node;
}
// Obtenha o elemento input pelo ID
document.querySelector('.entrada').addEventListener('submit', (event) => {
    event.preventDefault();
    let valor = document.querySelector('#meuInput').value;
    val=parseInt(valor,10)
    if(arvore.pesquisar(val) != null){
        return;
    }
    console.log(val);
    arvore.adicionar(val)
    controle(val);
});

function controle(val){
    node = arvore.pesquisar(val)
    console.log(node.coordenada);
    no = criarNode(val);
    no.style.gridColumn = `${node.coordenada.x+1}`;
    inserirNo(no,node.coordenada)
    

}

  
   
  
  
  
  
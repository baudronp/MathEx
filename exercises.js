/* Ajouter une mission : créer un générateur avec id, label, modes et next(mode). */
const fractionHtml = (n, d) => `<span class="fraction"><span>${n}</span><span>${d}</span></span>`;
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const shuffle = values => [...values].sort(() => Math.random() - .5);

const EXERCISES = {
  multiplication: {
    title: 'Tables de multiplication', icon: '✖️', color: '#d8f4e8', shadow: '#9fd7c0', description: 'Deviens le ninja des tables de 1 à 10.',
    modes: [{id:'input', label:'Réponse à écrire'}, {id:'qcm', label:'QCM'}, {id:'factors', label:'Retrouve les facteurs'}],
    next(mode) {
      const a = random(1,10), b = random(1,10), product = a*b;
      if(mode === 'factors') {
        const pairs=[]; for(let i=1;i<=10;i++) if(product%i===0 && product/i<=10) pairs.push([i,product/i]);
        return { type:'factors', question:`? × ? = ${product}`, label:'Trouve une multiplication possible', answer:pairs.map(p=>p.sort((x,y)=>x-y).join(',')), hint:pairs.length>1 ? 'Plusieurs réponses sont possibles.' : 'Une seule réponse est possible.' };
      }
      const q={type:mode, question:`${a} × ${b} = ?`, answer:product, label:'Calcule la multiplication'};
      if(mode === 'qcm') { const options=new Set([product]); while(options.size<4) options.add(Math.max(1,product+random(-12,12))); q.options=shuffle([...options]); }
      return q;
    }
  },
  rapide: {
    title: 'Calculs malins', icon: '⚡', color: '#fff0ba', shadow:'#e7ca70', description: 'Utilise les astuces des +8, +9, +19…',
    modes: [{id:'input', label:'Réponse à écrire'}, {id:'qcm', label:'QCM'}],
    next(mode) {
      const adds=[8,9,18,19,28,29,38,39], add=adds[random(0,adds.length-1)];
      const tier=random(0,3); let base;
      // Quatre cas utiles : prochaine dizaine, prochaine centaine, prochain millier, ou calcul libre.
      if(tier===0) base=random(2,90)*10+(10-add%10); // termine près de la dizaine suivante
      else if(tier===1) base=random(1,9)*100 + (100-add); // arrive exactement à la centaine
      else if(tier===2) base=random(1,9)*1000 + (1000-add); // arrive exactement au millier
      else base=random(10,999)*10+random(0,9);
      const result=base+add, q={type:mode,question:`${base} + ${add} = ?`,answer:result,label:'Trouve le résultat',hint:`Astuce : +${add} = +${add+1} − 1.`};
      if(mode==='qcm'){const opts=new Set([result]);while(opts.size<4)opts.add(result+random(-20,20));q.options=shuffle([...opts]);} return q;
    }
  },
  fractions: {
    title: 'Aventures fractions', icon: '🍕', color:'#f9dce7', shadow:'#e7a7be', description: 'Simplifie, compare et partage des pizzas.',
    modes: [{id:'equivalent',label:'Fractions équivalentes'}, {id:'pizza',label:'Pizza à partager'}, {id:'compare',label:'Comparer'}],
    next(mode) {
      if(mode==='pizza') {const slices=[4,6,8,10,12][random(0,4)], factor=[1,2,3][random(0,2)], n=random(1,Math.max(1,Math.floor(slices/factor)-1)); return {type:'pizza',question:`Colorie ${fractionHtml(n*factor,slices)} de cette pizza`,answer:n*factor,denominator:slices,label:'Partage la pizza',hint:'Chaque part colorée compte !'};}
      if(mode==='compare') {
        const d=random(2,9), a=random(1,d-1), b=random(1,d-1), useMultiples=Math.random()>.45;
        const factor=useMultiples ? random(2,4) : 1;
        return {type:'compare',question:`${fractionHtml(a,d)} &nbsp; ? &nbsp; ${fractionHtml(b,d*factor)}`,answer:a/d===b/(d*factor)?'=':(a/d>b/(d*factor)?'>':'<'),label:'Compare les fractions',hint:useMultiples?'Mets les fractions au même dénominateur.':'Les dénominateurs sont identiques : compare les nombres du haut.',options:['<','=','>']};
      }
      const d=random(2,9), n=random(1,d-1), factor=random(2,5); return {type:'input',question:`${fractionHtml(n*factor,d*factor)} = ${fractionHtml(n,'?')}`,answer:n,label:'Simplifie cette fraction',hint:`Cherche la fraction la plus simple.`};
    }
  }
};

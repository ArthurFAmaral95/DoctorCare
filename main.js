//criando a função no JS que irá colocar a classe scrol no html quando rolarmos a página e o cabeçalho ficar com a configuração correta

//função para não dar erro no na função quando a página for carregada em uma parte que não seja a home
//adiciona a onScroll em toda a página
window.addEventListener('scroll', onScroll)

//chamando a função
onScroll()

//essa função serve para gerenciar todos as outras funções a serem executadas com a rolagem
function onScroll() {
  showNavOnScroll()
  showBackToTopButtonOnScroll()

  activateMenuAtCurrentSection(home)
  activateMenuAtCurrentSection(services)
  activateMenuAtCurrentSection(about)
  activateMenuAtCurrentSection(contact)
}

//navigation e classList são objetos
//add é uma funcionalidade
//navigation é o id que demos para a tag nav no html
function showNavOnScroll() {
  if (scrollY > 0) {
    navigation.classList.add('scroll')
  } else {
    navigation.classList.remove('scroll')
  }
}

function showBackToTopButtonOnScroll() {
  if (scrollY > 400) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

//função para fazer os itens irem se revelando
//essa função aceita um objeto como argumento. está entre chaves dentro dos parenteses
//colocamos o nome do obejto e o valor
//dentro do reveal colocamos a ordem de aparição
ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700
}).reveal(`#home, 
  #home img, 
  #home .stats,
  #services,
  #services header,
  #services .card,
  #about, 
  #about header,
  #about .content`)
//para mostrar que é uma string temos que colocar aspas, sejam simples ou duplas
//porem quando usamos aspas, náo podemos fazer quebra de linha senão vai dar erro
//para resolver isso, podemos usar o acento grave (``) no início e no final

//lógica para destaque do menu de acordo com a posição
//da página no modelo desktop
//imaginar uma linha que corta a página na horizontal
//cada seção está em uma caixa e enquanto essa linha imaginária
//estiver entre a parte superior e inferior da caixa
//a respectiva seção irá destacar no menu

function activateMenuAtCurrentSection(section) {
  //const é uma variável constante, ou seja, não muda.
  //conta é para traçar a linha no meio da tela
  const targetLine = scrollY + innerHeight / 2

  //posição da parte superior e inferior da seção home
  const sectionTop = section.offsetTop
  const sectionHeight = section.offsetHeight

  //lógica para verificar se a linha imaginária está dentro dos
  //limites da caixa
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop

  const sectionEndsAt = sectionTop + sectionHeight

  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine

  //condicionais
  // && -> and
  // -> not
  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine

  //pegando o atributo id de uma seção
  const sectionId = section.getAttribute('id')

  //bucando na parte do menu (.menu) tag a que o href seja o id da seção que estivermos
  //*= -> que contenha
  // ${} -> maneira de colocar uma variável dentro de uma string. tem que usar o acento grave
  // ao invés das aspas
  const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

  //primeiro eu vou remover o ative de todas as classes para depois ir acrescentando
  menuElement.classList.remove('active')
  if (sectionBoundaries) {
    menuElement.classList.add('active')
  }
}

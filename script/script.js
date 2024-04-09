const baseUrl = 'https://resources-2ndh.onrender.com'; // URL base da API

// Função para carregar os recursos disponíveis e os recursos reservados
function carregarRecursos() {
  fetch(`${baseUrl}/recursos`)
    .then(response => response.json())
    .then(data => {
      const recursosDisponiveis = document.getElementById('recursosDisponiveis');
      const meusRecursos = document.getElementById('meusRecursos');
      recursosDisponiveis.innerHTML = '';
      meusRecursos.innerHTML = '';
      data.forEach(recurso => {
        const div = document.createElement('div');
        div.className = 'recurso';
        div.innerHTML = `<span>${recurso.nome}</span>`;
        if (recurso.disponivel) {
          const reservarBtn = document.createElement('button');
          reservarBtn.textContent = 'Reservar';
          reservarBtn.addEventListener('click', () => reservarRecurso(recurso.id));
          div.appendChild(reservarBtn);
          recursosDisponiveis.appendChild(div);
        } else {
          const devolverBtn = document.createElement('button');
          devolverBtn.textContent = 'Devolver';
          devolverBtn.addEventListener('click', () => devolverRecurso(recurso.id));
          div.appendChild(devolverBtn);
          meusRecursos.appendChild(div);
        }
      });
    });
}

// Função para reservar um recurso
function reservarRecurso(id) {
  fetch(`${baseUrl}/recursos/${id}/reservar`, { method: 'PUT' })
    .then(response => {
      if (response.ok) {
        carregarRecursos(); // Atualizar a lista de recursos após a reserva
      } else {
        throw new Error('Erro ao reservar o recurso');
      }
    })
    .catch(error => console.error(error));
}

// Função para devolver um recurso
function devolverRecurso(id) {
  fetch(`${baseUrl}/recursos/${id}/devolver`, { method: 'PUT' })
    .then(response => {
      if (response.ok) {
        carregarRecursos(); // Atualizar a lista de recursos após a devolução
      } else {
        throw new Error('Erro ao devolver o recurso');
      }
    })
    .catch(error => console.error(error));
}

// Função para adicionar um novo recurso
function adicionarRecurso() {
  const nomeRecurso = document.getElementById('nomeRecurso').value;
  fetch(`${baseUrl}/recursos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nomeRecurso })
  })
  .then(response => {
    if (response.ok) {
      carregarRecursos(); // Atualizar a lista de recursos após adicionar um novo recurso
      document.getElementById('nomeRecurso').value = ''; // Limpar o campo de entrada
    } else {
      throw new Error('Erro ao adicionar o recurso');
    }
  })
  .catch(error => console.error(error));
}

// Carregar os recursos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  carregarRecursos();
});
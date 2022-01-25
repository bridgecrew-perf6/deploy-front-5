/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import imgDelete from './assets/delete.svg';

function Tarefa({ children, id, completa, handleComplete, handleDelete, classe }) {
  return (
    <li className={classe}>
      <span onClick={() => handleComplete(id)}
        style={{ textDecoration: completa ? 'line-through' : '', color: completa ? '#D1D2DA' : '#000000' }}>
        {children}</span>
      <button onClick={() => handleDelete(id)}><img src={imgDelete} /></button>
    </li>
  )
}

let contadorItensRestantes = 0;

function App() {
  const [listaTarefas, setTarefas] = useState([]);
  const [selecionado, setSelecionado] = useState('');

  function handleKeyDown(event) {
    if (event.key !== 'Enter' || event.target.value === '') return;

    const novoSelect = 'filtros_todas';
    setSelecionado(novoSelect);

    const tarefaIncluida = { id: Math.random(), nomeTarefa: event.target.value, completa: false, classe: "" };
    const listaAtualizada = [...listaTarefas, tarefaIncluida];
    setTarefas(listaAtualizada);

    contadorItensRestantes++;
    event.target.value = '';
  }

  function handleCompleteClick(id) {
    const listaAtualizada = [...listaTarefas];
    const tarefaConcluida = listaAtualizada.find(tarefa => tarefa.id === id);

    tarefaConcluida.completa = !tarefaConcluida.completa;
    contadorItensRestantes = tarefaConcluida.completa ? contadorItensRestantes - 1 : contadorItensRestantes + 1;
    setTarefas(listaAtualizada);
  }

  function handleDeleteClick(id) {
    const tarefaConcluida = listaTarefas.find(tarefa => tarefa.id === id);
    contadorItensRestantes = tarefaConcluida.completa ? contadorItensRestantes : contadorItensRestantes - 1;

    const listaAtualizada = listaTarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(listaAtualizada);
  }

  function mostrarTodas() {
    const listaCompleta = [...listaTarefas];
    listaCompleta.forEach(tarefa => tarefa.classe = "");

    const novoSelect = 'filtros_todas';
    setSelecionado(novoSelect);
    setTarefas(listaCompleta);
  }

  function mostrarAtivas() {
    const tarefasAtivas = [...listaTarefas];

    tarefasAtivas.forEach(tarefa => {
      tarefa.classe = tarefa.completa ? tarefa.classe = "hidden" : "";
      console.log(tarefa.classe);
    });

    const novoSelect = 'filtros_ativas';
    setSelecionado(novoSelect);
    setTarefas(tarefasAtivas);
  }

  function mostrarConcluidas() {
    const tarefasConcluidas = [...listaTarefas];

    tarefasConcluidas.forEach(tarefa => {
      tarefa.classe = !tarefa.completa ? tarefa.classe = "hidden" : "";
      console.log(tarefa.classe);
    });

    const novoSelect = 'filtros_concluidas';
    setSelecionado(novoSelect);
    setTarefas(tarefasConcluidas);
  }

  function apagarConcluidas() {
    const listaAtualizada = listaTarefas.filter(tarefa => !tarefa.completa);
    setTarefas(listaAtualizada);
  }

  return (
    <div className="App">
      <h1>TAREFAS</h1>
      <input type='text' placeholder='Criar uma nova tarefa' onKeyDown={handleKeyDown} />
      <div className="container">
        <ul>
          {listaTarefas.map(tarefa => {
            return (
              <Tarefa
                key={tarefa.id}
                id={tarefa.id}
                completa={tarefa.completa}
                classe={tarefa.classe}
                handleComplete={handleCompleteClick}
                handleDelete={handleDeleteClick}
              >
                {tarefa.nomeTarefa}
              </Tarefa>
            )
          })}
        </ul>
        <div className="status_filtros">
          <span>{contadorItensRestantes} {contadorItensRestantes > 1 ? 'itens' : 'item'} restantes</span>
          <div className="filtros">
            <span className={selecionado === 'filtros_todas' ? 'selecionado' : 'filtros_todas'} onClick={mostrarTodas}>Todas</span>
            <span className={selecionado === 'filtros_ativas' ? 'selecionado' : 'filtros_ativas'} onClick={mostrarAtivas}>Ativas</span>
            <span className={selecionado === 'filtros_concluidas' ? 'selecionado' : 'filtros_concluidas'} onClick={mostrarConcluidas}>Concluídas</span>

          </div>
          <span className="status_limpar" onClick={apagarConcluidas}>Limpar completadas</span>
        </div>
      </div>
    </div>
  );
}

export default App;

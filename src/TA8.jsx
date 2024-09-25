import React, { useState } from 'react';
import './TA8.css';

function ListaDeTareas() {
  const [tarea, setTarea] = useState(''); // Estado para la tarea actual
  const [tareas, setTareas] = useState([]); // Estado para la lista de tareas
  const [editando, setEditando] = useState(null); // Estado para el índice de la tarea en edición
  const [tareaEditada, setTareaEditada] = useState(''); // Estado para la tarea que está siendo editada

  // Manejar el cambio del input para agregar una nueva tarea
  const manejarCambio = (e) => {
    setTarea(e.target.value);
  };

  // Manejar el cambio del input para editar una tarea existente
  const manejarCambioEdicion = (e) => {
    setTareaEditada(e.target.value);
  };

  // Agregar una nueva tarea
  const agregarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() !== '') {
      setTareas([...tareas, tarea]);
      setTarea('');
    }
  };

  // Eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas.splice(index, 1);
    setTareas(nuevasTareas);
  };

  // Activar el modo de edición para una tarea
  const activarEdicion = (index) => {
    setEditando(index);
    setTareaEditada(tareas[index]); // Coloca el valor de la tarea en el input de edición
  };

  // Guardar la tarea editada
  const guardarEdicion = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index] = tareaEditada;
    setTareas(nuevasTareas);
    setEditando(null); // Salir del modo de edición
  };

  return (
    <div>
      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={tarea}
          onChange={manejarCambio}
          placeholder="Escribe una tarea"
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      <ul>
        {tareas.map((t, index) => (
          <li key={index}>
            {editando === index ? (
              <>
                <input
                  type="text"
                  value={tareaEditada}
                  onChange={manejarCambioEdicion}
                />
                <button onClick={() => guardarEdicion(index)}>Guardar</button>
              </>
            ) : (
              <>
                {t}
                <button
                  className="edit-btn"
                  onClick={() => activarEdicion(index)}
                >
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => eliminarTarea(index)}
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeTareas;

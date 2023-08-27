import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'
import Modal from './Modal';

const ListItem = ({ task, getData }) => {
    const [showModal, setShowModal] = useState(false);
    const deleteItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                getData()
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <li className='list-item'>
            <div className='info-container'>
                <TickIcon />
                <p className='task-title' id='task-tt'>{task.title}</p>
            </div>                <ProgressBar progress={task.progress} />

            <div className='button-container blist'>
                <button className='edit' onClick={() => setShowModal(true)}>Edit</button>
                <button className='delete' onClick={deleteItem}>Delete</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
        </li>
    )
}

export default ListItem
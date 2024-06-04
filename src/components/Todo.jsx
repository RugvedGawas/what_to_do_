import { useEffect,useState } from 'react';
import styles from './Todo.module.css';
import { saveToLocalStorage, getFromLocalStorage } from './StorageUtils';
import Background from './subcomponents/Background';

const Todo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(getFromLocalStorage('data') || [])

  const [values, setValues] = useState({
    date: '',
    time: '',
    task: ''
  });

  useEffect(()=>{
    saveToLocalStorage('data', data)
  },
  [data])

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, values]);
    // const newData = [...data, values]; // Append the new entry to the existing data
    // setData(newData);
    // const newData = setData([...data, values]);
    // saveToLocalStorage('myKey', newData);
    setValues({ date: '', time: '', task: '' }); // Clear the form inputs
    setModalOpen(false); // Close the modal after submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const modalClose = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <h1>Todo List App</h1>

    <div style={{height:'100%', width:'100%',}}>

   <Background/>

    {/* <div style={{height:'80vh', width:'100%',display: 'flex', alignItems: 'center', justifyContent: 'center'}}> */}
      
      <div className={styles.slider}>

      </div>

      <div style={{position:'absolute', bottom:'2%', left:'30%'}}>
        <button
        className={styles.button}
          onClick={handleModalClick}
        >
          <h1>Add Task</h1>
        </button>
      </div>


     

      {/* </div> */}

      </div>


    

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={modalClose}>
          <div className={`${styles.modalOpenClass} ${styles.showModal}`}>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <label htmlFor="date">Select Date:</label>
                  </div>
                  <div>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="time">Select Time:</label>
                  </div>
                  <div>
                    <input
                      type="time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="task">Add Task:</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="task"
                      value={values.task}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <button type="button" onClick={modalClose}>
                    Cancel
                  </button>
                  <button type="submit">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div>
        
        {data.map((entry, index) => (
          <div key={index}>
            <p>Date: {entry.date}</p>
            <p>Time: {entry.time}</p>
            <p>Task: {entry.task}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;

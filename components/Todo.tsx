
// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity
// } from 'react-native';
// import axios from 'axios';

// type TodoItem = {
//   _id: string;
//   text: string;
// };
//  export default function Todo(){
//     const [task, setTask] = useState('');
//     const [todos, setTodos] = useState<TodoItem[]>([]);
//     const [editingId, setEditingId] = useState<string | null>(null);
  
//     const API_URL = 'http://192.168.0.106:4050/todos'; // Adjust this URL based on your backend setup
  
  
//     const fetchTodos = async () => {
//       const res = await axios.get(API_URL);
//       setTodos(res.data);
//     };
  
//     useEffect(() => {
//       fetchTodos();
//     }, []);
  
//     const addOrUpdateTask = async () => {
//       if (!task.trim()) return;
  
//       if (editingId) {
//         await axios.put(`${API_URL}/${editingId}`, { text: task });
//         setEditingId(null);
//       } else {
//         await axios.post(API_URL, { text: task });
//       }
  
//       setTask('');
//       fetchTodos();
//     };
  
//     const deleteTask = async (id: string) => {
//       await axios.delete(`${API_URL}/${id}`);
//       if (editingId === id) {
//         setEditingId(null);
//         setTask('');
//       }
//       fetchTodos();
//     };
  
//     const startEditing = (id: string) => {
//       const selected = todos.find(t => t._id === id);
//       if (selected) {
//         setTask(selected.text);
//         setEditingId(id);
//       }
//     };
  
//     return (

//     <View style={styles.container}>
//         {/* <Text style={styles.title}>MERN To-Do App</Text> */}
//           <Text style={styles.title}>MERN To-Do App</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter task"
//             value={task}
//             onChangeText={setTask}
//           />
//           <Button
//             title={editingId ? "Update Task" : "Add Task"}
//             onPress={addOrUpdateTask} 
//           />
//           <FlatList
//             data={todos}
//             keyExtractor={item => item._id}
//             renderItem={({ item }) => (
//               <View style={styles.itemRow}>
//                 <Text style={styles.itemText}>{item.text}</Text>
//                 <View style={styles.buttons}>
//                   <Button title="Edit" onPress={() => startEditing(item._id)} />
//                   <Button title="Delete" onPress={() => deleteTask(item._id)} />
//                 </View>
//               </View>
//             )}
//           />
//         </View>
//     )
//   }

  
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 20,
//       paddingTop: 50,
//       backgroundColor: '#121212', // Deep black background
//     },
//     title: {
//       fontSize: 28,
//       fontWeight: 'bold',
//       color: '#00ffcc', // Neon Cyan for contrast
//       marginBottom: 20,
//       textAlign: 'center',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#00ffcc',
//       backgroundColor: '#1e1e1e',
//       color: '#ffffff',
//       padding: 12,
//       borderRadius: 10,
//       marginBottom: 15,
//     },
//     itemRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       backgroundColor: '#222',
//       marginVertical: 6,
//       padding: 12,
//       borderRadius: 10,
//       shadowColor: '#00ffcc',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     itemText: {
//       fontSize: 18,
//       color: '#ffffff',
//       flex: 1,
//     },
//     buttons: {
//       flexDirection: 'row',
//       gap: 10,
//     },
  
//     button: {
//       marginLeft: 10,
//       backgroundColor: '#00ffcc',
//       paddingHorizontal: 10,
//       paddingVertical: 6,
//       borderRadius: 6,
//     },
//   });
    
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity
} from 'react-native';
import axios from 'axios';

type TodoItem = {
  _id: string;
  text: string;
};

export default function Todo() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_URL = 'http://192.168.0.106:4050/todos';

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addOrUpdateTask = async () => {
    if (!task.trim()) return;

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, { text: task });
      setEditingId(null);
    } else {
      await axios.post(API_URL, { text: task });
    }

    setTask('');
    fetchTodos();
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    if (editingId === id) {
      setEditingId(null);
      setTask('');
    }
    fetchTodos();
  };

  const startEditing = (id: string) => {
    const selected = todos.find(t => t._id === id);
    if (selected) {
      setTask(selected.text);
      setEditingId(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MERN To-Do App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        placeholderTextColor="#aaa"
        value={task}
        onChangeText={setTask}
      />

      <TouchableOpacity
        style={[styles.mainButton, editingId ? styles.updateButton : styles.addButton]}
        onPress={addOrUpdateTask}
      >
        <Text style={styles.buttonText}>{editingId ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => startEditing(item._id)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteTask(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#1f1a38',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00ffcc',
    backgroundColor: '#2d2a4a',
    color: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  mainButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#00cc66',
  },
  updateButton: {
    backgroundColor: '#3399ff',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2545',
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  editButton: {
    backgroundColor: '#3399ff',
  },
  deleteButton: {
    backgroundColor: '#ff3333',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

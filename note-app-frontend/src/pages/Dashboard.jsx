

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios'; // Make sure axios is imported

import Header from '../components/core/Header';
import NoteCard from '../components/core/NoteCard';
import Spinner from '../components/core/Spinner';
import AddNoteModal from '../components/modals/AddNoteModal';

// Get the API base URL from environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
    // We need the token to authorize our API requests
    const { user, token } = useAuth(); 
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getNotes = async () => {
            if (!token) {
            console.log("token is not have");    
                
                return;
            } // Don't fetch notes if the token isn't ready
setIsLoading(true);
            try {
                // Create the authorization header
                const config = {
                    headers: {
                        'x-auth-token': token,
                    },
                };
                const res = await axios.get(`${API_URL}/notes`, config);
                console.log(res.data);
                setNotes(res.data);

            } catch (error) {
                toast.error('Failed to fetch your notes.');
                console.error("this is error --> "+error);
            } finally {
                setIsLoading(false);
            }
        };
        getNotes();
    }, [token]); // Re-run this effect if the token changes

    // --- THIS IS THE FUNCTION TO FIX ---
    const handleAddNote = async (newNote) => {
        try {
            // Create the configuration with the Authorization header
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };
            // Send the new note data AND the config object to axios
            const res = await axios.post(`${API_URL}/notes`, newNote, config);
            
            // Add the new note from the response to the top of the list
            setNotes([res.data, ...notes]);
            toast.success('Note added successfully!');
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Failed to add note.');
            console.error(error); // This will log the 401 error object
        }
    };
    // ------------------------------------

    const handleDeleteNote = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            // Note: In MongoDB, the ID is typically '_id'
            await axios.delete(`${API_URL}/notes/${id}`, config);
            setNotes(notes.filter(note => note._id !== id));
            toast.success('Note deleted!');
        } catch (error) {
            toast.error('Failed to delete note.');
            console.error(error);
        }
    };
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Welcome, {user?.name ? user.name.split(' ')[0] : 'User'}!
                        </h1>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-full px-4 py-2 shadow-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FiPlus className="h-5 w-5 mr-2" />
                            Add Note
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64"><Spinner /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.length > 0 ? (
                                notes.map(note => (
                                    <NoteCard key={note._id} note={note} onDelete={() => handleDeleteNote(note._id)} />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">You have no notes yet. Add one to get started!</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <AddNoteModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddNote={handleAddNote}
            />
        </div>
    );
};

export default Dashboard;



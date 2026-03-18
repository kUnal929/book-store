import { useState, useEffect } from 'react';
import { fetchAuthors, createAuthor, deleteAuthor, updateAuthor } from '../api';
import { Plus, Trash2, Edit2, X, Mail, Users } from 'lucide-react';

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Error loading authors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (author = null) => {
    if (author) {
      setEditingId(author.id);
      setFormData({
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email
      });
    } else {
      setEditingId(null);
      setFormData({ firstName: '', lastName: '', email: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAuthor(editingId, formData);
      } else {
        await createAuthor(formData);
      }
      closeModal();
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author? (Note: You cannot delete an author who has books)')) {
      try {
        await deleteAuthor(id);
        loadData();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Authors Directory</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Manage the creators behind your collection.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-6 py-3.5 bg-primary hover:bg-primary-dark text-white text-base font-semibold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
          Add New Author
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800">
          <thead className="bg-gray-50/80 dark:bg-gray-800/50">
            <tr>
              <th scope="col" className="px-8 py-5 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Full Name
              </th>
              <th scope="col" className="px-8 py-5 text-left text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Email Address
              </th>
              <th scope="col" className="px-8 py-5 text-right text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {authors.map((author) => (
              <tr key={author.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {author.firstName} {author.lastName}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center text-base text-gray-600 dark:text-gray-400">
                    <Mail className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
                    {author.email}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openModal(author)}
                      className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20"
                      title="Edit Author"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(author.id)}
                      className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete Author"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {isLoading && (
              <tr>
                <td colSpan="3" className="px-8 py-20">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                  </div>
                </td>
              </tr>
            )}
            {!isLoading && authors.length === 0 && (
              <tr>
                <td colSpan="3" className="px-8 py-20 text-center bg-gray-50/50 dark:bg-gray-800/20">
                  <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No authors found</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Add an author to start attributing your books.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all border dark:border-gray-800">
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingId ? 'Edit Author Details' : 'Add a New Author'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors shadow-sm border border-gray-200 dark:border-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                    placeholder="e.g. George"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                    placeholder="e.g. Orwell"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                  placeholder="e.g. george@example.com"
                />
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 text-base font-semibold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  {editingId ? 'Save Changes' : 'Add Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
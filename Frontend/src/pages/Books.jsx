import { useState, useEffect } from 'react';
import { fetchBooks, createBook, deleteBook, fetchAuthors, updateBook } from '../api';
import { Plus, Trash2, Edit2, X, BookOpen } from 'lucide-react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authorId: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [booksData, authorsData] = await Promise.all([
        fetchBooks(),
        fetchAuthors()
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (book = null) => {
    if (book) {
      setEditingId(book.id);
      setFormData({
        title: book.title,
        description: book.description || '',
        authorId: book.authorId || ''
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', authorId: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', authorId: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        authorId: formData.authorId || undefined
      };

      if (editingId) {
        await updateBook(editingId, payload);
      } else {
        await createBook(payload);
      }
      closeModal();
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        loadData();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const getAuthorName = (authorId) => {
    if (!authorId) return 'Unknown Author';
    const author = authors.find(a => a.id === authorId);
    return author ? `${author.firstName} ${author.lastName}` : 'Unknown Author';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 transition-colors">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Books Collection</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Manage and browse your entire library.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center justify-center px-6 py-3.5 bg-primary hover:bg-primary-dark text-white text-base font-semibold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" strokeWidth={2.5} />
          Add New Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map(book => (
          <div key={book.id} className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{book.title}</h2>
            
            <div className="inline-block bg-orange-50 dark:bg-primary/10 text-primary-dark dark:text-primary font-semibold text-sm px-3 py-1.5 rounded-lg mb-5 w-fit">
              By {getAuthorName(book.authorId)}
            </div>
            
            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-4 leading-relaxed mb-8 grow">
              {book.description || 'No description available. Consider adding a brief summary for this title.'}
            </p>
            
            <div className="flex gap-3 justify-end mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
              <button 
                onClick={() => openModal(book)}
                className="flex items-center px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 font-medium"
                title="Edit Book"
              >
                <Edit2 className="w-4 h-4 mr-1.5" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(book.id)}
                className="flex items-center px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                title="Delete Book"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="col-span-full py-20 px-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        )}
        {!isLoading && books.length === 0 && (
          <div className="col-span-full py-20 px-6 text-center bg-gray-50/50 dark:bg-gray-800/20 border-2 border-gray-200 dark:border-gray-800 border-dashed rounded-3xl">
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Your library is empty</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-sm mx-auto">Get started by adding your very first book to the collection.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all border dark:border-gray-800">
            <div className="flex justify-between items-center p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingId ? 'Edit Book Details' : 'Add a New Book'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors shadow-sm border border-gray-200 dark:border-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Book Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white"
                  placeholder="e.g. The Great Gatsby"
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Author</label>
                <select
                  value={formData.authorId}
                  onChange={e => setFormData({...formData, authorId: e.target.value})}
                  className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white cursor-pointer"
                >
                  <option value="">Select an author...</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.firstName} {author.lastName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3.5 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 dark:text-white resize-y"
                  placeholder="Provide a brief summary or synopsis..."
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
                  {editingId ? 'Save Changes' : 'Publish Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

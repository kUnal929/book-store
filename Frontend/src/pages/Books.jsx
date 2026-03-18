import { useState, useEffect } from 'react';
import { fetchBooks, createBook, deleteBook, fetchAuthors, updateBook } from '../api';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

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

  const loadData = async () => {
    try {
      const [booksData, authorsData] = await Promise.all([
        fetchBooks(),
        fetchAuthors()
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error loading data:', error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium text-gray-900">Books Collection</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-md transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative group">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h2>
            <p className="text-sm text-primary font-medium mb-3">By {getAuthorName(book.authorId)}</p>
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
              {book.description || 'No description available.'}
            </p>
            <div className="flex gap-2 justify-end mt-auto">
              <button 
                onClick={() => openModal(book)}
                className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(book.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-200 border-dashed rounded-lg">
            No books found. Add a book to get started!
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-lg font-medium text-gray-900">
                {editingId ? 'Edit Book' : 'Add New Book'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g. The Great Gatsby"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <select
                  value={formData.authorId}
                  onChange={e => setFormData({...formData, authorId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="A brief summary..."
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                >
                  {editingId ? 'Save Changes' : 'Add Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

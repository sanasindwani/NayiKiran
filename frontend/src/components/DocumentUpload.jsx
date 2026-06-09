import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';
import { Upload, File, X, Search, Loader2, Eye, Download, Trash2, Tag } from 'lucide-react';

const DocumentUpload = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showViewer, setShowViewer] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const newDocuments = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      extractedText: '',
      tags: [],
      isProcessing: true
    }));

    setDocuments(prev => [...newDocuments, ...prev]);

    // Process each file for OCR
    for (const doc of newDocuments) {
      await processDocument(doc);
    }
  }, []);

  const processDocument = async (doc) => {
    try {
      setProcessing(true);
      
      // Create image element for OCR
      const imageUrl = URL.createObjectURL(doc.file);
      const img = new Image();
      img.src = imageUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Perform OCR
      const result = await Tesseract.recognize(
        img,
        'eng',
        {
          logger: (m) => console.log(m)
        }
      );

      // Update document with extracted text
      setDocuments(prev => prev.map(d => 
        d.id === doc.id 
          ? { 
              ...d, 
              extractedText: result.data.text,
              isProcessing: false,
              confidence: result.data.confidence,
              words: result.data.words?.length || 0
            }
          : d
      ));

      // Auto-categorize based on content
      autoCategorize(doc.id, result.data.text);
      
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('OCR Error:', error);
      setDocuments(prev => prev.map(d => 
        d.id === doc.id 
          ? { ...d, isProcessing: false, error: error.message }
          : d
      ));
    } finally {
      setProcessing(false);
    }
  };

  const autoCategorize = (docId, text) => {
    const lowerText = text.toLowerCase();
    let tags = [];

    // Auto-tag based on content
    if (lowerText.includes('legal') || lowerText.includes('court') || lowerText.includes('law')) {
      tags.push('Legal');
    }
    if (lowerText.includes('school') || lowerText.includes('education') || lowerText.includes('certificate')) {
      tags.push('Education');
    }
    if (lowerText.includes('government') || lowerText.includes('official')) {
      tags.push('Government');
    }
    if (lowerText.includes('medical') || lowerText.includes('health') || lowerText.includes('hospital')) {
      tags.push('Medical');
    }
    if (lowerText.includes('financial') || lowerText.includes('bank') || lowerText.includes('income')) {
      tags.push('Financial');
    }

    setDocuments(prev => prev.map(d => 
      d.id === docId ? { ...d, tags } : d
    ));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.rtf']
    },
    multiple: true
  });

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const filteredDocuments = documents.filter(doc => {
    const searchLower = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(searchLower) ||
      doc.extractedText.toLowerCase().includes(searchLower) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const viewDocument = (doc) => {
    console.log('Viewing document:', doc);
    setSelectedDoc(doc);
    setShowViewer(true);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTagColor = (tag) => {
    const colors = {
      'Legal': 'bg-red-100 text-red-800',
      'Education': 'bg-blue-100 text-blue-800',
      'Government': 'bg-green-100 text-green-800',
      'Medical': 'bg-yellow-100 text-yellow-800',
      'Financial': 'bg-purple-100 text-purple-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('documents.title')}</h1>
              <p className="text-gray-600">{t('documents.subtitle')}</p>
            </div>
            <button
              onClick={() => {
                console.log('Test button clicked');
                setSelectedDoc({
                  id: 'test',
                  name: 'Test Document',
                  extractedText: 'This is test text to verify the modal works correctly.',
                  tags: ['Test'],
                  confidence: 95
                });
                setShowViewer(true);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {t('documents.testModal')}
            </button>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-blue-600">{t('documents.dropFiles')}</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">{t('documents.dragDrop')}</p>
                <p className="text-sm text-gray-500">{t('documents.supportedFormats')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('documents.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Processing Indicator */}
        {processing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin mr-2" />
              <span className="text-blue-800">{t('documents.processing')}</span>
            </div>
          </div>
        )}

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* File Icon and Info */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <File className="w-8 h-8 text-blue-500 mr-3" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{formatFileSize(doc.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Processing Status */}
                {doc.isProcessing ? (
                  <div className="flex items-center text-blue-600 mb-3">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span className="text-sm">Processing OCR...</span>
                  </div>
                ) : doc.error ? (
                  <div className="text-red-600 text-sm mb-3">{t('documents.error')}: {doc.error}</div>
                ) : (
                  <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      {processing ? t('common.loading') : `${filteredDocuments.length} ${t('documents.title')}`}
                    </h2>
                    <div className="text-sm text-gray-600 mb-1">
                      {doc.words || 0} {t('documents.wordsExtracted')}
                    </div>
                    {doc.confidence && (
                      <div className="text-sm text-gray-600">
                        {t('documents.confidence')}: {Math.round(doc.confidence)}%
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}
                      >
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Text Preview */}
                {doc.extractedText && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {doc.extractedText.substring(0, 150)}...
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => viewDocument(doc)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([doc.extractedText], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${doc.name}_extracted.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && !processing && (
          <div className="text-center py-12">
            <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-500">Upload some documents to get started with OCR</p>
          </div>
        )}

        {/* Document Viewer Modal */}
        {showViewer && selectedDoc && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">{selectedDoc.name}</h2>
                  <button
                    onClick={() => setShowViewer(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {selectedDoc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDoc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Extracted Text:</h3>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedDoc.extractedText || 'No text extracted'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;

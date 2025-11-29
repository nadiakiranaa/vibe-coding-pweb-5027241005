const mongoose = require('mongoose');

const ThesisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  abstract: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentId: { // NIM
    type: String,
    required: true
  },
  major: { // Jurusan
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  keywords: {
    type: [String], // Array of keywords
    default: []
  },
  pdfUrl: {
    type: String // Path ke file PDF
  },
  posterUrl: {
    type: String // Path ke file Gambar Poster
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Thesis', ThesisSchema);
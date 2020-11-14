import API from './apiService';
import '../css/styles.css';

// API('flower').then(r => console.log(r));

fetch(
  'https://pixabay.com/api/?key=19110749-e340c63922b3f8a4d502270f7&q=yellow+flowers&image_type=photo',
)
  .then(result => console.log(result.json))
  .then(console.log);

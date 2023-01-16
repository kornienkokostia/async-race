module.exports = {
    extends: [ 
      'airbnb' , 
      'airbnb-typescript' , 
      'airbnb/hooks' , 
      'plugin:@typescript-eslint/recommended' , 
      'plugin:@typescript-eslint/recommended-requiring-type-checking' , 
    ] , 
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
  };
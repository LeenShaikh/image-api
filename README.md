## Image Processing API

This is a Node.js application in TypeScript that provides an image processing API.
It provides support for image resizing and formatting, caches processed images, and possesses good error handling.

## Requirements

- Node.js
- npm

## Technologies used

- **Node.js & Express** for building the API server.
- **Sharp** for image processing.
- **Jasmine** for unit testing.
- **TypeScript** for type safety and maintainability.
- **ESLint** for linting.
- **Prettier** for code formatting.
- **SuperTest** for integration testing of API endpoints.

## Project Features

- Resize images based on **width** and **height** parameters.
- Change image format (jpg, jpeg, png, bmp, tiff, gif).
- Caching processed images for faster subsequent requests.
- Validate query parameters and returns meaningful errors.
- Fully tested with unit tests.

## Installation and setup and available scripts

### Clone repository

- git clone https://github.com/LeenShaikh/image-api.git
- cd image-api

### Install dependencies

- npm install

### Compile TypeScript

- npm run build

### Running server

- npm start
- The API will run at : http://localhost:3000

### Run ESLint to check code style

- npm run lint

### Runs all tests including unit tests and integration tests using Jasmine and SuperTest.

- npm run test

### Run Prettier to auto-format code

- npm run format

### Run full validation (format, lint, build, and tests):

- npm run check-all

## API Endpoint

- http://localhost:3000/api/images

### Query Parameters

- filename (string): Original image filename.
- width (number): Desired width in pixels (1-2000).
- height (number): Desired height in pixels (1-2000).
- format (string): Output format: jpg, jpeg, png, bmp, tiff, gif.

### Example Request

- http://localhost:3000/api/images?filename=palmtunnel.jpg&width=200&height=300&format=jpg
- The processed image will be returned and cached in the cache/ folder for future requests.

### Responses

- 200 OK : Returns the processed image (either from cache or newly generated)

- 400 Bad Request : Invalid query parameters (e.g., negative width, unsupported format)

- 404 Not Found : Original image does not exist

- 500 Internal Server Error : Error during image processing

## Tests

Jasmine used to test API functionality:

- **Middleware Tests**: Validate query parameters(filename, width, height, format).
- **Controller Tests**: Tests image processing, caching and error handling.
- **Integration Tests**: Use SuperTest to make actual HTTP requests to the API endpoint.
  - Covers both success scenarios (valid inputs) and error scenarios (invalid inputs).

## Notes

- Processed images are stored in cache/ for faster access on repeated requests.
- Original images must be placed in images/ folder.
- Always run **npm run build** after modifying TypeScript source.

## Notes / Highlights

- Added explicit return type Promise<void> to imageController function.

- Declared types for variables (widthStr: string, heightStr: string, formatStr: string).

- Updated catch block to use error: unknown type.

- Added return statements after responses (res.sendFile, res.status) to satisfy TypeScript flow.

- Added explicit return type void to the callback function in server.ts for app.listen.

- Updated package.json: Kept only express and sharp in dependencies (runtime) & Moved supertest, jasmine, jasmine-spec-reporter, and all @types/\* packages to devDependencies.

## Author

- Leen Shaikhibrahim
- GitHub: https://github.com/LeenShaikh

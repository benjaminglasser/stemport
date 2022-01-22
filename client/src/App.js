// import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload'

function App() {
  return (
    <div className="main">
      <div className="container">
        <h4 className="display-4 text-center mt-4">
          Stemport
        </h4>
        <h5 className="display-8 text-center mb-4">
          Analyze - Organize - Import
        </h5>

        <FileUpload />
      </div>
    </div>
  );
}

export default App;

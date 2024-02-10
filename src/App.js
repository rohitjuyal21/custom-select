import './App.css';
import CustomSelect from './components/CustomSelect';
function App() {
  const selectOptions = ["Businessman", "Employee", "Freelancer", "Retired"];
  return (
    <div className="min-h-screen flex justify-center pt-20 bg-[#e0e1e1]">
      <CustomSelect selectOptions={selectOptions} />
    </div>
  );
}

export default App;

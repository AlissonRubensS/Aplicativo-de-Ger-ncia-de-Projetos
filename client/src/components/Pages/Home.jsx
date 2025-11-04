import NavBar from '../Ui/NavBar.jsx';
import DataPanel from '../Ui/DataPanel.jsx';

function Home() {
  localStorage.setItem("loginPermission", false);

  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col space-y-4 rounded-lg">
      <NavBar select_index={0} />
      <div className='flex flex-row justify-center items-start space-x-8'>
        <DataPanel title="Planejado" value={0} unit="KG"/>
        <DataPanel title="Processado" value={1} unit="KG"/>
        <DataPanel title="Refugo" value={2} unit="KG"/>
        <DataPanel title="Horas Extras" value={4} unit="H"/>
        <DataPanel title="Insumos" value={3} unit="KG"/>
      </div>
    </div>
  )
}

export default Home;
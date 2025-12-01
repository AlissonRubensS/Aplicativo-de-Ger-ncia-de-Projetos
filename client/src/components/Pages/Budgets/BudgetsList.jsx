import SidebarList from "../../Ui/SlideBarList";

function BudgetsList({ budgets, setOpen, currentBudget, setCurrentBudget }) {
  return (
    <SidebarList
      items={budgets}
      selectedItem={currentBudget}
      onSelectItem={setCurrentBudget}
      onAdd={() => setOpen(true)}
      addLabel="+ Novo Orçamento"
      titleAll="Todos os Orçamentos"
      filterOptions={[
        { value: "Running", label: "Executando" },
        { value: "Completed", label: "Concluído" },
      ]}
    />
  );
}

export default BudgetsList;

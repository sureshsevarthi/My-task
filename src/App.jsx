import React, { useState } from "react";
import { availableColumnsData, visibleColumnsData } from "./InitialValues";
import ColumnSetup from "./components/ColumnSetup";
import { Button } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [openColumnSetup, setOpenColumnSetup] = useState(false);
  const [fixedIndex] = useState(null);

  // To hide or show the ColumnSetup
  const handleColumSetup = () => {
    setOpenColumnSetup(!openColumnSetup);
  };

  // handle save to console current visible columns and fixed indexes
  const handleSave = data => {
    console.log("Saved data:", data);
  };

  return (
    <div className="container p-3">
      {!openColumnSetup && (
        <Button onClick={handleColumSetup}>Show Column Setup</Button>
      )}
      {openColumnSetup && (
        <ColumnSetup
          onClose={handleColumSetup}
          onSave={handleSave}
          availableColumns={availableColumnsData || []}
          visibleColumns={visibleColumnsData || []}
          fixedIndex={fixedIndex}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import RegisteredSubjectList from "./RegisteredSubjectList";
import AddRegisteredSubject from "./AddRegisteredSubject";
import RegisteredSubjectDetails from "./RegisteredSubjectDetails";

const RegisteredSubjectPage = () => {
  console.log("RegisteredSubjectPage is rendering...");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleOpenAdd = () => setIsAddOpen(true);
  const handleCloseAdd = () => setIsAddOpen(false);

  const handleViewDetails = (subject) => setSelectedSubject(subject);
  const handleCloseDetails = () => setSelectedSubject(null);

  return (
    <div>
      <RegisteredSubjectList onViewDetails={handleViewDetails} onAdd={handleOpenAdd} />
      {isAddOpen && <AddRegisteredSubject onClose={handleCloseAdd} onSuccess={() => window.location.reload()} />}
      {selectedSubject && (
        <RegisteredSubjectDetails subject={selectedSubject} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default RegisteredSubjectPage;
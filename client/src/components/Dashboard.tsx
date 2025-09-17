import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { domainUrl, credits } = useOutletContext<{
    updateCredits: () => void;
    domainUrl: string;
    credits: number;
    setCredits: (credits: number) => void;
  }>();

  const dashboardInfo = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(`${domainUrl}/dashboardInfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const { name, email} = await response.json();
        setName(name);
        setEmail(email);
      } else {
        localStorage.removeItem("jwt");
      }
    } catch {
      localStorage.removeItem("jwt");
    }
  };

  useEffect(() => {
    dashboardInfo();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{name}</p>
      <p>{email}</p>
      <p>{credits}</p>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp, ArrowDown } from 'lucide-react';

const Minuteur: React.FC = () => {
  const [temps, setTemps] = useState<number>(0);
  const [enCours, setEnCours] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (enCours && temps > 0) {
      interval = setInterval(() => {
        setTemps((prevTemps) => prevTemps - 1);
      }, 1000);
    } else if (temps === 0 && enCours) {
      alert("Le temps est écoulé !");
      setEnCours(false);
    }
    return () => clearInterval(interval);
  }, [enCours, temps]);

  const toggleMinuteur = () => {
    setEnCours(!enCours);
  };

  const augmenterTemps = () => {
    setTemps((prevTemps) => prevTemps + 60);
  };

  const diminuerTemps = () => {
    setTemps((prevTemps) => Math.max(0, prevTemps - 60));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nouveauTemps = parseInt(e.target.value);
    if (!isNaN(nouveauTemps) && nouveauTemps >= 0) {
      setTemps(nouveauTemps);
    } else if (e.target.value === '') {
      setTemps(0);
    }
  };

  const formaterTemps = (secondes: number): string => {
    const minutes = Math.floor(secondes / 60);
    const secondesRestantes = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondesRestantes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button variant="outline" onClick={augmenterTemps} disabled={enCours}>
        <ArrowUp size={24} />
      </Button>
      <div className="text-4xl font-bold">{formaterTemps(temps)}</div>
      <Button variant="outline" onClick={diminuerTemps} disabled={enCours}>
        <ArrowDown size={24} />
      </Button>
      <Input
        type="number"
        placeholder="Entrez le temps en secondes"
        value={temps > 0 ? temps : ''}
        onChange={handleInputChange}
        disabled={enCours}
        className="w-full max-w-xs"
      />
      <Button variant="outline" onClick={toggleMinuteur}>
        {enCours ? 'Arrêter' : 'Démarrer'}
      </Button>
    </div>
  );
};

export default Minuteur;

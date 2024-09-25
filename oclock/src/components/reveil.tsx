import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Alarme {
  id: number;
  heure: string;
  message: string;
}

const Reveil: React.FC = () => {
  const [alarmes, setAlarmes] = useState<Alarme[]>([]);
  const [nouvelleHeure, setNouvelleHeure] = useState<string>('');
  const [nouveauMessage, setNouveauMessage] = useState<string>('');
  const [heureActuelle, setHeureActuelle] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setHeureActuelle(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    alarmes.forEach((alarme) => {
      const [heures, minutes] = alarme.heure.split(':').map(Number);
      if (
        heureActuelle.getHours() === heures &&
        heureActuelle.getMinutes() === minutes &&
        heureActuelle.getSeconds() === 0
      ) {
        alert(alarme.message);
      }
    });
  }, [heureActuelle, alarmes]);

  const ajouterAlarme = () => {
    if (nouvelleHeure && nouveauMessage) {
      const nouvelleAlarme: Alarme = {
        id: Date.now(),
        heure: nouvelleHeure,
        message: nouveauMessage,
      };
      setAlarmes([...alarmes, nouvelleAlarme]);
      setNouvelleHeure('');
      setNouveauMessage('');
    }
  };

  const tempsRestant = (heure: string): string => {
    const [heures, minutes] = heure.split(':').map(Number);
    const alarmeDate = new Date(heureActuelle);
    alarmeDate.setHours(heures, minutes, 0, 0);

    const diff = alarmeDate.getTime() - heureActuelle.getTime();
    if (diff < 0) {
      return 'passée';
    }

    const heuresRestantes = Math.floor(diff / (1000 * 60 * 60));
    const minutesRestantes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `dans ${heuresRestantes}h ${minutesRestantes}m`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <Input
          type="time"
          value={nouvelleHeure}
          onChange={(e) => setNouvelleHeure(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Message"
          value={nouveauMessage}
          onChange={(e) => setNouveauMessage(e.target.value)}
        />
        <Button onClick={ajouterAlarme}>Ajouter</Button>
      </div>
      <ul className="w-full max-w-md space-y-2">
        {alarmes.map((alarme) => (
          <li key={alarme.id} className="flex justify-between items-center">
            <span>{alarme.heure} - {alarme.message}</span>
            <span className="text-sm text-gray-500">{tempsRestant(alarme.heure)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reveil;

import { useState } from 'react';
import { initFirestore } from '@/lib/initFirestore';
import { Button } from '@/components/ui/button';

export function InitializeFirestore() {
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle');

  const handleClick = async () => {
    setStatus('running');
    try {
      await initFirestore();
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleClick} disabled={status === 'running'}>
        {status === 'running' ? 'Migrando...' : 'Migrar Firestore'}
      </Button>
      {status === 'done' && (
        <p className="text-green-600 dark:text-green-400">Migración completada.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 dark:text-red-400">Error al migrar Firestore.</p>
      )}
    </div>
  );
}
